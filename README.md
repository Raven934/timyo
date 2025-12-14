# 📅 Timyo - Appointment Booking System

A full-stack web application for managing appointments with role-based access control for users and administrators.

## 🎯 Project Overview

Timyo is a modern appointment booking system that allows users to create, view, and cancel their appointments while administrators can manage all appointments and users in the system.

### ✨ Features

**User Features:**
- ✅ User registration and authentication
- ✅ Create new appointments with date, time, and notes
- ✅ View all personal appointments
- ✅ Cancel appointments before their scheduled time
- ✅ View appointment status (pending, approved, rejected)

**Admin Features:**
- ✅ View all appointments from all users
- ✅ Approve or reject appointments
- ✅ View list of all registered users
- ✅ Monitor user activity and appointment counts

## 🛠️ Technologies Used

### Backend
- **Laravel 10** - PHP Framework
- **Laravel Sanctum** - Cookie-based authentication
- **MySQL** - Database
- **PHPUnit** - Testing framework

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

## 📋 Prerequisites

Before you begin, ensure you have installed:

- PHP >= 8.1
- Composer
- Node.js >= 18.x
- MySQL >= 8.0
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Timyo
```

### 2. Backend Setup (Laravel)

```bash
cd timyo-app

# Install PHP dependencies
composer install

# Copy environment file
copy .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=timyo_db
DB_USERNAME=root
DB_PASSWORD=your_password

# Configure session for Sanctum
SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:5173

# Run migrations
php artisan migrate

# Seed database with sample data
php artisan db:seed

# Start Laravel development server
php artisan serve
```

The backend will run on `http://localhost:8000`

### 3. Frontend Setup (React)

```bash
cd vite-project

# Install dependencies
npm install

# Install Tailwind CSS (if not already installed)
npm install -D tailwindcss postcss autoprefixer

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔑 Default Credentials

After seeding the database, you can login with:

**Admin Account:**
- Email: `admin@example.com`
- Password: `password`

**User Account:**
- Register a new account or use any seeded user

## 📁 Project Structure

### Backend (Laravel)

```
timyo-app/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php          # Authentication logic
│   │   │   ├── AppointmentController.php   # Appointment CRUD
│   │   │   └── UserController.php          # User management
│   │   ├── Middleware/
│   │   │   ├── IsAdmin.php                 # Admin role middleware
│   │   │   └── IsUser.php                  # User role middleware
│   ├── Models/
│   │   ├── User.php                        # User model
│   │   └── Appointment.php                 # Appointment model
├── database/
│   ├── migrations/                         # Database migrations
│   ├── factories/                          # Model factories
│   └── seeders/                            # Database seeders
├── routes/
│   └── api.php                             # API routes
└── tests/
    └── Feature/                            # Feature tests
```

### Frontend (React)

```
vite-project/
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.jsx             # Route guard component
│   │   └── Toast.jsx                      # Toast notification component
│   ├── contexts/
│   │   └── AuthContext.jsx                # Authentication context
│   ├── pages/
│   │   ├── Login.jsx                      # Login page
│   │   ├── Register.jsx                   # Registration page
│   │   ├── UserDashboard.jsx              # User dashboard
│   │   └── AdminDashboard.jsx             # Admin dashboard
│   ├── services/
│   │   └── api.js                         # Axios configuration
│   ├── App.jsx                            # Main app component
│   └── main.jsx                           # Entry point
└── tailwind.config.js                     # Tailwind configuration
```

## 🔗 API Endpoints

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Login user |

### Authenticated User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get current user |
| POST | `/api/logout` | Logout user |
| GET | `/api/appointments` | Get user's appointments |
| POST | `/api/appointments` | Create new appointment |
| DELETE | `/api/appointments/{id}` | Cancel appointment |

### Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/appointments` | Get all appointments |
| PATCH | `/api/admin/appointments/{id}/status` | Update appointment status |
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/users/{id}` | Get single user |

## 🧪 Running Tests

### Backend Tests (PHPUnit)

```bash
cd timyo-app

# Run all tests
php artisan test

# Run specific test file
php artisan test --filter AuthTest

# Run with coverage
php artisan test --coverage
```

### Test Coverage

The project includes tests for:
- ✅ User registration and authentication
- ✅ Appointment creation, viewing, and cancellation
- ✅ Admin appointment management
- ✅ Role-based access control
- ✅ User management

## 📱 Application Pages

### 1. **Login Page** (`/login`)
- User authentication
- Redirects to appropriate dashboard based on role
- Link to registration page

### 2. **Register Page** (`/register`)
- New user registration
- Form validation
- Auto-login after registration

### 3. **User Dashboard** (`/dashboard`)
- View personal appointments
- Create new appointments
- Cancel pending appointments
- View appointment status

### 4. **Admin Dashboard** (`/admin/dashboard`)
- View all appointments with user details
- Approve/reject appointments
- View all users with statistics
- Tab-based interface

## 🔐 Authentication & Authorization

The application uses Laravel Sanctum with cookie-based authentication:

1. **CSRF Protection**: CSRF token is fetched before login/register
2. **Session Cookies**: Credentials stored in HTTP-only cookies
3. **Role-Based Access**: Middleware checks user roles for protected routes
4. **Auto-Redirect**: Users redirected based on their role after login

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Toast Notifications**: User-friendly success/error messages
- **Loading States**: Visual feedback during API calls
- **Form Validation**: Client and server-side validation
- **Status Badges**: Color-coded appointment and user statuses
- **Protected Routes**: Automatic redirection for unauthorized access

## 🐛 Troubleshooting

### CORS Issues

If you encounter CORS errors:
1. Check `config/cors.php` includes `localhost:5173`
2. Ensure `SESSION_DOMAIN=localhost` in `.env`
3. Clear Laravel config cache: `php artisan config:clear`

### Authentication Issues

If authentication fails:
1. Clear browser cookies
2. Check Sanctum configuration in `config/sanctum.php`
3. Verify API base URL in `src/services/api.js`
4. Run `php artisan config:cache`

### Database Issues

If migrations fail:
1. Check database credentials in `.env`
2. Create database manually: `CREATE DATABASE timyo_db;`
3. Run migrations fresh: `php artisan migrate:fresh --seed`

## 📈 Future Enhancements

- [ ] Email notifications for appointment status changes
- [ ] Calendar view for appointments
- [ ] Appointment rescheduling
- [ ] User profile management
- [ ] Advanced filtering and search
- [ ] Export appointments to PDF/CSV
- [ ] Multi-language support
- [ ] Dark mode theme

## 👥 User Stories Completed

### User Stories
- ✅ **US1**: User can create an appointment with date and time
- ✅ **US2**: User can view all their appointments
- ✅ **US3**: User can cancel an appointment before its date

### Admin Stories
- ✅ **US4**: Admin can view all appointments
- ✅ **US5**: Admin can approve or reject appointments
- ✅ **US6**: Admin can view all users

## 📝 Development Notes

### Key Features Implementation

1. **Eloquent Relationships**: User `hasMany` Appointments
2. **Middleware**: Custom `IsAdmin` and `IsUser` middleware
3. **Form Validation**: Laravel validation rules
4. **API Authentication**: Sanctum session-based auth
5. **Protected Routes**: React Router guards
6. **State Management**: React Context API
7. **Responsive UI**: Tailwind CSS utilities

## 🤝 Contributing

This is an educational project. For contributions:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is for educational purposes.

## 📞 Support

For issues or questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ for learning full-stack development**

**Project Timeline**: December 7-13, 2025

**Status**: ✅ Complete and ready for demonstration
# timyo
