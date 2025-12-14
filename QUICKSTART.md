# Quick Start Guide

## 🚀 Quick Start (15 minutes)

### Step 1: Configure Database

Edit `timyo-app/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=timyo_db
DB_USERNAME=root
DB_PASSWORD=your_password

SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

### Step 2: Create Database

Open MySQL:
```sql
CREATE DATABASE timyo_db;
```

### Step 3: Run Setup Script

```powershell
cd Timyo
.\setup.ps1
```

### Step 4: Start Servers

**Terminal 1 - Backend:**
```bash
cd timyo-app
php artisan serve
```

**Terminal 2 - Frontend:**
```bash
cd vite-project
npm run dev
```

### Step 5: Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

### Step 6: Login

**Admin:**
- Email: admin@example.com
- Password: password

**User:**
- Register a new account

## ✅ Verification Checklist

- [ ] Database created
- [ ] Migrations ran successfully
- [ ] Seeder completed
- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Can login as admin
- [ ] Can register new user
- [ ] User can create appointment
- [ ] Admin can approve appointment

## 🔧 Troubleshooting

### Laravel Issues

```bash
php artisan config:clear
php artisan cache:clear
php artisan migrate:fresh --seed
```

### React Issues

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### CORS Issues

Check `timyo-app/config/cors.php`:
```php
'supports_credentials' => true,
'allowed_origins' => ['http://localhost:5173'],
```

## 📝 Running Tests

```bash
# Backend
cd timyo-app
php artisan test

# Frontend
cd vite-project
npm test
```

## 🎯 Demo Flow

1. **Register**: Create user account
2. **User Dashboard**: Create 2-3 appointments
3. **Logout**: Exit user session
4. **Admin Login**: Use admin credentials
5. **Admin Dashboard**: View all appointments
6. **Approve/Reject**: Change appointment statuses
7. **Users Tab**: View all registered users
