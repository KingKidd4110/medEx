document.addEventListener('DOMContentLoaded', function() {

    const navbarBookingBtn = document.getElementById('navbarBookingBtn');
    const mobilenavBookingBtn = document.getElementById('mobilenavBookingBtn');
    const floatingBookingBtn = document.getElementById('floatingBookingBtn');
    const bookingModal = document.getElementById('bookingModal');

    if (navbarBookingBtn) {
        navbarBookingBtn.addEventListener('click', function() {
            console.log("Navbar button clicked!");
            if (bookingModal) {
                bookingModal.classList.remove('hidden');
            }
        });
    }

    if (floatingBookingBtn) {
        floatingBookingBtn.addEventListener('click', function() {
            console.log("Floating button clicked!");
            if (bookingModal) {
                bookingModal.classList.remove('hidden');
            }
        });
    }

    if (mobilenavBookingBtn) {
        mobilenavBookingBtn.addEventListener('click', function() {
            console.log("Floating button clicked!");
            if (bookingModal) {
                bookingModal.classList.remove('hidden');
            }
        });
    }

    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (bookingModal) {
                bookingModal.classList.add('hidden');
            }
        });
    }

    const cancelBooking = document.getElementById('cancelBooking');
    if (cancelBooking) {
        cancelBooking.addEventListener('click', function() {
            if (bookingModal) {
                bookingModal.classList.add('hidden');
            }
        });
    }

    

    const form = document.querySelector('form');
    if (form) {
        // Set minimum datetime (now) on the input
        const visitDateTimeInput = document.getElementById('visitDateTime');
        const now = new Date();
        // Add 1 hour buffer to prevent "now" from being invalid
        now.setHours(now.getHours() + 1);
        const minDateTime = now.toISOString().slice(0, 16);
        visitDateTimeInput.min = minDateTime;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate datetime
            const selectedDateTime = new Date(document.getElementById('visitDateTime').value);
            const dateError = document.getElementById('dateError');
            
            if (selectedDateTime <= now) {
                dateError.classList.remove('hidden');
                return;
            } else {
                dateError.classList.add('hidden');
            }

            const formData = {
                name: document.getElementById('name').value,
                contact: document.getElementById('contact').value,
                illness: document.getElementById('illness').value,
                visitDateTime: document.getElementById('visitDateTime').value
            };

            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value || '';

            fetch('/api/book-appointment/', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Booking Sent Successfully! Please wait for confirmation.');
                    if (bookingModal) {
                        bookingModal.classList.add('hidden');
                    }
                    form.reset();
                    // Reset to minimum datetime
                    document.getElementById('visitDateTime').min = new Date().toISOString().slice(0, 16);
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert('Network error. Please try again.');
            });
        });

        // Real-time validation as user selects datetime
        visitDateTimeInput.addEventListener('change', function() {
            const selectedDateTime = new Date(this.value);
            const now = new Date();
            const dateError = document.getElementById('dateError');
            
            if (selectedDateTime <= now) {
                dateError.classList.remove('hidden');
            } else {
                dateError.classList.add('hidden');
            }
        });
    }
});
