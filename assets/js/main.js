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

// Get the modal elements
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");
const closeModal = document.querySelector(".close");

// Add click event to all images with the class "myImg"
document.querySelectorAll(".myImg").forEach((img) => {
    img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src; // Set the modal image source
        captionText.innerHTML = this.alt; // Set the modal caption
    };
});

// Close modal when clicking the "close" button
closeModal.onclick = function () {
    modal.style.display = "none";
};

// Close modal when clicking outside of the modal image
modal.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};



