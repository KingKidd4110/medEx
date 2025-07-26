# MedEx Hospital Management System

![MedEx Logo](https://via.placeholder.com/150?text=MedEx+Logo)  
*Empowering Healthcare with Seamless Booking Management*

Welcome to **MedEx**, an open-source hospital management system designed to streamline patient booking processes. Built with Django and enhanced with a modern frontend using Tailwind CSS, MedEx allows patients to manage their appointments efficiently, with features like booking creation, editing, deletion, and status tracking. This project is ideal for healthcare providers looking to digitize their appointment systems or developers interested in contributing to a healthcare-focused application.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure login for patients to access their personal booking details.
- **Booking Management**: 
  - View all bookings with a responsive grid layout.
  - Edit pending bookings with a sleek modal interface.
  - Delete bookings with confirmation prompts.
- **Status Tracking**: Bookings can be marked as `Pending`, `Approved`, `Rejected`, or `Expired` based on the visit date.
- **Real-Time Updates**: Automatically updates `Pending` statuses to `Expired` when the visit date is exceeded.
- **Responsive Design**: Built with Tailwind CSS for a beautiful, mobile-friendly user experience.
- **Admin Panel Integration**: Supports admin-level booking approvals and rejections (optional extension).

## Installation

### Prerequisites

- Python 3.8+
- Django 4.x
- PostgreSQL (or another supported database)
- Node.js and npm (for frontend dependencies)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kingkidd4110/medex.git
   cd medEx_project

2. **Set Up a Virtual Environment**

   ```bash
   python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt

4. **Configure the Database**

    .Update settings.py with your database credentials (e.g., PostgreSQL).

    .Run migration:

   ```bash
    python manage.py migrate

5. **Create a Superuser**

   ```bash
   python manage.py createsuperuser

6. **Run the Development Server**

   ```bash
   python manage.py runserver
   python manage.py tailwind start

7. **Access the Application**

   ```bash
   Open your browser and navigate to http://127.0.0.1:8000/

## Usage

.Patient Panel: Log in to view and manage your bookings at /patient/bookings/. Edit pending bookings or delete them as needed.
.Status Logic: A booking’s status changes to Expired if the visit_date passes without approval. Admins can approve or reject bookings (extendable feature).
.Homepage Link: Add a "View My Bookings" button on your homepage with:

   ```html
    <a href="{% url 'patient_bookings' %}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">View My Bookings</a>
   ```

## project-structure

   ```bash
   medex/
   ├── medex/              # Django project configuration
   │   ├── __init__.py
   │   ├── settings.py
   │   ├── urls.py
   │   └── wsgi.py
   ├── medEx_app/          # Main app
   │   ├── migrations/
   │   ├── __init__.py
   │   ├── admin.py
   │   ├── apps.py
   │   ├── models.py       # Defines PatientBooking model
   │   ├── tests.py
   │   ├── urls.py         # Includes patient_bookings, update_booking, delete_booking
   │   ├── views.py        # Handles booking logic
   │   └── templates/      # HTML templates (e.g., patient_bookings.html)
   ├── static/             # Static files (CSS, JS)
   ├── manage.py
   ├── requirements.txt    # Python dependencies
   └── README.md
   ```

## contributing

We welcome contributions to enhance MedEx! To get started:Fork the repository.
    .Create a new branch: git checkout -b feature/your-feature.
    .Commit your changes: git commit -m "Add your feature".
    .Push to the branch: git push origin feature/your-feature.
    .Open a Pull Request with a detailed description of your changes.

## licence

Please adhere to our code of conduct (CODE_OF_CONDUCT.md) and ensure tests pass before submitting.LicenseThis project is licensed under the MIT License. See the LICENSE file for details.ContactAuthor: [Ayienda Brian]

## contact

Email: <ayiendabrian@gmail.com>  
GitHub: github.com/kingkidd4110
Issues: Report bugs or suggest features on the Issues page.
