<?php

$id    = $element['id'];
$class = $element['class'];
$attrs = $element['attrs'];

// Accordion
$attrs['uk-accordion'] = $element->pick(['multiple', 'collapsible'])->json();

?>

<div<?= $this->attrs(compact('id', 'class'), $attrs) ?>>

    <?php foreach ($element as $item) : ?>
    <div>
        <h3 class="uk-accordion-title"><?= $item['title'] ?></h3>
        <div class="uk-accordion-content"><?= $item ?></div>
    </div>
    <?php endforeach ?>

</div>
