<?php 

/* Import styles and scripts */
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
/* Execute the import function */
add_action("wp_enqueue_scripts", "universal_imports");

/* Initiate website features */
function universal_features() {
    add_theme_support("title-tag");
    register_nav_menu("headerMenuLocation", "Header Menu Location");
    register_nav_menu("footerMenuLocation1", "Footer Menu Location 1");
    register_nav_menu("footerMenuLocation2", "Footer Menu Location 2");
}
/* Execute the add features action */
add_action("after_setup_theme", "universal_features");

function universal_adjust_queries($query) {
    $today = date("Ymd");
    if (!is_admin() AND is_post_type_archive("event") AND $query->is_main_query()) {
        $query->set("posts_per_page", 10);
        $query->set("meta_key", "event_date");
        $query->set("orderby", "meta_value");
        $query->set("order", "ASC");
        $query->set("order", "ASC");
        $query->set("meta_query", array(
            "key" => "event_date",
            "compare" => ">=",
            "value" => $today,
            "type" => "numeric"
        ));
    }
    if (!is_admin() AND is_post_type_archive("program") AND $query->is_main_query()) {
        $query->set("posts_per_page", -1);
        $query->set("orderby", "title");
        $query->set("order", "ASC");
    }
}

add_action("pre_get_posts", "universal_adjust_queries");

?>