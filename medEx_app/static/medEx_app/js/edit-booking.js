$(document).ready(function() {
    // Modal elements
    const $editModal = $('#editBookingModal');
    const $deleteModal = $('#deleteModal');
    const $bookingForm = $('#bookingForm');
            
    // Edit Booking Functionality
    $('.edit-btn').on('click', function() {
        const bookingId = $(this).data('booking-id');
        const $card = $(this).closest('[data-booking-id]');

        // Fill form with current data
        $('#bookingId').val(bookingId);
        $('#editName').val($card.find('.booking-name').text().trim());
        $('#editContact').val($card.find('.booking-contact').text().trim());
        $('#editIllness').val($card.find('.booking-illness').text().trim());

        // Format date for datetime-local input
        const rawDate = $card.find('.booking-date').data('date');
            $('#editDate').val(rawDate);

        // Show modal
        $editModal.removeClass('hidden').addClass('active');
    });

    // Delete Booking Functionality
    $('.delete-btn').on('click', function(e) {
        e.stopPropagation();
        const bookingId = $(this).data('booking-id');
        $('#deleteBookingId').val(bookingId);
        $deleteModal.removeClass('hidden').addClass('active');
    });

    // Close modals
    function closeAllModals() {
        $editModal.addClass('hidden').removeClass('active');
        $deleteModal.addClass('hidden').removeClass('active');
    }

    $('#closeModal, #cancelEdit').on('click', closeAllModals);
    $('#closeDeleteModal, #cancelDelete').on('click', closeAllModals);

    // Close when clicking outside modal
    $('.modal').on('click', function(e) {
        if (e.target === this) {
            closeAllModals();
        }
    });

    // Handle edit form submission
    $bookingForm.on('submit', function(e) {
        e.preventDefault();
        console.log('Form Data:', $(this).serialize()); // Debug
                
        $.ajax({
            url: 'my-bookings/update/',
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                if (response.status === 'success') {
                    const bookingId = $('#bookingId').val();
                    const $card = $(`[data-booking-id="${bookingId}"]`);

                    $card.find('.booking-name').text($('#editName').val());
                    $card.find('.booking-contact').text($('#editContact').val());
                    $card.find('.booking-illness').text($('#editIllness').val());
                            
                    const dateObj = new Date($('#editDate').val());
                    const formattedDate = dateObj.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    $card.find('.booking-date').text(formattedDate);

                    closeAllModals();
                    alert('Booking updated successfully!');
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', status, error, xhr.responseText);
                alert('Network error. Please try again.');
            }
        });
    });

    // Handle delete confirmation
    $('#confirmDelete').on('click', function() {
        const bookingId = $('#deleteBookingId').val();
                
        $.ajax({
            url: '/my-bookings/delete/',
            method: 'POST',
            data: {
                booking_id: bookingId,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function(response) {
                if (response.status === 'success') {
                    $(`[data-booking-id="${bookingId}"]`).fadeOut(300, function() {
                        $(this).remove();
                    });
                    closeAllModals();
                    alert('Booking deleted successfully!');
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', status, error, xhr.responseText);
                alert('Network error. Please try again.');
            }
        });
    });
});
