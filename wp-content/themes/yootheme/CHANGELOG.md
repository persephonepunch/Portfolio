# Changelog

## 1.2.0 (December 05, 2016)

### Added

- Launch Page Builder from article edit (Joomla)
- Add front-end editing if page builder is active (Joomla)
- Add layout options for blog and posts
- Add title options for modules/widgets
- Add headline style line to elements
- Add preserve color option for primary and secondary sections
- Add x-large padding to section options
- Add dashboard quickicon for website builder (Joomla)

### Changed

- Refactored system pages and modules/widgets
- Split element component into divider, heading and link component
- Primary and secondary sections now adapt the text color automatically
- Mark menu-item as active if current page is a sub-page of the menu-item (WordPress)
- Page Builder button opens builder directly (WordPress)

### Fixed

- Fix sidebar wrapping if grid gutter is none
- Fix element settings if previously saved empty
- Fix WooCommerce styling
- Fix missing alt attribute for intro images (Joomla)
- Fix widget selection in builder (Wordpress)
- Fix codemirror overflow in front-end editing (Joomla)
- Fix module blank style
- Resetting style variables shows save button

## 1.1.6 (November 24, 2016)

### Changed

- Set form radio background to transparent in material uikit style

### Fixed

- Fix icon ratio and color in list element
- Fix Navbar item options (WordPress)
- Fix Map element (WordPress)
- Fix scroll behaviour on page refresh

## 1.1.5 (November 21, 2016)

### Added

- Add max width option for grids in the builder
- Add option to open links in new window for all list elements
- Add smooth scrolling to links with URL fragments for all elements
- Add sidebar.php layout file (required by WooCommerce)
- Add icon alignment option to button element
- Add icon option to list element
- Add link muted as style option to button element
- Make builder element templates overridable in child-theme (/builder/{element}/template.php)

### Changed

- Update Bootstrap layer (Joomla)

### Fixed

- Make transparent header work with section styles
- Remove possible horizontal scrollbar during animations
- Fix font-smoothing after animation for Webkit
- Fix textarea border for minimal style
- Fix z-index issue for mobile dropdown menu
- Fix asset urls within installations using custom ports (WordPress)
- Save button on Menu/Module edit (Joomla)
- Ignore compression setting in customizer mode
- Access check on builder page (Joomla)
- Navbar item options (WordPress)

## 1.1.4 (November 15, 2016)

### Added

- Clear cache button
- Pass through video url parameters (video element)

### Changed

- Saving a layout won't show the builder's save button
- Show default social icon if service is unknown

### Fixed

- Menu widgets (WordPress)
- Element sorting in builder

## 1.1.3 (November 11, 2016)

### Fixed

- Fix theme updater (Wordpress)

## 1.1.2 (November 11, 2016)

### Fixed

- Fix builder on empty article (Joomla)

## 1.1.1 (November 10, 2016)

### Added

- "New" button for menu items and modules (Joomla)

### Changed

- Update Google Fonts list
- Optimize drag style for builder elements
- Optimize changelog style

### Fixed

- Fix element animations delay
- Fix image element svg width/heigth
- Fix duplicating social icons bug (WordPress)
- Fix builder output with Joomla cache enabled
- Fix custom class on module/widget element
- Fix child themes (WordPress)

## 1.1.0 (November 07, 2016)

### Added

- Add WordPress support
- Add grid element to builder
- Apply content plugins/shortcodes to Builder output

### Fixed

- Fix builder element default values
- Fix click behaviour on item links in navbar
- Fix builder row layout edit
- Fix iconnav test

## 1.0.11 (November 02, 2016)

### Fixed

- Fix regression with Google fonts

## 1.0.10 (November 02, 2016)

### Added

- Add fixed width option for grids
- Add decorative line for navbar items
- Add divider small style
- Add border mode top, left and right to style components
- Add box-shadow option to form and offcanvas
- Add more style options to blockquote and card badge

### Changed

- Improved variables ordering in style customizer
- Improved preview loading

### Fixed

- Customizer "cancel" no longer resets builder changes
- Make heading bullet work with text align
- Fix initial missing Google font variant and language settings
- Fix section default values
- Fix "Export variables" button disabled state
- Scrollspy animation classes are no longer applied to the row
- Joomla Module element respects its module's settings

## 1.0.9 (October 26, 2016)

### Added

- Add large option to section width
- Add xl alignment breakpoint for text align in elements

### Fixed

- Fix administration style
- Fix error on closing panel with editor, before value is set
- Fix always respect blog columns setting, preventing full-width articles
- Fix populate image alt attribute with filename if no alt text is set
- Fix missing inverse style options for all components
- Respect blog columns to prevent full width articles at the end
- HTML tags will no longer be stripped from footer elements

## 1.0.8 (October 21, 2016)

### Changed

- Significant speed improvement for style customizer

### Fixed

- Catch error with builder element
- Fix cancel button behaviour

## 1.0.7 (October 20, 2016)

### Added

- Add box shadow options to style components
- Add 100% width option in module template settings

### Changed

- Move image/video options for sections into their own panel
- Optimized box-shadow picker
- Optimized preview loading

### Fixed

- Fix default values in builder elements
- Fix variable names in style customizer
- Center social icons in header modal
- Fix builder toolbar (Safari 10)
- Fix page class output
- Fix .row-striped styling (bootstrap)
- Fix css minification

## 1.0.6 (October 19, 2016)

### Changed

- Wrap custom js code in try/catch block
- Optimize variable groups in style
- Rename search border radius variable

### Fixed

- Update UIkit components after css injection in style preview panel
- Fix style group ordering
- Fix media manager in debug mode (Joomla)
- Fix text color option if navbar is transparent
- Fix UIkit tests if boxed page layout is set

## 1.0.5 (October 18, 2016)

### Added

- Add border and typo options to style components
- Add border mode to style components
- Add background and border options to slidenav and totop style component
- Allow for css/custom.css in child theme
- Allow to add style via child themes

### Changed

- Minify theme CSS
- Load minified UIkit
- LESS updates accordion to UIkit
- Optimize UIkit tests
- Optimize variable groups in style
- Rename subnav, tab and breadcrumb item variables

### Fixed

- Prevent background repeat for section images
- Fix card media border-radius
- Expand main section to fill the viewport if needed
- Set default style to minimal
- Load bootstrap framework
- Builder row layout select (Safari 10)
- Template module positions preview (tp=1)
- Fix bootstrap input resets
- Fix Codemirror style

## 1.0.4 (October 12, 2016)

### Fixed

- Fix minor UI issues
- Fix image indicator if color field is none

## 1.0.3 (October 11, 2016)

### Fixed

- Fix style font picker
- Fix child theme select
- Fix preview box-shadow
- Fix temporarily preview scrollbars in Firefox
- Prevent builder being active on offline login
- Prevent modules/menu items stay checked out after edit

## 1.0.2 (October 11, 2016)

### Fixed

- Fix modules rendering bug
- Fix offline mode in preview

## 1.0.1 (October 10, 2016)

### Fixed

- Fix Joomla URI handling

## 1.0.0 (October 10, 2016)

### Added

- Initial release
