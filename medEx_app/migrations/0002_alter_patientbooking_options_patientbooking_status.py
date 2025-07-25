# Generated by Django 5.2.3 on 2025-07-20 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medEx_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='patientbooking',
            options={'ordering': ['visit_date']},
        ),
        migrations.AddField(
            model_name='patientbooking',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending', max_length=20),
        ),
    ]
