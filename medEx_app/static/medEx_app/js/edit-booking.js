        $(document).ready(function() {
            // Modal elements
            const $modal = $('#editBookingModal');
            const $form = $('#bookingForm');

            // Open modal when edit button is clicked
            $('.edit-btn').on('click', function() {
                const bookingId = $(this).data('booking-id');
                const $card = $(this).closest('[data-booking-id]');

                // Fill form with current data
                $('#bookingId').val(bookingId);
                $('#editName').val($card.find('.booking-name').text().trim());
                $('#editContact').val($card.find('.booking-contact').text().trim());
                $('#editIllness').val($card.find('.booking-illness').text().trim());

                // --- START: MODIFIED DATE HANDLING ---
                const visitDate = $card.find('.booking-date').text().trim();
                let dateObj = new Date(visitDate);

                // If the date parsing fails, fall back to the current date
                // Note: This ensures a valid date for the input field.
                if (isNaN(dateObj.getTime())) {
                    dateObj = new Date();
                }

                // Format to 'YYYY-MM-DD' for date input fields (HTML input type="date" expects this format)
                const year = dateObj.getFullYear();
                const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
                const day = dateObj.getDate().toString().padStart(2, '0');

                const formattedDateForInput = `${year}-${month}-${day}`;
                $('#editDate').val(formattedDateForInput);
                // --- END: MODIFIED DATE HANDLING ---

                // Show modal
                $modal.addClass('active');
                $modal.removeClass('hidden');
            });

            // Close modal
            function closeModal() {
                $modal.removeClass('active');
                $modal.addClass('hidden');
            }

            $('#closeModal, #cancelEdit').on('click', closeModal);

            // Close when clicking outside modal
            $modal.on('click', function(e) {
                if (e.target === $modal[0]) {
                    closeModal();
                }
            });

            // Handle form submission
            $form.on('submit', function(e) {
                e.preventDefault();
                console.log('CSRF Token:', $('input[name=csrfmiddlewaretoken]').val()); // Debug CSRF

                $.ajax({
                    url: '/patient/bookings/',
                    method: 'POST',
                    data: $(this).serialize(),
                    success: function(response) {
                        if (response.status === 'success') {
                            // Update the card with new data
                            const bookingId = $('#bookingId').val();
                            const $card = $(`[data-booking-id="${bookingId}"]`);

                            $card.find('.booking-name').text($('#editName').val());
                            $card.find('.booking-contact').text($('#editContact').val());
                            $card.find('.booking-illness').text($('#editIllness').val());

                            // --- START: MODIFIED DATE HANDLING FOR DISPLAY ---
                            // Get the date directly from the input field which is already 'YYYY-MM-DD'
                            const editedDateValue = $('#editDate').val();
                            let dateObjForDisplay = new Date(editedDateValue);

                            // Fallback in case of an invalid date, though less likely if input type="date" is used
                            if (isNaN(dateObjForDisplay.getTime())) {
                                dateObjForDisplay = new Date(); // Use current date as fallback
                            }

                            // Format for display (e.g., "MM/DD/YYYY" or "DD/MM/YYYY" depending on locale)
                            // This will typically show just the date without time components.
                            const formattedDateForDisplay = dateObjForDisplay.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            });
                            $card.find('.booking-date').text(formattedDateForDisplay);
                            // --- END: MODIFIED DATE HANDLING FOR DISPLAY ---

                            closeModal();
                            alert('Booking updated successfully!');
                        } else {
                            alert('Error: ' + response.message);
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('AJAX Error:', status, error);
                        alert('Network error. Please try again.');
                    }
                });
            });
        });
