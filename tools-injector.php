<?php
/*
Plugin Name: Tools Injector
Description: Inject tools.js into page_id=90
Version: 1.0
*/
add_action('wp_enqueue_scripts', function() {
    if(is_page(90)) {
        wp_enqueue_script('bilbil-tools', 'https://cdn.jsdelivr.net/gh/yuanzhi20/bilbil-tools@master/tools.js', array(), '1.0', true);
    }
});
