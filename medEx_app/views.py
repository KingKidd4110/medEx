from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import PatientBooking
from accounts.models import *
import json
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from datetime import datetime
from django.utils.dateparse import parse_datetime
from django.contrib.auth.models import User, Group



@require_POST
def book_appointment(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            
            # Validate required fields
            required_fields = ['name', 'contact', 'illness', 'visitDateTime']
            for field in required_fields:
                if not data.get(field):
                    return JsonResponse(
                        {'status': 'error', 'message': f'{field} is required'},
                        status=400
                    )

            # Parse and validate datetime
            try:
                visit_datetime = datetime.strptime(
                    data['visitDateTime'], 
                    '%Y-%m-%dT%H:%M'  # Format from datetime-local input
                )
                visit_datetime = timezone.make_aware(visit_datetime)
                
                # Ensure date is in the future
                if visit_datetime <= timezone.now():
                    return JsonResponse(
                        {'status': 'error', 'message': 'Please select a future date and time'},
                        status=400
                    )
                    
            except ValueError as e:
                return JsonResponse(
                    {'status': 'error', 'message': 'Invalid date format'},
                    status=400
                )

            # Create booking
            booking = PatientBooking(
                name=data['name'],
                contact=data['contact'],
                illness_details=data['illness'],
                visit_date=visit_datetime,
                user=request.user if request.user.is_authenticated else None
            )
            booking.save()

            # Success response
            return JsonResponse({
                'status': 'success',
                'message': 'Booking saved!',
                'booking_id': booking.id,
                'visit_date': booking.visit_date.isoformat()
            })

        except json.JSONDecodeError:
            return JsonResponse(
                {'status': 'error', 'message': 'Invalid JSON data'},
                status=400
            )
            
        except Exception as e:
            return JsonResponse(
                {'status': 'error', 'message': str(e)},
                status=500
            )
    
    return JsonResponse(
        {'status': 'error', 'message': 'Method not allowed'},
        status=405
    )
def home(request):
    admin_group = Group.objects.get(name='admins')
    staff_group = Group.objects.get(name='staff')
    
    staffusers = User.objects.filter(groups__in=[admin_group, staff_group]).distinct()
    context = {'staffusers' : staffusers}
    return render(request, 'medEx_app/home.html', context)



@login_required
def my_bookings(request):
    if request.method == 'POST':
        booking_id = request.POST.get('booking_id')
        try:
            booking = get_object_or_404(PatientBooking, id=booking_id, user=request.user)
            # Update fields based on form data (example: name, contact, visit_date, illness_details)
            booking.name = request.POST.get('name', booking.name)
            booking.contact = request.POST.get('contact', booking.contact)
            booking.visit_date = request.POST.get('visit_date', booking.visit_date)
            booking.illness_details = request.POST.get('illness_details', booking.illness_details)
            booking.save()
            return JsonResponse({'status': 'success', 'message': 'Booking updated'})
        except PatientBooking.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Booking not found'}, status=400)

    # Fetch only the logged-in user's bookings
    bookings = PatientBooking.objects.filter(user=request.user)
    return render(request, 'medEx_app/my-bookings.html', {'bookings': bookings})


@require_POST
@login_required
def update_booking(request):
    try:
        data = request.POST  # Use request.POST instead of JSON for form data
        booking_id = data.get('booking_id')
        
        try:
            booking = PatientBooking.objects.get(id=booking_id, user=request.user)
        except PatientBooking.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Booking not found'}, status=404)

        # Update booking fields
        booking.name = data.get('name', booking.name)
        booking.contact = data.get('contact', booking.contact)
        booking.illness_details = data.get('illness_details', booking.illness_details)
        
        visit_date = data.get('visit_date')
        if visit_date:
            try:
                booking.visit_date = datetime.strptime(visit_date, "%Y-%m-%dT%H:%M")
            except ValueError:
                return JsonResponse({'status': 'error', 'message': 'Invalid date format'}, status=400)

        
        booking.save()
        return JsonResponse({
            'status': 'success',
            'message': 'Booking updated successfully',
            'booking_id': booking.id
        })

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

@require_POST
@login_required
def delete_booking(request):
    try:
        data = request.POST  # Use request.POST instead of JSON
        booking_id = data.get('booking_id')
        
        try:
            booking = PatientBooking.objects.get(id=booking_id, user=request.user)
            booking.delete()
            return JsonResponse({
                'status': 'success',
                'message': 'Booking deleted successfully'
            })
        except PatientBooking.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Booking not found'}, status=404)

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
