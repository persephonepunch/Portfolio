<?php

// determine layout
if ($position == 'navbar') {

    if (in_array($theme->get('header.layout'), ['toggle-offcanvas', 'toggle-modal'])) {

        $layout = 'nav';
        $attrs['class'][] = 'uk-nav';

        if ($theme->get('header.layout') == 'toggle-offcanvas') {
            $attrs['class'][] = 'uk-nav-default';
        } else {
            $attrs['class'][] = 'uk-nav-primary uk-nav-center';
        }

    } else {

        $layout = 'navbar';
        $attrs['class'][] = 'uk-navbar-nav';

    }

} else if (in_array($position, ['toolbar-left', 'toolbar-right'])) {

    $layout = 'subnav';
    $attrs['class'][] = 'uk-subnav uk-subnav-line';

} else {

    $layout = 'nav';
    $attrs['class'][] = 'uk-nav';

    if ($position == 'mobile' && $theme->get('mobile.animation') == 'modal') {

        $attrs['class'][] = 'uk-nav-primary uk-nav-center';

    } else if ($position != 'mobile') {

        $params->set('accordion', true);
        $attrs['class'][] = 'uk-nav-default uk-nav-parent-icon uk-nav-side uk-nav-accordion';
        $attrs['uk-nav'] = true;

    } else {

        $attrs['class'][] = 'uk-nav-default';

    }

}

?>

<ul<?= $this->attrs($attrs) ?>>
<?= $this->render("menu/{$layout}", ['items' => $items]) ?>
</ul>
