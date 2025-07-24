$(document).ready(function() {
  // Toggle mobile menu
  $('#mobile-menu-button').click(function() {
    $('#mobile-menu').toggleClass('hidden');
  });

  // Close menu when clicking a link (optional)
  $('#mobile-menu a').click(function() {
    $('#mobile-menu').addClass('hidden');
  });
});
