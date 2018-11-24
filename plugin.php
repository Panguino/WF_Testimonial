<?php
/**
 * Plugin Name: Testimonials Slideshow Block
 * Plugin URI: 
 * Description: Used to display a rotating slideshow of testimonials
 * Author: Waterfall Media / Bannerwave LLC
 * Author URI: https://waterfallmedia.net
 * Version: 0.0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package WFMB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
