<?php get_header(); ?>

<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri("/images/library-hero.jpg") ?>);"></div>
    <div class="page-banner__content container t-center c-white">
        <h1 class="headline headline--large">The Universe</h1>
        <h2 class="headline headline--medium">What does it all mean?</h2>
        <h3 class="headline headline--small">We don't know either. Let's find out together!</h3>
        <a href="#" class="btn btn--large btn--blue">Find Your Field</a>
    </div>
</div>

<div class="full-width-split group">
    <div class="full-width-split__one">
        <div class="full-width-split__inner">
            <h2 class="headline headline--small-plus t-center">Upcoming Events</h2>
            <?php 
                $homepageEvents = new WP_Query(array(
                    "posts_per_page" => 2,
                    "post_type" => "event"
                ));
                while($homepageEvents->have_posts()) {
                    $homepageEvents->the_post();
                    ?>
                    <div class="event-summary">
                        <a class="event-summary__date t-center" href="<?php the_permalink(); ?>">
                            <span class="event-summary__month"><?php the_time("M"); ?></span>
                            <span class="event-summary__day"><?php the_time("d"); ?></span>
                        </a>
                        <div class="event-summary__content">
                            <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                            <p><?php echo wp_trim_words(get_the_content(), 28); ?> <a href="<?php the_permalink(); ?>" class="nu gray">Learn more</a></p>
                        </div>
                    </div>


            <?php    }
            ?>
            <!-- <div class="event-summary">
                <a class="event-summary__date t-center" href="#">
                    <span class="event-summary__month"></span>
                    <span class="event-summary__day"></span>
                </a>
                <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny"><a href="#">Poetry in the 100</a></h5>
                    <p>Bring poems you&rsquo;ve wrote to the 100 building this Tuesday for an open mic and snacks. The theme: "Is Poetry Transcendental Art or Just a Mnemnonic Device That Helped Our Ancestors Survive?" <a href="#" class="nu gray">Learn more</a></p>
                </div>
            </div>
            <div class="event-summary">
                <a class="event-summary__date t-center" href="#">
                    <span class="event-summary__month">Apr</span>
                    <span class="event-summary__day">02</span>
                </a>
                <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny"><a href="#">Quad Picnic Party</a></h5>
                    <p>Live experimental music, a mystery taco truck, and more mildly upsetting entertainment can found at our third annual quad picnic day. <a href="#" class="nu gray">Learn more</a></p>
                </div>
            </div> -->

            <p class="t-center no-margin"><a href="#" class="btn btn--blue">View All Events</a></p>
        </div>
    </div>

    <div class="full-width-split__two">
        <div class="full-width-split__inner">
            <h2 class="headline headline--small-plus t-center">From Our Blog</h2>
            <?php  
                $homepagePosts = new WP_Query(array(
                    "posts_per_page" => "2"
                ));
                while ($homepagePosts->have_posts()) {
                    $homepagePosts->the_post();
            ?>
            <div class="event-summary">
                <a class="event-summary__date event-summary__date--beige t-center" href="<?php the_permalink(); ?>">
                    <span class="event-summary__month"><?php the_time("M"); ?></span>
                    <span class="event-summary__day"><?php the_time("d"); ?></span>
                </a>
                <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                    <?php echo wp_trim_wordS(get_the_content(), 18); ?>
                    <a href="<?php the_permalink(); ?>" class="nu gray">Read more</a></p>
                </div>
            </div>
            
            <?php   } wp_reset_postdata();
            ?>

            <p class="t-center no-margin"><a href="<?php echo site_url("/blog"); ?>" class="btn btn--yellow">View All Blog Posts</a></p>
        </div>
    </div>
</div>

<div class="hero-slider">
    <div data-glide-el="track" class="glide__track">
        <div class="glide__slides">
            <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri("/images/bus.jpg") ?>);">
                <div class="hero-slider__interior container">
                    <div class="hero-slider__overlay">
                        <h2 class="headline headline--medium t-center">Free Transportation</h2>
                        <p class="t-center">All students have free unlimited bus fare. Only applies to cat bus, as the normal bus has become sentient and is struggling with its place in the universe.</p>
                        <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
                    </div>
                </div>
            </div>
            <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri("/images/apples.jpg") ?>);">
                <div class="hero-slider__interior container">
                    <div class="hero-slider__overlay">
                        <h2 class="headline headline--medium t-center">An Apple a Day</h2>
                        <p class="t-center">Four out of five of our dentistry students recommend <em>not</em> brushing your teeth. The job market is tough these days.</p>
                        <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
                    </div>
                </div>
            </div>
            <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri("/images/bread.jpg") ?>;)">
                <div class="hero-slider__interior container">
                    <div class="hero-slider__overlay">
                        <h2 class="headline headline--medium t-center">Free Food</h2>
                        <p class="t-center">Soylent Green is not people.</p>
                        <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider__bullets glide__bullets" data-glide-el="controls[nav]"></div>
    </div>
</div>

<? get_footer(); ?>