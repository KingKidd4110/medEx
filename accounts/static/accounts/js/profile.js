document.getElementById('editProfileBtn').addEventListener('click', () => {
    document.getElementById('editProfileModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});
    
const closeEditModal = () => {
    document.getElementById('editProfileModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
};
    
document.getElementById('closeEditModal').addEventListener('click', closeEditModal);
document.getElementById('cancelEdit').addEventListener('click', closeEditModal);
    
// Close modal when clicking outside
document.getElementById('editProfileModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('editProfileModal')) {
    closeEditModal();
    }
});
