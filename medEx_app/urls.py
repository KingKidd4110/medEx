from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name='home'),
    path('my-bookings/', views.my_bookings, name='my-bookings'),
    path('api/book-appointment/', views.book_appointment, name='book_appointment'),
    path('my-bookings/update/', views.update_booking, name='update_booking'),
    path('my-bookings/delete/', views.delete_booking, name='delete_booking'),
]
