from django.db import models
from django.contrib.auth.models import User

class PatientBooking(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=20)
    illness_details = models.TextField()
    visit_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')],
        default='pending'
    )

    def __str__(self):
        return f"{self.name} - {self.visit_date}"
    
    class Meta:
        ordering = ['visit_date']
