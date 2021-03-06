<?php
/**
 * Pagination links for archive post pages.
 *
 * @link https://developer.wordpress.org/reference/functions/paginate_links/
 */

global $wp_query;

$args = [
    'type' => 'array',
    'mid_size' => 1,
    'next_text' => __('Next <span uk-pagination-next></span>', 'yootheme'),
    'prev_text' => __('<span uk-pagination-previous></span> Previous', 'yootheme'),
];

?>

<?php if ($wp_query->max_num_pages > 1) : ?>

    <?php if ($theme->get('blog.navigation') == 'pagination') : ?>
    <ul class="uk-pagination uk-margin-large uk-flex-center">
        <?php foreach (paginate_links($args) as $link) : ?>
        <li<?= strpos($link, 'current') ? ' class="uk-active"' : '' ?>><?= $link ?></li>
        <?php endforeach ?>
    </ul>
    <?php endif ?>

    <?php if ($theme->get('blog.navigation') == 'previous/next') : ?>
    <ul class="uk-pagination uk-margin-large">
        <?php if ($prev = get_previous_posts_link(__('<span uk-pagination-previous></span> Previous', 'yootheme'))) : ?>
        <li><?= $prev ?></li>
        <?php endif ?>
        <?php if ($next = get_next_posts_link(__('Next <span uk-pagination-next></span>', 'yootheme'))) : ?>
        <li class="uk-margin-auto-left"><?= $next ?></li>
        <?php endif ?>
    </ul>
    <?php endif ?>

<?php endif ?>
