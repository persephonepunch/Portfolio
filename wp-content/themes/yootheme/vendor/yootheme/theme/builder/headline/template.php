<?php

$id    = $element['id'];
$class = $element['class'];
$attrs = $element['attrs'];

// Style
$class[] = $element['title_style'] ? "uk-{$element['title_style']}" : '';

// Decoration
$class[] = $element['title_decoration'] ? "uk-heading-{$element['title_decoration']}" : '';

?>

<<?= $element['title_element'] . $this->attrs(compact('id', 'class'), $attrs) ?>>
    <?php if ($element['title_decoration'] == 'line') : ?>
    <span><?= $element ?></span>
    <?php else : ?>
    <?= $element ?>
    <?php endif ?>
</<?= $element['title_element'] ?>>

