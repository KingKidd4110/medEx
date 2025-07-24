from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render, redirect
from medEx_app.models import *
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.forms import UserCreationForm
import json

def is_admin(user):
    return user.groups.filter(name='admins').exists()

def is_staff(user):
    return user.groups.filter(name='staff').exists()

        
@login_required
@user_passes_test(is_admin or is_staff)
# views.py
def admin_dashboard(request):

    if request.method == 'POST':
        booking_id = request.POST.get('booking_id')
        action = request.POST.get('action')
        try:
            booking = PatientBooking.objects.get(id=booking_id)
            if action == 'approve':
                booking.status = 'approved'
            elif action == 'reject':
                booking.status = 'rejected'
            booking.save()
            return JsonResponse({'status': 'success', 'new_status': booking.status})
        except PatientBooking.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Booking not found'}, status=400)

    bookings = PatientBooking.objects.all()
    return render(request, 'adminpanel/dashboard.html', {'bookings': bookings})
