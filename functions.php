<?php 

function universal_imports() {
    wp_enqueue_style("google-fonts", "https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");
    wp_enqueue_style("font-awesome", "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    wp_enqueue_style("universal_styles", get_stylesheet_uri());
}

add_action("wp_enqueue_scripts", "universal_imports");

?>