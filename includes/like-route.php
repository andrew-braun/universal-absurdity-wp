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

function createLike() {
    return "create like!";
}

function deleteLike() {
    return "delete like";
}