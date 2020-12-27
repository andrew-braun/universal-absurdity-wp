<?php 

add_action("rest_api_init", "universalLikeRoutes");

function universalLikeRoutes() {
    register_rest_route("universal/v1", "manageLike", array(
        "methods" => "POST",
        "callback" => "createLike",
    ));
    register_rest_route("universal/v1", "manageLike", array(
        "methods" => "DELETE",
        "callback" => "deleteLike",
    ));
}

function createLike($headers) {
    if (is_user_logged_in()) {

        $professor = sanitize_text_field($headers["professorId"]);

        $existQuery = new WP_Query(array(
            "author" => get_current_user_id(),
            "post_type" => "like",
            "meta_query" => array(
                array(
                    "key" => "liked_professor_id",
                    "compare" => "=",
                    "value" => $professor
                )
            )
        ));

        if ($existQuery->found_posts == 0 AND get_post_type($professor) == "professor") {
            return wp_insert_post(array(
                "post_type" => "like",
                "post_status" => "publish",
                "post_title" => "PHP_Create_Post_2",
                "meta_input" => array(
                    "liked_professor_id" => $professor
                ) 
            ));
        } else {
            die("You already liked this professor!");
        }
    } else {
        die("Only logged-in users can create a like.");
    }
}

function deleteLike() {
    return "delete like";
}