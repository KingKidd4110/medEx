from django import template
from django.contrib.auth.models import Group

register = template.Library()

@register.filter
def is_admin(user):
    if user.groups.all():
        return user.groups.all()[0].name == 'admins'
    return False

@register.filter
def is_staff(user):
    if user.groups.all():
        return user.groups.all()[0].name == 'staff'
    return False

@register.filter
def is_admin_or_staff(user):
    if user.groups.all():
        return any(group.name in ['admins', 'staff'] for group in user.groups.all())
    return False
