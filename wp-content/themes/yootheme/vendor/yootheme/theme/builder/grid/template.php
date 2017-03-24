<?php

$id    = $element['id'];
$class = $element['class'];
$attrs = $element['attrs'];

// Grid
$attrs['uk-grid'] = true;
$class[] = "uk-grid-match uk-child-width-1-{$element['grid_default']}";

$class[] = $element['grid_small'] ? "uk-child-width-1-{$element['grid_small']}@s" : '';
$class[] = $element['grid_medium'] ? "uk-child-width-1-{$element['grid_medium']}@m" : '';
$class[] = $element['grid_large'] ? "uk-child-width-1-{$element['grid_large']}@l" : '';
$class[] = $element['grid_xlarge'] ? "uk-child-width-1-{$element['grid_xlarge']}@x" : '';

$class[] = $element['gutter'] ? "uk-grid-{$element['gutter']}" : '';
$class[] = $element['divider'] ? 'uk-grid-divider' : '';

// Panel
$attrs_item = ['class' => ['uk-panel']];

// Max Width
$attrs_item['class'][] = $element['item_maxwidth'] ? "uk-width-{$element['item_maxwidth']} uk-margin-auto" : '';

?>

<div<?= $this->attrs(compact('id', 'class'), $attrs) ?>>

    <?php foreach ($element as $item) : ?>
    <div>
        <div<?= $this->attrs($attrs_item) ?>>

            <?php if ($item['title']) : ?>
            <h3><?= $item['title'] ?></h3>
            <?php endif ?>

            <?php if ($item['content']) : ?>
            <div><?= $item ?></div>
            <?php endif ?>

        </div>
    </div>
    <?php endforeach ?>

</div>
