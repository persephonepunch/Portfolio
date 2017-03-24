<?php

$id = "tm-{$name}";
$class = [$id];
$style = [];
$attrs = [];
$attrs_overlay = [];
$attrs_container = [];
$attrs_viewport_height = [];
$attrs_video = [];
$attrs_media = [];

// Empty ?
if (!is_active_sidebar($name) or !$section = $theme->get($name)) {
    return;
}

// Transparent header
$transparent = $theme->get("{$name}.header_transparent");
$header = $this->render('header', compact('transparent'));

// Section
$class[] = "uk-section";

if ($transparent && $header) {
    $attrs_media['class'][] = "uk-section-{$section['style']}";
} else {
    $class[] = "uk-section-{$section['style']}";
}

// Text color
if ($section['style'] == 'primary' || $section['style'] == 'secondary') {
    if ($transparent && $header) {
        $attrs_media['class'][] = 'uk-preserve-color';
        $class[] = !$section['preserve_color'] ? "uk-{$transparent}" : '';
    } else {
        $class[] = $section['preserve_color'] ? 'uk-preserve-color' : '';
    }
}

if ($section['style'] == 'image' || $section['style'] == 'video') {
    $class[] = $section['text_color'] ? "uk-{$section['text_color']}" : '';
}

// Image
if ($section['image'] && $section['style'] == 'image') {

    if ($section['image_width'] || $section['image_height']) {
        $section['image'] = "{$section['image']}?thumbnail={$section['image_width']},{$section['image_height']}";
    }

    $attrs_media['style'][] = "background-image: url('{$app['image']->getUrl($section['image'])}');";

    // Settings
    $attrs_media['class'][] = 'uk-background-norepeat';
    $attrs_media['class'][] = $section['image_size'] ? "uk-background-{$section['image_size']}" : '';
    $attrs_media['class'][] = $section['image_position'] ? "uk-background-{$section['image_position']}" : '';
    $attrs_media['class'][] = $section['image_fixed'] ? "uk-background-fixed" : '';
    $attrs_media['class'][] = $section['image_visibility'] ? "uk-background-image@{$section['image_visibility']}" : '';
    $attrs_media['class'][] = $section['media_blend_mode'] ? "uk-background-blend-{$section['media_blend_mode']}" : '';
    $attrs_media['style'][] = $section['media_background'] ? "background-color: {$section['media_background']};" : '';

    // Overlay
    if ($section['media_overlay']) {
        $attrs_media['class'][] = "uk-position-relative";
        $attrs_overlay['style'] = "background-color: {$section['media_overlay']};";
    }

}

// Video
if ($section['video'] && $section['style'] == 'video') {

    // Settings
    $attrs_media['style'][] = $section['media_background'] ? "background-color: {$section['media_background']};" : '';
    $attrs_video['class'][] = $section['media_blend_mode'] ? "uk-blend-{$section['media_blend_mode']}" : '';

    // Overlay
    if ($section['media_overlay']) {
        $attrs_media['class'][] = "uk-position-relative";
        $attrs_overlay['style'] = "background-color: {$section['media_overlay']};";
    }

    $attrs_media['class'][] = "uk-cover-container";

    // Video
    $attrs_video['width'] = $section['video_width'];
    $attrs_video['height'] = $section['video_height'];

    if ($iframe = $this->iframeVideo($section['video'])) {

        $attrs_video['src'] = $iframe;
        $attrs_video['frameborder'] = '0';
        $attrs_video['allowfullscreen'] = true;
        $attrs_video['uk-cover'] = true;

        $section['video'] = "<iframe{$this->attrs($attrs_video)}></iframe>";

    } else if ($section['video']) {

        $attrs_video['src'] = $section['video'];
        $attrs_video['controls'] = false;
        $attrs_video['loop'] = true;
        $attrs_video['autoplay'] = true;
        $attrs_video['uk-cover'] = true;

        $section['video'] = "<video{$this->attrs($attrs_video)}></video>";
    }

} else {
    $section['video'] = '';
}

// Padding
switch ($section['padding']) {
    case 'small':
    case 'large':
    case 'xlarge':
        $class[] = "uk-section-{$section['padding']}";
        break;
    case 'none':
        $class[] = 'uk-padding-remove-vertical';
        break;
}

if ($section['padding'] != 'none') {
    if ($section['padding_remove_top']) {
        $class[] = 'uk-padding-remove-top';
    }
    if ($section['padding_remove_bottom']) {
        $class[] = 'uk-padding-remove-bottom';
    }
}

// Height Viewport
if ($section['height']) {

    if ($section['height'] === 'offset') {
        $class[] = 'uk-flex uk-flex-middle';
        $attrs_viewport_height['class'][] = 'uk-width-1-1';
    }

    $attrs['uk-height-viewport'] = 'mode: '.$section['height'];
}

// Container and width
switch ($section['width']) {
    case 'default':
        $attrs_container['class'][] = 'uk-container';
        break;
    case 'small':
    case 'large':
    case 'expand':
        $attrs_container['class'][] = "uk-container uk-container-{$section['width']}";
        break;
    // Deprecated
    case 1:
        $attrs_container['class'][] = 'uk-container';
        break;
    case 2:
        $attrs_container['class'][] = 'uk-container uk-container-small';
        break;
    case 3:
        $attrs_container['class'][] = 'uk-container uk-container-expand';
}

// Make sure overlay and video is always below content
$attrs_container['class'][] = $attrs_overlay || $section['video'] ? ' uk-position-relative' : '';

?>

<?php if ($transparent && $header) : ?>

    <div<?= $this->attrs(['class' => 'js-sticky'], $attrs_media) ?>>

        <?= $section['video'] ?>

        <?php if ($attrs_overlay) : ?>
        <div class="uk-position-cover"<?= $this->attrs($attrs_overlay) ?>></div>
        <?php endif ?>

        <?= $header ?>

        <div<?= $this->attrs(compact('id', 'class', 'style'), $attrs) ?>>

            <?php if ($attrs_viewport_height) : ?>
            <div<?= $this->attrs($attrs_viewport_height) ?>>
            <?php endif ?>

            <?php if ($attrs_container) : ?>
            <div<?= $this->attrs($attrs_container) ?>>
            <?php endif ?>

            <?php dynamic_sidebar("$name:grid") ?>

            <?php if ($attrs_container) : ?>
            </div>
            <?php endif ?>

            <?php if ($attrs_viewport_height) : ?>
            </div>
            <?php endif ?>

        </div>

    </div>

<?php else : ?>

    <?= $header ?>

    <div<?= $this->attrs(compact('id', 'class', 'style'), $attrs, $attrs_media) ?>>

        <?= $section['video'] ?>

        <?php if ($attrs_overlay) : ?>
        <div class="uk-position-cover"<?= $this->attrs($attrs_overlay) ?>></div>
        <?php endif ?>

        <?php if ($attrs_viewport_height) : ?>
        <div<?= $this->attrs($attrs_viewport_height) ?>>
        <?php endif ?>

        <?php if ($attrs_container) : ?>
        <div<?= $this->attrs($attrs_container) ?>>
        <?php endif ?>

        <?php dynamic_sidebar("$name:grid") ?>

        <?php if ($attrs_container) : ?>
        </div>
        <?php endif ?>

        <?php if ($attrs_viewport_height) : ?>
        </div>
        <?php endif ?>

    </div>

<?php endif ?>
