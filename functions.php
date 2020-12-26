<?php 

require get_theme_file_path("/includes/search-route.php");
require get_theme_file_path("/includes/like-route.php");

function universal_custom_api() {
    register_rest_field("post", "authorName", array(
        "get_callback" => function() {return get_the_author();}
    ));
    register_rest_field('note', 'userNoteCount', array(
        'get_callback' => function() {return count_user_posts(get_current_user_id(), 'note');}
      ));
}

add_action("rest_api_init", "universal_custom_api");

function pageBanner($args = NULL) {
    // PHP logic here

      if (!$args['title']) {
        $args['title'] = get_the_title();
      }
     
      if (!$args['subtitle']) {
        $args['subtitle'] = get_field('page_banner_subtitle');
      }
     
      if (!$args['photo']) {
        if (get_field('page_banner_background_image') AND !is_archive() AND !is_home() ) {
          $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
          $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }
    
    ?>
    <div class="page-banner">
        <div class="page-banner__bg-image" 
            style="background-image: url(
                <?php echo $args["photo"]; ?>);">
        </div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php echo $args["title"] ?></h1>
            <div class="page-banner__intro">
                <p><?php echo $args["subtitle"]; ?></p>
            </div>
        </div>
    </div>

<?php }

/* Import styles and scripts */
function universal_imports() {
    wp_enqueue_style("google-fonts", "https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");
    wp_enqueue_style("font-awesome", "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    wp_enqueue_script("google-map", "//maps.googleapis.com/maps/api/js?key=AIzaSyCaNJgJD-c3k0cGovvCiZASvlPAOJCn8jw", NULL, "1.0", true);
    if (strstr($_SERVER["SERVER_NAME"], "universal-absurdity.local")) {
        wp_enqueue_script("universal-js", "http://localhost:3000/bundled.js", NULL, "1.0", true);
        wp_enqueue_style("our-main-styles", get_theme_file_uri("/bundled-assets/styles.df62b3b2c9df4d70618e.css"));
    } else {
        wp_enqueue_script("our-vendors-js", get_theme_file_uri("/bundled-assets/vendors~scripts.8c97d901916ad616a264.js"), NULL, "1.0", true);
        wp_enqueue_script("universal-js", get_theme_file_uri("/bundled-assets/scripts.f7870004fb1b3e9c55cc.js"), NULL, "1.0", true);
        wp_enqueue_style("our-main-styles", get_theme_file_uri("/bundled-assets/styles.f7870004fb1b3e9c55cc.css"));
    }
    wp_localize_script("universal-js", "universalData", array(
        "root_url" => get_site_url(),
        "nonce" => wp_create_nonce("wp_rest")
    ));
}
/* Execute the import function */
add_action("wp_enqueue_scripts", "universal_imports");

/* Initiate website features */
function universal_features() {
    add_theme_support("title-tag");
    add_theme_support("post-thumbnails");
    add_image_size("professorLandscape", 400, 260, true);
    add_image_size("professorPortrait", 400, 600, true);
    add_image_size("pageBanner", 1500, 350, true);
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

    if (!is_admin() AND is_post_type_archive("campus") AND $query->is_main_query()) {
        $query->set("posts_per_page", -1);
    }
}

add_action("pre_get_posts", "universal_adjust_queries");

function universalMapKey($api) {
    $api["key"] = "AIzaSyCaNJgJD-c3k0cGovvCiZASvlPAOJCn8jw";
    return $api;
}

add_filter("acf/fields/google_map/api", "universalMapKey");

// Redirect subscriber accounts to homepage, not admin
add_action("admin_init", "redirectSubscribersToFrontend");

function redirectSubscribersToFrontend() {
    $currentUser = wp_get_current_user();
    if (count($currentUser->roles) == 1 AND $currentUser->roles[0] == "subscriber") {
        wp_redirect(site_url("/"));
        exit;
    }
}

add_action("wp_loaded", "noSubscribersAdminBar");

function noSubscribersAdminBar() {
    $currentUser = wp_get_current_user();
    if (count($currentUser->roles) == 1 AND $currentUser->roles[0] == "subscriber") {
        show_admin_bar(false);
    }
}

// Customize login page
add_filter("login_headerurl", "headerURL");

function headerURL() {
    return esc_url(site_url());
}

add_filter("login_headertitle", "loginTitle");

function loginTitle() {
    return get_bloginfo("name");
}

add_action("login_enqueue_scripts", "mainLoginCSS");

function mainLoginCSS() {
    wp_enqueue_style("google-fonts", "https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i");
    // go to direct site styles instead of bundled because webpack isn't updating hashes
    wp_enqueue_style("styles", get_template_directory_uri() . '/style.css' );
    wp_enqueue_style("main-styles", get_theme_file_uri("/bundled-assets/styles.f7870004fb1b3e9c55cc.css"));
    
}

// Force all note posts status private--curently breaking my notes for some reason

add_filter('wp_insert_post_data', 'makeNotePrivate', 10, 2);

function makeNotePrivate($data, $postarr) {
  if ($data['post_type'] == 'note') {
    if(count_user_posts(get_current_user_id(), 'note') > 4 AND !$postarr['ID']) {
      die("Note Limit: You have reached your note limit. This is just a test website--you really shouldn't be keeping all your notes here!");
    }

    $data['post_content'] = sanitize_textarea_field($data['post_content']);
    $data['post_title'] = sanitize_text_field($data['post_title']);
  }

  if($data['post_type'] == 'note' AND $data['post_status'] != 'trash') {
    $data['post_status'] = "private";
  }
  
  return $data;
}

?>