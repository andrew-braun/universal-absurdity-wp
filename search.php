<?php get_header();
pageBanner(array(
    "title" => "Search Results",
    "subtitle" => "Here's what we found for &ldquo;" . get_search_query() . "&rdquo;"
));
?>
<div class="container container--narrow page-section">
    <?php
        get_search_form();
        if (have_posts()) {
        while(have_posts()) {
            the_post(); 
            get_template_part("template-parts/content", get_post_type());    
         } 
            echo paginate_links();
            
        } else {
            echo "<h2 class='headline headline--small-plus'>Move along, citizen, nothing to see here.</h2>";
            get_search_form();
        }
        ?>
        
</div>

<?php get_footer() ?>