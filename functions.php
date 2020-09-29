<?php 

function universal_imports() {
    wp_enqueue_style("google-fonts", "https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");
    wp_enqueue_style("font-awesome", "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    if (strstr($_SERVER["SERVER_NAME"], "universal-absurdity.local")) {
        wp_enqueue_script("universal-js", "http://localhost:3000/bundled.js", NULL, "1.0", true);
        wp_enqueue_style("our-main-styles", get_theme_file_uri("/bundled-assets/styles.5270ce0561d57b985c13.css"));
    } else {
        wp_enqueue_script("our-vendors-js", get_theme_file_uri("/bundled-assets/vendors~scripts.8c97d901916ad616a264.js"), NULL, "1.0", true);
        wp_enqueue_script("universal-js", get_theme_file_uri("/bundled-assets/scripts.5270ce0561d57b985c13.js"), NULL, "1.0", true);
        wp_enqueue_style("our-main-styles", get_theme_file_uri("/bundled-assets/styles.5270ce0561d57b985c13.css"));
    }
}

add_action("wp_enqueue_scripts", "universal_imports");

function universal_features() {
    add_theme_support("title-tag");
    register_nav_menu("headerMenuLocation", "Header Menu Location");
    register_nav_menu("footerMenuLocation1", "Footer Menu Location 1");
    register_nav_menu("footerMenuLocation2", "Footer Menu Location 2");
}

add_action("after_setup_theme", "universal_features");

?>