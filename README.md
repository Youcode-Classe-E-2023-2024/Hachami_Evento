# Evento Ticket

![Evento](https://github.com/Youcode-Classe-E-2023-2024/Hachami_Evento/blob/main/Docs/client_app1.png)
![Evento](https://github.com/Youcode-Classe-E-2023-2024/Hachami_Evento/blob/main/Docs/client_app2.png)
![Evento](https://github.com/Youcode-Classe-E-2023-2024/Hachami_Evento/blob/main/Docs/admin_dashb.png)

## Overview


This React and Laravel-based project serves as an Event Management Platform, enabling users to register, organize, and attend various events. The application offers a range of features for users, organizers, and administrators, enhancing the overall event experience.

## Features

### User

- **Registration and Authentication:**
    - Users can sign up on the platform by providing their name, email, and password.
    - Authentication allows users to log in using their credentials.

- **Password Management:**
    - Users can reset their passwords through a password reset email.

- **Event Discovery:**
    - Browse a paginated list of events available on the platform.
    - Filter events by category or search for specific titles.

- **Event Details:**
    - View detailed information about an event, including description, date, venue, and available tickets.

- **Reservation:**
    - Reserve a ticket for an event.

- **Ticket Generation:**
    - Generate a ticket once the reservation is confirmed.

### Organizator

- **Event Creation:**
    - Create a new event by specifying title, description, date, venue, category, and available seats.


### Administrator

- **Category Management:**
    - Add, modify, or delete event categories.
- **User Management:**
    - Manage user accounts .

- **Event Validation:**
    - Validate events created by organizers before publication.

- **Statistics Dashboard:**
    - Statistics on platform usage.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Youcode-Classe-E-2023-2024/Hachami_Evento.git
   cd  evento-back

# Install dependencies
   ```bash
    composer update
    php artisan passport:install
    
   ```  
# Set up environment variables and configure the database
    cp .env.example .env
    php artisan key:generate
# Database Migration :
    php artisan migrate
# Run the Application:
    php artisan serve

2. **Admin dashboard:**

# Install dependencies
   ```bash
   cd evento_admin_dashboard
    npm install
    npm start
    
   ```  
3. **Client App:**

# Install dependencies
   ```bash
   cd evento_front
    npm install
    npm start
    
   ```  





