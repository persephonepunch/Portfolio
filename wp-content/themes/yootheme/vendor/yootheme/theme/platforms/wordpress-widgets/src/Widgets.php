<?php

namespace YOOtheme\Theme;

use YOOtheme\EventSubscriberInterface;
use YOOtheme\Module;
use YOOtheme\Util\Collection;

class Widgets extends Module implements EventSubscriberInterface
{
    /**
     * @var string
     */
    protected $style;

    /**
     * @var string
     */
    public $sidebar;

    /**
     * @var array
     */
    public $widgets = [];

    public function onInit($theme)
    {
        add_action('current_screen', [$this, 'editScreen']);
        add_action('in_widget_form', [$this, 'editWidget'], 10, 3);
        add_action('widget_update_callback', [$this, 'updateWidget'], 10, 3);
    }

    public function onSite($theme)
    {
        add_action('is_active_sidebar', [$this, 'isActiveSidebar'], null, 2);
        add_action('dynamic_sidebar_before', [$this, 'beforeSidebar']);
        add_action('dynamic_sidebar_after', [$this, 'afterSidebar']);
        add_filter('sanitize_title', [$this, 'parseSidebarStyle'], 10, 2);
        add_filter('widget_display_callback', [$this, 'displayWidget'], 10, 3);
    }

    public function isActiveSidebar($active, $sidebar)
    {
        return $active
            || has_nav_menu($sidebar)
            || in_array($sidebar, [$this['theme']->get('header.search'), $this['theme']->get('header.social')]);
    }

    public function beforeSidebar($sidebar)
    {
        $this->sidebar = $sidebar;
        $this->widgets[$sidebar] = [];

        if (has_nav_menu($sidebar)) {
            $locations = get_nav_menu_locations();
            wp_nav_menu(['menu' => $locations[$sidebar]]);
        }
    }

    public function afterSidebar($sidebar)
    {
        global $wp_widget_factory, $wp_registered_sidebars;

        $search = $this['theme']->get('header.search');
        if ($sidebar == $search || $search && $sidebar == 'mobile') {
            $this->displayWidget([], $wp_widget_factory->widgets['WP_Widget_Search'], $wp_registered_sidebars[$sidebar]);
        }

        $items = $this->widgets[$sidebar];

        if ($sidebar == $this['theme']->get('header.social')) {

            $widget = new \stdClass();
            $widget->id = 'social';
            $widget->type = 'social';
            $widget->content = $this['view']->render('socials');
            $widget->position = $sidebar;
            $widget->attrs = ['class' => []];
            $widget->config = new Collection($this['@config']->get('defaults'));

            strpos($sidebar, 'left') ? array_unshift($items, $widget) : array_push($items, $widget);
        }

        echo $this['view']->render('position', [
            'name' => $sidebar,
            'style' => $this->style,
            'items' => $items,
        ]);

        $this->style = null;
        $this->sidebar = null;
    }

    public function parseSidebarStyle($title, $raw)
    {
        global $wp_registered_sidebars;

        if (strpos($raw, ':')) {

            list($name, $style) = explode(':', $raw, 2);

            if (isset($wp_registered_sidebars[$name])) {
                $this->style = $style;
                return $name;
            }
        }

        return $title;
    }

    public function displayWidget($instance, $widget, $args)
    {
        ob_start();
        $widget->widget($args, $instance);
        $output = ob_get_clean();

        preg_match('/<content>(.*?)<\/content>/s', $output, $content);
        preg_match('/<title>(.*?)<\/title>/s', $output, $title);

        $type = strtr(str_replace('nav_menu', 'menu', $widget->id_base), '_', '-');
        $config = json_decode(isset($instance[$key = '_theme']) ? $instance[$key] : '{}', true);
        $content = $content ? $content[1] : '';

        if ($title) {
            $content = str_replace($title[0], '', $content);
        }

        if (!isset($widget->widget_cssclass)) {
            $widget->widget_cssclass = '';
        }

        $this->widgets[$this->sidebar][] = (object) [
            'id' => $widget->id,
            'type' => $type,
            'title' => $title ? $title[1] : '',
            'content' => $content,
            'position' => $this->sidebar,
            'attrs' => ['id' => "widget-{$widget->id}", 'class' => [trim("widget-{$type} {$widget->widget_cssclass}")]],
            'config' => (new Collection($this['@config']->get('defaults')))->merge($config),
        ];

        return false;
    }

    public function editScreen($screen)
    {
        if (in_array($screen->base, ['customize', 'widgets'])) {
            $this['scripts']->add('widgets', "{$this->path}/app/widgets.min.js", ['uikit', 'vue', 'widgets-data']);
            $this['scripts']->add('widgets-data', "var \$widgets = {$this['@config']};", '', 'string');
        }
    }

    public function editWidget($widget, $return, $instance)
    {
        $config = isset($instance[$key = '_theme']) ? htmlspecialchars($instance[$key]) : '{}';

        echo "<input type=\"hidden\" name=\"{$widget->get_field_name($key)}\" value=\"{$config}\" data-widget>";
    }

    public function updateWidget($instance, $new_instance)
    {
        return $new_instance; // needed callback
    }

    public static function getSubscribedEvents()
    {
        return [
            'theme.init' => 'onInit',
            'theme.site' => 'onSite',
        ];
    }
}
