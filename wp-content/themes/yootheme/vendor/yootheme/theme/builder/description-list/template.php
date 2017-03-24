<?php

$id    = $element['id'];
$class = $element['class'];
$attrs = $element['attrs'];
$attrs_grid = [];
$attrs_cell = [];

// Style
$class[] = $element['list_style'] ? "uk-list uk-list-{$element['list_style']}" : 'uk-list';

// Size
$class[] = $element['list_size'] ? 'uk-list-large' : '';

// Layout
$attrs_grid['class'][] = 'uk-grid-small';
$attrs_grid['uk-grid'] = true;

switch ($element['layout']) {
    case 'width-small':
    case 'width-medium':
        $attrs_grid['class'][] = 'uk-flex-nowrap uk-child-width-expand';
        $attrs_cell['class'][] = "uk-text-break uk-{$element['layout']}";
        break;
    case 'space-between':
        $attrs_grid['class'][] = "uk-flex-nowrap uk-flex-between";
        break;
    case 'stacked':
        $attrs_cell['class'][] = "uk-width-1-1";
        break;
    default:
        $attrs_grid['class'][] = 'uk-child-width-expand';
        $attrs_cell['class'][] = "uk-width-auto";
}

?>

<ul<?= $this->attrs(compact('id', 'class'), $attrs) ?>>
    <?php foreach ($element as $item) :

        // Title
        $item['title'] .= $item['title'] && $element['title_colon'] ? ':' : '';

        ?>
        <li>

            <?php if ($element['layout'] == 'stacked') : ?>

                <?= $this->render('@builder/description-list/template-title', compact('item')) ?>
                <div><?= $this->render('@builder/description-list/template-content', compact('item')) ?></div>

            <?php else : ?>

            <div<?= $this->attrs($attrs_grid) ?>>
                <div<?= $this->attrs($attrs_cell) ?>>
                    <?= $this->render('@builder/description-list/template-title', compact('item')) ?>
                </div>
                <div>
                    <?= $this->render('@builder/description-list/template-content', compact('item')) ?>
                </div>
            </div>

            <?php endif ?>

        </li>
    <?php endforeach ?>
</ul>
