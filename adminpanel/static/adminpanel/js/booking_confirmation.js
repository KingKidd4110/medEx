        $(document).ready(function() {
            $('.approve-btn, .reject-btn').on('click', function() {
                const bookingId = $(this).data('booking-id');
                const action = $(this).hasClass('approve-btn') ? 'approve' : 'reject';
                const $card = $(this).closest('[data-booking-id]');

                $.ajax({
                    url: '',  // Matches your booking_list URL
                    method: 'POST',
                    data: {
                        booking_id: bookingId,
                        action: action,
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()  // Ensure CSRF token is in the form
                    },
                    success: function(response) {
                        if (response.status === 'success') {
                            $card.find('.bg-blue-100').remove();  // Remove Pending tag
                            if (response.new_status === 'approved') {
                                $card.find('.flex.space-x-2').html('<span class="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">Approved</span>');
                                location.reload();
                            } else if (response.new_status === 'rejected') {
                                $card.find('.flex.space-x-2').html('<span class="bg-red-100 text-red-800 px-3 py-1 rounded-md text-sm">Rejected</span>');
                                location.reload();
                            }
                        } else {
                            alert('Error: ' + response.message);
                            location.reload();
                        }
                    },
                    error: function() {
                        alert('Network error. Please try again.');
                    }
                });
            });
        });
