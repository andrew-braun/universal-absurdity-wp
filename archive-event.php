<?php get_header();
pageBanner(array(
    "title" => "All Events",
    "subtitle" => "Gaze upon the horror!"
));
?>



<div class="container container--narrow page-section">
    <?php
    while (have_posts()) {
        the_post();
        get_template_part("template-parts/content-event");
    }
    echo paginate_links();
    ?>
    <hr class="section-break" />
    <div class="past-events-container">
        <p>Check out what we've done in the past!
            <a href="<?php echo site_url("/past-events"); ?>"><button>Past events</button></a>
        </p>
    </div>
</div>

<?php get_footer() ?>