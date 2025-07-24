document.getElementById('assignStaffBtn').addEventListener('click', () => {
    document.getElementById('assignStaffModal').classList.remove('hidden');
});
        
document.getElementById('closeStaffModal').addEventListener('click', () => {
    document.getElementById('assignStaffModal').classList.add('hidden');
});
        
document.getElementById('cancelStaffAssign').addEventListener('click', () => {
    document.getElementById('assignStaffModal').classList.add('hidden');
});

        // Handle form submission
document.getElementById('assignStaffForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('/admin/assign-staff/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Staff assigned successfully!');
            document.getElementById('assignStaffModal').classList.add('hidden');
            this.reset();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        alert('Network error. Please try again.');
    });
});
