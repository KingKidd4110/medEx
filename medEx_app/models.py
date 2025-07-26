from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

class PatientBooking(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=20)
    illness_details = models.TextField()
    visit_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('approved', 'Approved'),
            ('rejected', 'Rejected'),
            ('expired', 'Expired')
        ],
        default='pending'
    )

    def __str__(self):
        return f"{self.name} - {self.visit_date}"

    class Meta:
        ordering = ['visit_date']

@receiver(post_save, sender=PatientBooking)
def check_visit_date(sender, instance, **kwargs):
    if instance.status == 'pending' and instance.visit_date < timezone.now():
        instance.status = 'expired'
        instance.save()
