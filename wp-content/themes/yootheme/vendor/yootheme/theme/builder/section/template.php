<?php

$id = $element['id'];
$class = $element['class'];
$style = [];
$attrs = [
    'uk-scrollspy' => $element['animation'] ? json_encode([
        'target' => '[uk-scrollspy-class]',
        'cls' => "uk-animation-{$element['animation']}",
        'delay' => $element['animation_delay'] ? 300 : false,
    ]) : false,
    'data-type' => $theme['@customizer']->isActive() ? 'section' : false
];
$attrs_overlay = [];
$attrs_container = [];
$attrs_viewport_height = [];
$attrs_video = [];
$attrs_media = [];

// Transparent header
$transparent = $element['header_transparent'];
$header = $this->render('header', compact('transparent'));

// Section
$class[] = "uk-section";

if ($transparent && $header) {
    $attrs_media['class'][] = "uk-section-{$element['style']}";
} else {
    $class[] = "uk-section-{$element['style']}";
}

// Text color
if ($element['style'] == 'primary' || $element['style'] == 'secondary') {
    if ($transparent && $header) {
        $attrs_media['class'][] = 'uk-preserve-color';
        $class[] = !$element['preserve_color'] ? "uk-{$transparent}" : '';
    } else {
        $class[] = $element['preserve_color'] ? 'uk-preserve-color' : '';
    }
}

if ($element['style'] == 'image' || $element['style'] == 'video') {
    $class[] = $element['text_color'] ? "uk-{$element['text_color']}" : '';
}

// Image
if ($element['image'] && $element['style'] == 'image') {

    if ($element['image_width'] || $element['image_height']) {
        $element['image'] = "{$element['image']}?thumbnail={$element['image_width']},{$element['image_height']}";
    }

    $attrs_media['style'][] = "background-image: url('{$app['image']->getUrl($element['image'])}');";

    // Settings
    $attrs_media['class'][] = 'uk-background-norepeat';
    $attrs_media['class'][] = $element['image_size'] ? "uk-background-{$element['image_size']}" : '';
    $attrs_media['class'][] = $element['image_position'] ? "uk-background-{$element['image_position']}" : '';
    $attrs_media['class'][] = $element['image_fixed'] ? "uk-background-fixed" : '';
    $attrs_media['class'][] = $element['image_visibility'] ? "uk-background-image@{$element['image_visibility']}" : '';
    $attrs_media['class'][] = $element['media_blend_mode'] ? "uk-background-blend-{$element['media_blend_mode']}" : '';
    $attrs_media['style'][] = $element['media_background'] ? "background-color: {$element['media_background']};" : '';

    // Overlay
    if ($element['media_overlay']) {
        $attrs_media['class'][] = 'uk-position-relative';
        $attrs_overlay['style'] = "background-color: {$element['media_overlay']};";
    }

}

// Video
if ($element['video'] && $element['style'] == 'video') {

    // Settings
    $attrs_media['style'][] = $element['media_background'] ? "background-color: {$element['media_background']};" : '';
    $attrs_video['class'][] = $element['media_blend_mode'] ? "uk-blend-{$element['media_blend_mode']}" : '';

    // Overlay
    if ($element['media_overlay']) {
        $attrs_media['class'][] = "uk-position-relative";
        $attrs_overlay['style'] = "background-color: {$element['media_overlay']};";
    }

    $attrs_media['class'][] = "uk-cover-container";

    // Video
    $attrs_video['width'] = $element['video_width'];
    $attrs_video['height'] = $element['video_height'];

    if ($iframe = $this->iframeVideo($element['video'])) {

        $attrs_video['src'] = $iframe;
        $attrs_video['frameborder'] = '0';
        $attrs_video['allowfullscreen'] = true;
        $attrs_video['uk-cover'] = true;

        $element['video'] = "<iframe{$this->attrs($attrs_video)}></iframe>";

    } else if ($element['video']) {

        $attrs_video['src'] = $element['video'];
        $attrs_video['controls'] = false;
        $attrs_video['loop'] = true;
        $attrs_video['autoplay'] = true;
        $attrs_video['uk-cover'] = true;

        $element['video'] = "<video{$this->attrs($attrs_video)}></video>";
    }

} else {
    $element['video'] = '';
}

// Padding
switch ($element['padding']) {
    case 'small':
    case 'large':
    case 'xlarge':
        $class[] = "uk-section-{$element['padding']}";
        break;
    case 'none':
        $class[] = 'uk-padding-remove-vertical';
        break;
}

if ($element['padding'] != 'none') {
    if ($element['padding_remove_top']) {
        $class[] = 'uk-padding-remove-top';
    }
    if ($element['padding_remove_bottom']) {
        $class[] = 'uk-padding-remove-bottom';
    }
}

// Height Viewport
if ($element['height']) {

    if ($element['height'] === 'offset') {
        $class[] = 'uk-flex uk-flex-middle';
        $attrs_viewport_height['class'][] = 'uk-width-1-1';
    }

    $attrs['uk-height-viewport'] = 'mode: '.$element['height'];
}

// Container and width
switch ($element['width']) {
    case 'default':
        $attrs_container['class'][] = 'uk-container';
        break;
    case 'small':
    case 'large':
    case 'expand':
        $attrs_container['class'][] = "uk-container uk-container-{$element['width']}";
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
if ($attrs_overlay || $element['video']) {
    $attrs_container['class'][] = 'uk-position-relative';
}

// Visibility
$visible = 4;
$visibilities = ['xs', 's', 'm', 'l', 'xl'];

foreach ($element as $el) {
    $visible = min(array_search($el['visibility'], $visibilities), $visible);
}

if ($visible) {
    $element['visibility'] = $visibilities[$visible];
    $class[] = "uk-visible@{$visibilities[$visible]}";
}

?>

<?php if ($transparent && $header) : ?>

    <div<?= $this->attrs(['class' => 'js-sticky'], $attrs_media) ?>>

        <?= $element['video'] ?>

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

            <?= $element ?>

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

        <?= $element['video'] ?>

        <?php if ($attrs_overlay) : ?>
        <div class="uk-position-cover"<?= $this->attrs($attrs_overlay) ?>></div>
        <?php endif ?>

        <?php if ($attrs_viewport_height) : ?>
        <div<?= $this->attrs($attrs_viewport_height) ?>>
        <?php endif ?>

        <?php if ($attrs_container) : ?>
        <div<?= $this->attrs($attrs_container) ?>>
        <?php endif ?>

        <?= $element ?>

        <?php if ($attrs_container) : ?>
        </div>
        <?php endif ?>

        <?php if ($attrs_viewport_height) : ?>
        </div>
        <?php endif ?>

    </div>

<?php endif ?>
