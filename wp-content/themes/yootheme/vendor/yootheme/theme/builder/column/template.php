<?php

$class = [];

// Width
$index = $element->index;
$layouts = explode('|', $element->parent['layout']);
$breakpoints = ['s', 'm', 'l', 'xl'];
$breakpoint = $element->parent['breakpoint'];

// Above Breakpoint
$widths = explode(',', $layouts[0]);
$width = $widths[$index] ?: 'expand';
$width = $width === 'fixed' ? $element->parent['fixed_width'] : $width;
$class[] = "uk-width-{$width}".($breakpoint ? "@{$breakpoint}" : '');

// Intermediate Breakpoint
if (isset($layouts[1]) && $pos = array_search($breakpoint, $breakpoints)) {
    $breakpoint = $breakpoints[$pos-1];
    $widths = explode(',', $layouts[1]);
    $width = $widths[$index] ?: 'expand';
    $class[] = "uk-width-{$width}".($breakpoint ? "@{$breakpoint}" : '');
}

// Order
if (count($widths) == $index + 1 && $element->parent['order_last']) {
    $class[] = 'uk-flex-first';
}

// Visibility
$visibilities = ['xs', 's', 'm', 'l', 'xl'];
$visible = $element->count() ? 4 : false;

foreach ($element as $el) {
    $visible = min(array_search($el['visibility'], $visibilities), $visible);
}

if ($visible) {
    $element['visibility'] = $visibilities[$visible];
    $class[] = "uk-visible@{$visibilities[$visible]}";
}

?>

<div<?= $this->attrs(compact('class')) ?>>
    <?= $element ?>
</div>
