<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} 

// Load Back-End CSS and JS
function testimonials_wf_editor_assets() {

	wp_enqueue_script(
		'testimonials_wf_js',
		plugins_url( 'dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
		true
	);

	wp_enqueue_style(
		'testimonials_wf_editor_css', 
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
	);
} 

add_action( 'enqueue_block_editor_assets', 'testimonials_wf_editor_assets' );

// Load Front-End CSS
function testimonials_wf_frontend_assets() {	
	
	wp_enqueue_style('bootstrap_v4_css', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css');	

    wp_enqueue_script( 'jquery','https://code.jquery.com/jquery-3.3.1.min.js' );
    wp_enqueue_script( 'bootstrap_popper','https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.5/umd/popper.min.js', array( 'jquery' ),'',true );
	wp_enqueue_script( 'bootstrap_v4_js','https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js', array( 'bootstrap_popper','jquery' ),'',true );

	wp_enqueue_style(
		'testimonials_wf_frontend_css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) )
	);
}
add_action( 'enqueue_block_assets', 'testimonials_wf_frontend_assets', 10, 1 );

/*
add_filter( 'allowed_block_types', 'my_function' );

function my_function( $allowed_block_types ) {
    return array(
        'cgb/special-block'
    );

}*/