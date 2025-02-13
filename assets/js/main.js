"use strict";

jQuery(document).ready(function ($) {
    jQuery(window).load(function () {
        jQuery(".loaded").fadeOut();
        jQuery(".preloader").delay(1000).fadeOut("slow");
    });

    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    const isIndexPage = window.location.pathname.includes("index.html") || window.location.pathname === "/";

    if (isIndexPage) {
        initializeSinglePageScroll();
    } else {
        initializeMultiPageNav();
    }

    /*---------------------------------------------*
     * WOW Animation Initialization
     ---------------------------------------------*/
    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();

    /*---------------------------------------------*
     * Scroll Up Button
     ---------------------------------------------*/
    jQuery(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    jQuery('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });

    /*---------------------------------------------*
     * Gallery Popup
     ---------------------------------------------*/
    jQuery('.gallery-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /*---------------------------------------------*
     * Blurred Image - Clip Effect
     ---------------------------------------------*/
    set_clip_property();
    $(window).on('resize', function () {
        set_clip_property();
    });

    function set_clip_property() {
        var $header_height = $('.cd-header').height(),
            $window_height = $(window).height(),
            $header_top = $window_height - $header_height,
            $window_width = $(window).width();
        $('.cd-blurred-bg').css('clip', 'rect(' + $header_top + 'px, ' + $window_width + 'px, ' + $window_height + 'px, 0px)');
    }

    // End of Main Code
});

/*---------------------------------------------*
 * Single Page Scroll Logic (Index Page)
 ---------------------------------------------*/
function initializeSinglePageScroll() {
    const menuTrigger = $(".cd-menu-trigger");
    const mainNav = $("#main-nav");
    const shadowLayer = $(".cd-shadow-layer");

    // Open Menu
    menuTrigger.on("click", function (e) {
        e.preventDefault();
        mainNav.addClass("is-visible");
        shadowLayer.addClass("is-visible");
        $(".home-main-content").addClass("move-out");
    });

    // Close Menu
    $(".cd-close-menu, .cd-shadow-layer").on("click", function (e) {
        e.preventDefault();
        mainNav.removeClass("is-visible");
        shadowLayer.removeClass("is-visible");
        $(".home-main-content").removeClass("move-out");
    });

    // Smooth Scrolling for Anchors
    $('#main-nav a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        const target = $($(this).attr("href"));
        if (target.length) {
            $("body,html").animate(
                { scrollTop: target.offset().top },
                900
            );
            mainNav.removeClass("is-visible");
            shadowLayer.removeClass("is-visible");
            $(".home-main-content").removeClass("move-out");
        }
    });
}

/*---------------------------------------------*
 * Multi-Page Navigation Logic
 ---------------------------------------------*/
function initializeMultiPageNav() {
    const menuTrigger = $(".cd-menu-trigger");
    const mainNav = $("#main-nav");
    const shadowLayer = $(".cd-shadow-layer");

    // Open Menu
    menuTrigger.on("click", function (e) {
        e.preventDefault();
        mainNav.addClass("is-visible");
        shadowLayer.addClass("is-visible");
    });

    // Close Menu
    $(".cd-close-menu, .cd-shadow-layer").on("click", function (e) {
        e.preventDefault();
        mainNav.removeClass("is-visible");
        shadowLayer.removeClass("is-visible");
    });

    // Close Menu When Clicking a Link
    $("#main-nav a").on("click", function () {
        mainNav.removeClass("is-visible");
        shadowLayer.removeClass("is-visible");
    });
}

        let currentIndex = 0;
        const images = document.querySelectorAll(".gallery-img");
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        const captionText = document.getElementById("caption");
        const closeBtn = document.querySelector(".close");

        images.forEach((img, index) => {
            img.addEventListener("click", function() {
                lightbox.style.display = "flex";
                lightboxImg.src = this.src;
                captionText.innerHTML = this.alt;
                currentIndex = index;
            });
        });

        function changeImage(direction) {
            currentIndex += direction;
            if (currentIndex < 0) currentIndex = images.length - 1;
            if (currentIndex >= images.length) currentIndex = 0;
            lightboxImg.src = images[currentIndex].src;
            captionText.innerHTML = images[currentIndex].alt;
        }

        closeBtn.onclick = function() {
            lightbox.style.display = "none";
        };

        lightbox.onclick = function(event) {
            if (event.target === lightbox) {
                lightbox.style.display = "none";
            }
        };


