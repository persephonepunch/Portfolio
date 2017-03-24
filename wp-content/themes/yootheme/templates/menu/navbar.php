<?php

$logo = false;
if ($items && current($items)->level == 1 && $position == 'navbar' && $theme->get('header.layout') == 'stacked-center-split') {
    $logo = $this->render('header-logo', ['class' => 'uk-navbar-item', 'img' => 'uk-responsive-height']);
    $center = ceil(count($items) / 2);
}

foreach (array_values($items) as $i => $item) {

    $attrs = ['class' => []];
    $children = isset($item->children);
    $indention = str_pad("\n", $item->level + 1, "\t");
    $title = $item->title;

    // Active?
    if ($item->active) {
        $attrs['class'][] = 'uk-active';
    }

    // Icon
    $icon = $item->config->get('icon', '');
    if (preg_match('/\.(gif|png|jpg|svg)$/i', $icon)) {
        $icon = "<img class=\"uk-responsive-height uk-margin-small-right\" src=\"{$icon}\" alt=\"{$item->title}\">";
    } elseif ($icon) {
        $icon = "<span class=\"uk-margin-small-right\" uk-icon=\"icon: {$icon}\"></span>";
    }

    // Show Icon only
    if ($icon && $item->config->get('icon-only')) {
        $title = '';
    }

    // Additional Class
    if ($item->class) {
        $attrs['class'][] = $item->class;
    }

    // Header
    if ($item->type === 'header') {

        if (!$children && $item->level == 1) {
            continue;
        }

        $title = $icon.$title;

        if ($item->level > 1 && $item->divider && !$children) {
            $title = '';
            $attrs['class'][] = 'uk-nav-divider';
        } elseif ($children) {
            $title = "<a href=\"#\">{$title}</a>";
        } else {
            $attrs['class'][] = 'uk-nav-header';
        }

    // Link
    } else {

        $link = [];

        if (isset($item->url)) {
            $link['href'] = $item->url;
        }

        if (isset($item->target)) {
            $link['target'] = $item->target;
        }

        if ($title && $subtitle = $item->level == 1 ? $item->config->get('subtitle') : '') {
            $title = "<div>{$title}<div class=\"uk-navbar-subtitle\">{$subtitle}</div></div>";
        }

        $title = "<a{$this->attrs($link)}>{$icon}{$title}</a>";
    }

    // Children?
    if ($children) {

        $children = ['class' => []];
        $attrs['class'][] = 'uk-parent';

        if ($item->level == 1) {

            $parts = array_chunk($item->children, ceil(count($item->children) / $item->config->get('columns', 1)));
            $count = count($parts);

            $children['class'][] = 'uk-navbar-dropdown';

            if ($width = $item->config->get('width', 0)) {
                $children['style'] = sprintf('width:%spx;', $count * $width, $count * $width, $width);
            }

            $click = $item->type === 'header' && $mode = $theme->get('navbar.dropdown_click');
            if ($justify = $item->config->get('justify') or $click) {
                $children['uk-drop'] = json_encode([
                    'clsDrop' => 'uk-navbar-dropdown',
                    'flip' => 'x',
                    'pos' => $justify ? 'bottom-justify' : 'bottom-'.$theme->get('navbar.dropdown_align'),
                    'boundaryAlign' => $justify || $theme->get('navbar.dropbar') && $theme->get('navbar.dropdown_boundary'),
                    'mode' => $click ? 'click' : 'hover'
                ]);
            }

            $columns = '';

            foreach ($parts as $part) {
                $columns .= "<div><ul class=\"uk-nav uk-navbar-dropdown-nav\">\n{$this->self(['items' => $part])}</ul></div>";
            }

            $wrapper = ['class' => ['uk-navbar-dropdown-grid'], 'uk-grid' => true];

            if ($count > 1 && !$justify) {
                $children['class'][] = "uk-navbar-dropdown-width-{$count}";
            }

            $wrapper['class'][] = "uk-child-width-1-{$count}";

            $children = "{$indention}<div{$this->attrs($children)}><div{$this->attrs($wrapper)}>{$columns}</div></div>";

        } else {

            if ($item->level == 2) {
                $children['class'][] = 'uk-nav-sub';
            }

            $children = "{$indention}<ul{$this->attrs($children)}>\n".$this->self(['items' => $item->children])."</ul>";
        }
    }

    echo "{$indention}<li{$this->attrs($attrs)}>{$title}{$children}</li>";

    if ($logo && $i == $center - 1) {
        echo $logo;
    }

}
