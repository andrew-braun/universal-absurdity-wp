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

    $mainResults = array(
        "generalInfo" => array(),
        "professor" => array(),
        "program" => array(),
        "event" => array(),
        "campus" => array(),
    );

while ($mainQuery->have_posts()) {
	$mainQuery->the_post(); //gets all the relevant data for the post ready to use

	// $category = '';

	if (get_post_type() === "post" || get_post_type() === "page") {
        array_push($mainResults["generalInfo"], [ //associative array to retrieve the data
            "title" => get_the_title(),
            "author" => get_the_author(),
            "permalink" => get_the_permalink(),
            "postType" => get_post_type()
            
        ]);
	} elseif (get_post_type() === "professor") {
		array_push($mainResults["professor"], [ //associative array to retrieve the data
            "title" => get_the_title(),
            "permalink" => get_the_permalink()
        ]);
	} elseif (get_post_type() === "campus") {
		array_push($mainResults["campus"], [ //associative array to retrieve the data
            "title" => get_the_title(),
            "permalink" => get_the_permalink()
        ]);
	} elseif (get_post_type() === "event") {
		array_push($mainResults["event"], [ //associative array to retrieve the data
            "title" => get_the_title(),
            "permalink" => get_the_permalink()
        ]);
	} elseif (get_post_type() === "program") {
		array_push($mainResults["program"], [ //associative array to retrieve the data
            "title" => get_the_title(),
            "permalink" => get_the_permalink()
        ]);
	}

	//push the data in the #2 parameter onto the $mainQueryResults array
	// array_push($mainResults[$category], [ //associative array to retrieve the data
	// 	'title' => get_the_title(),
	// 	'permalink' => get_the_permalink()
	// ]);
}

    
    // while($mainQuery->have_posts()) {
    //     $mainQuery->the_post();
    //     if (get_post_type() === "post" OR get_post_type() === "page") {
    //         array_push($results["generalInfo"], array(
    //             "title" => get_the_title(),
    //             "link" => get_the_permalink(),
    //         ));
    //     } else {
    //         array_push($results[get_post_type()], array(
    //             "title" => get_the_title(),
    //             "link" => get_the_permalink(),
    //         ));
    //     }
    // }

    return $mainResults;
}

?>