<?php

namespace YOOtheme\Theme\Wordpress;

use YOOtheme\EventSubscriber;

class ContentListener extends EventSubscriber
{
    const PATTERN = '/<!--\s?(\{(?:.*?)\})\s?-->/';

    public function onInit($theme)
    {
        if ($this['admin']) {
            $this['routes']->post('/page', [$this, 'savePage']);
        }
    }

    public function onSite($theme)
    {
        add_action('wp', function () {

            if (is_page()) {
                $this['events']->trigger('content.prepare', [get_queried_object()]);
            }

        });
    }

    public function onContent($obj)
    {
        $obj->content = strpos($obj->post_content, '<!--') !== false && preg_match(self::PATTERN, $obj->post_content, $matches) ? $matches[1] : null;

        if (!isset($this['@customizer']) || !$this['@customizer']->isActive()) {
            return;
        }

        if ($page = get_theme_mod('page')) {
            $obj->content = $page['content'];
        }

        $data = [
            'id' => $obj->ID,
            'title' => $obj->post_title,
            'content' => $obj->content,
            'modified' => !empty($page),
        ];

        if ($data['content']) {
            $data['content'] = $this['builder']->load($data['content']);
        }

        $this['@customizer']->addData('page', $data);
    }

    public function savePage($page = [])
    {
        if (!current_user_can('edit_post', $page['id'])) {
            throw new Exception(403, 'Insufficient User Rights.');
        }

        $updated = wp_update_post([
            'ID' => $page['id'],
            'post_content' => wp_slash("{$this['builder']->content($page['content'])}<!-- {$this['builder']->encode($page['content'])} -->"),
        ], true);

        if (is_wp_error($updated)) {
            throw new Exception(500, 'Something went wrong.');
        }

        return 'success';
    }

    public static function getSubscribedEvents()
    {
        return [
            'theme.init' => 'onInit',
            'theme.site' => 'onSite',
            'content.prepare' => ['onContent', 10]
        ];
    }
}
