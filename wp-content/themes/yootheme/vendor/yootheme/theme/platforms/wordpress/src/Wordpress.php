<?php

namespace YOOtheme\Theme;

use YOOtheme\EventSubscriberInterface;
use YOOtheme\Module;
use YOOtheme\Theme\Wordpress\Breadcrumbs;
use YOOtheme\Theme\Wordpress\ChildThemeListener;
use YOOtheme\Theme\Wordpress\ContentListener;
use YOOtheme\Theme\Wordpress\CustomizerListener;
use YOOtheme\Theme\Wordpress\UpgradeListener;
use YOOtheme\Theme\Wordpress\UrlListener;

class Wordpress extends Module implements EventSubscriberInterface
{
    /**
     * Query information.
     *
     * @var string[]
     */
    public $query;

    /**
     * {@inheritdoc}
     */
    public function __invoke($app)
    {
        $this['events']->subscribe(new ChildThemeListener($this));
        $this['events']->subscribe(new ContentListener($this));
        $this['events']->subscribe(new CustomizerListener($this));
        $this['events']->subscribe(new UrlListener($this));
        $this['events']->subscribe(new UpgradeListener($this));
        $this['locator']->addPath("{$this->path}/assets", 'assets');
    }

    public function onEarlyInit($theme)
    {
        if ($this['admin']) {
            $theme->version = wp_get_theme($theme->name)['Version'];
        }
    }

    public function onInit($theme)
    {
        add_action('wp_loaded', function () use ($theme) {

            $config = json_decode(get_theme_mod('config', '{}'), true);
            $theme['@config']->merge($config, true);

            if (!$this['admin']) {
                $this['events']->trigger('theme.site', [$theme]);
            } elseif ($theme['@customizer']->isActive()) {
                $this['events']->trigger('theme.admin', [$theme]);
            }

        });

        add_filter('upload_mimes', function ($mimes) {

            if (is_admin()) {
                $mimes['svg'] = 'image/svg+xml';
                $mimes['svgz'] = 'image/svg+xml';
            }

            return $mimes;
        });

        add_action('edit_form_after_title', function ($post) {

            if ($post->post_type != 'page' || $post->post_status == 'auto-draft') {
                return;
            }

            echo  $this['view']->link('Page Builder', add_query_arg([
                'url' => urlencode(get_permalink($post->ID)),
                'autofocus[section]' => 'builder',
            ], wp_customize_url()), ['class' => 'tm-button'])
                .'<style>
    
                    .tm-button {
                        display: inline-block;
                        box-sizing: border-box;
                        width: 250px;
                        max-width: 100%;
                        margin-top: 20px;
                        padding: 20px 30px;
                        border-radius: 2px;
                        background: linear-gradient(140deg, #FE67D4, #4956E3);
                        box-shadow: inset 0 0 1px 0 rgba(0,0,0,0.5);
                        line-height: 10px;
                        vertical-align: middle;
                        color: #fff !important;
                        font-size: 11px;
                        font-weight: bold;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                        text-align: center;
                        text-decoration: none !important;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        -webkit-font-smoothing: antialiased;
                    }
    
                </style>';
        });
    }

    public function onSite($theme)
    {
        $theme['@config']->set('site_url', rtrim(get_bloginfo('url'), '/'));
        $theme['@config']->set('page_class', ''); // TODO: implement page class builder

        if ($theme->get('disable-wpautop')) {
            remove_filter('the_content', 'wpautop');
            remove_filter('the_excerpt', 'wpautop');
        }

        add_filter('wp_title', function ($title, $sep) {

            if (is_feed()) {
                return $title;
            }

            // add the site name.
            $title .= get_bloginfo('name', 'display');

            // add the site description for the home/front page.
            $site_description = get_bloginfo('description', 'display');
            if ($site_description && (is_home() || is_front_page())) {
                $title = "$title $sep $site_description";
            }

            return $title;
        }, 10, 2);

        $this['view']['sections']->add('breadcrumbs', function () {
            return $this['view']->render('breadcrumbs', ['items' => Breadcrumbs::getItems()]);
        });

        add_action('wp_footer', function () use ($theme) {
            if (get_post_type() !== 'page' && isset($theme['@customizer']) && $theme['@customizer']->isActive() && $theme['@config']->get('uikit_dev')) {
                theme_section('builder');
            }
        });

        // WooCommerce integration
        include_once(ABSPATH.'wp-admin/includes/plugin.php');

        if (is_plugin_active('woocommerce/woocommerce.php')) {

            // disable woocommerce general style
            add_filter('woocommerce_enqueue_styles', function ($styles) {
                unset($styles['woocommerce-general']);
                return $styles;
            });

            // number of items per page
            if ($theme->get('woocommerce.items', 'default') !== 'default') {
                add_filter('loop_shop_per_page', function () use ($theme) {
                    return $theme->get('woocommerce.items');
                }, 20);
            }
        }

        $this['theme']->set('uikit_dev', get_theme_mod('uikit_dev'));

        $this['builder']->addRenderer(function ($element, $type, $next) {
            return do_shortcode($next($element, $type));
        });
    }

    public function onContent($obj)
    {
        if (!$this['view']['sections']->exists('builder') && isset($obj->content)) {
            $this['view']['sections']->set('builder', function () use ($obj) {
                return $this['builder']->render($obj->content);
            });
        }

        $this['theme']->set('builder', $this['view']['sections']->exists('builder'));
    }

    public static function getSubscribedEvents()
    {
        return [
            'theme.init' => [['onEarlyInit', 10], ['onInit', -10]],
            'theme.site' => ['onSite', 10],
            'content.prepare' => 'onContent'
        ];
    }
}
