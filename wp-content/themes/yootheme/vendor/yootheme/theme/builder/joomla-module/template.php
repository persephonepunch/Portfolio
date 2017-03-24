<?php

$id    = $element['id'];
$class = $element['class'];
$attrs = $element['attrs'];
$title = [];

// Max Width?
if ($element['maxwidth']) {
    $class[] = 'uk-width-' . $element['maxwidth'];

    // Center?
    if ($element['maxwidth_align']) {
        $class[] = 'uk-margin-auto';
    }

}

// Text Center?
if ($element['text_align']) {
    $class[] = 'uk-text-center';
}

// Title
if ($element['showtitle']) {

    $title['class'] = [];

    // Style?
    $title['class'][] = $element['title_style'] ? "uk-{$element['title_style']}" : '';
    $title['class'][] = $element['style'] && !$element['title_style'] ? "uk-card-title" : '';

    // Decoration?
    $title['class'][] = $element['title_decoration'] ? "uk-heading-{$element['title_decoration']}" : '';
}

?>

<div<?= $this->attrs(compact('id', 'class'), $attrs) ?>>

    <?php if ($element['showtitle']) : ?>
        <?php if ($element['title_decoration'] == 'line'): ?>
            <h3<?= $this->attrs($title) ?>><span><?= $element->title ?></span><h3>
        <?php else: ?>
            <h3<?= $this->attrs($title) ?>><?= $element->title ?></h3>
        <?php endif ?>
    <?php endif ?>

    <div><?= $element ?></div>

</div>
