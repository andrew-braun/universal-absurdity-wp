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
    $professor = sanitize_text_field($headers["professorId"]);

    wp_insert_post(array(
        "post_type" => "like",
        "post_status" => "publish",
        "post_title" => "PHP_Create_Post_2",
        "meta_input" => array(
            "liked_professor_id" => $professor
        ) 
    ));
    
}

function deleteLike() {
    return "delete like";
}