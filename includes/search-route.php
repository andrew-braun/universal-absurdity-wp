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
            "permalink" => get_the_permalink(),
            "image" => get_the_post_thumbnail_url()
        ]);
	} elseif (get_post_type() === "campus") {
		array_push($mainResults["campus"], [ //associative array to retrieve the data
            "title" => get_the_title(),
            "permalink" => get_the_permalink()
        ]);
	} elseif (get_post_type() === "event") {
        
        $eventDate = new DateTime(get_field("event_date"));
        $description = null;
        if (has_excerpt()) {
            $description = get_the_excerpt();
        } else {
            $description = wp_trim_words(get_the_content(), 18);
        }
		array_push($mainResults["event"], [ //associative array to retrieve the data
            "title" => get_the_title(),
            "permalink" => get_the_permalink(),
            "month" => $eventDate->format("M"),
            "day" => $eventDate->format("d"),
            "description" => $description,
            
        ]);
	} elseif (get_post_type() === "program") {
        $relatedCampuses = get_field('related_campus');
  
        if ($relatedCampuses) {
          foreach($relatedCampuses as $campus) {
            array_push($mainResults["campus"], array(
              'title' => get_the_title($campus),
              'permalink' => get_the_permalink($campus)
            ));
          }
        }
      
        array_push($mainResults['program'], array(
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'id' => get_the_id()
        ));
      }

}

    if ($mainResults["program"]) {
        $programMetaQuery = array("relation" => "OR");

        foreach($mainResults["program"] as $item) {
            array_push($programMetaQuery, 
            array(
                "key" => "related_program",
                "compare" => "LIKE",
                "value" => '"' . $item["id"] . '"',
    
            )
        );
        }
    
        $programRelationshipQuery = new WP_Query(array(
            "post_type" => array(
                "professor",
                "event",
                "campus"
            ),
            "meta_query" => $programMetaQuery
            )
        );
    
        while ($programRelationshipQuery->have_posts()) {
            $programRelationshipQuery->the_post();
    
            if (get_post_type() === "professor") {
                array_push($mainResults["professor"], [ //associative array to retrieve the data
                    "title" => get_the_title(),
                    "permalink" => get_the_permalink(),
                    "image" => get_the_post_thumbnail_url()
                ]);
            }
            if (get_post_type() === "event") {
                $eventDate = new DateTime(get_field("event_date"));
                $description = null;
                if (has_excerpt()) {
                    $description = get_the_excerpt();
                } else {
                    $description = wp_trim_words(get_the_content(), 18);
                }
                array_push($mainResults["event"], [ //associative array to retrieve the data
                    "title" => get_the_title(),
                    "permalink" => get_the_permalink(),
                    "month" => $eventDate->format("M"),
                    "day" => $eventDate->format("d"),
                    "description" => $description,
            
        ]);
            }
            
        }
    
        $mainResults["professor"] = array_values(array_unique($mainResults["professor"], SORT_REGULAR));
        $mainResults["event"] = array_values(array_unique($mainResults["event"], SORT_REGULAR));
        $mainResults["campus"] = array_values(array_unique($mainResults["campus"], SORT_REGULAR));

        
    }
  
    return $mainResults;
}

?>