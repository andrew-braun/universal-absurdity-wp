<?php 

add_action("rest_api_init", "universalSearchRegister");

function universalSearchRegister() {
    register_rest_route("content/v1", "search", array(
        "methods" => WP_REST_SERVER::READABLE,
        "callback" => "returnSearchResults"
    ));
}

function returnSearchResults($data) {
    $mainQuery = new WP_Query(array(
        "post_type" => array("post", "page", "professor", "program", "campus", "event"),
        "s" => sanitize_text_field($data["term"]),
    ));

    $results = array(
        "generalInfo" => array(),
        "professor" => array(),
        "program" => array(),
        "event" => array(),
        "campus" => array(),
    );

    while($mainQuery->have_posts()) {
        $mainQuery->the_post();
        if (get_post_type() === "post" OR get_post_type() === "page") {
            array_push($results["generalInfo"], array(
                "title" => get_the_title(),
                "link" => get_the_permalink(),
            ));
        } else {
            array_push($results[get_post_type()], array(
                "title" => get_the_title(),
                "link" => get_the_permalink(),
            ));
        }
    }

    return $results;
}

?>