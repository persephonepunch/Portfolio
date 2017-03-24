<?php

$attrs_title = [];
$attrs_content = [];

// Remove bottom margin from last item if whole panel is linked
if (($element['link'] && $element['link_style'] == 'panel')
    && !($element['image'] && in_array($element['image_align'], ['left', 'right']))
    && !($element['panel_style'] && $element['image'] && $element['image_align'] == 'top')) {

        if ($element['content']) {
            $attrs_content['class'][] = 'uk-margin-remove-bottom';
        } elseif ($element['title'] && !($element['image'] && $element['image_align'] == 'between')) {
            $attrs_title['class'][] = 'uk-margin-remove-bottom';
        }

}

// Content
$attrs_content['class'][] = 'uk-margin';

// Title
$attrs_title['class'][] = $element['title_style'] ? "uk-{$element['title_style']}" : '';
$attrs_title['class'][] = $element['panel_style'] && !$element['title_style'] ? "uk-card-title" : '';
$attrs_title['class'][] = $element['title_decoration'] ? "uk-heading-{$element['title_decoration']}" : '';

if ($element['title']) {

    if ($element['title_decoration'] == 'line') {
        $element['title'] = "<span>{$element['title']}</span>";
    }

    $element['title'] = "<{$element['title_element']}{$this->attrs($attrs_title)}>{$element['title']}</{$element['title_element']}>";

}

?>

<?= $element['title'] ?>

<?php if ($element['image_align'] == 'between') : ?>
<?= $element['image'] ?>
<?php endif ?>

<?php if ($element['content']) : ?>
<div<?= $this->attrs($attrs_content) ?>><?= $element ?></div>
<?php endif ?>

<?php if ($element['link'] && $element['link_style'] != 'panel' && $element['link_text']): ?>
<p><a<?= $this->attrs($attrs_link) ?>><?= $element['link_text'] ?></a></p>
<?php endif ?>
