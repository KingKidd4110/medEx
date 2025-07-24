$(document).ready(function() {
      // Toggle sections
    $(".section-btn").click(function() {
        const targetId = $(this).attr("id").replace("-btn", "-content");
        // Hide all other sections
    $(".section-content").not("#" + targetId).slideUp(300);
        // Toggle current section
    $("#" + targetId).slideToggle(300);
    });

      // Auto-scroll to section smoothly
    $(".section-btn").on("click", function() {
    $("html, body").animate({
        scrollTop: $("#" + $(this).attr("id").replace("-btn", "-content")).offset().top - 50
    }, 500);
    });
});

