# 🍽️ Multi Digital Menu System (Laravel)

A modern **multi-restaurant digital menu platform** built with **Laravel**, allowing restaurants to display menus using QR codes without installing any mobile application.

---

## 🚀 Features

### 🏪 Restaurant Management

* Create and manage multiple restaurants
* Each restaurant has a unique QR code
* Support for multiple branches per restaurant

### 📋 Menu Management

* Categories (Drinks, Meals, Desserts, etc.)
* Menu items with image, price, and description
* Enable / disable items in real-time
* Multi-language support (Arabic / English)

### 📱 Customer Experience

* Mobile-first responsive design
* QR code scanning to open menu instantly
* No registration required for customers
* Fast and lightweight UI

### 🧑‍💼 Admin Dashboard

* Manage restaurants, categories, and items
* Upload images (Cloudinary / Local Storage)
* Role-based access (Admin / Staff)
* Live updates without page refresh

---

## 🧰 Tech Stack

### Backend

* **Laravel 10 / 11 / 12**
* PHP 8.2+
* MySQL / PostgreSQL
* REST API
* Laravel Sanctum (Authentication)

### Frontend

* Blade / Inertia.js / React (optional)
* Tailwind CSS
* Alpine.js (optional)

### Other Tools

* QR Code Generator
* Cloudinary (optional for image uploads)

---

## 📁 Project Structure

```
app/
 ├── Http/
 │   ├── Controllers/
 │   ├── Requests/
 │   └── Middleware/
 ├── Models/
 └── Services/

database/
 ├── migrations/
 ├── seeders/

resources/
 ├── views/
 ├── js/
 └── css/

routes/
 ├── web.php
 └── api.php
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/digital-menu-laravel.git

cd digital-menu-laravel

# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate --seed

# Start the app
php artisan serve
```

---

## 🔐 Environment Variables

```env
APP_NAME=DigitalMenu
APP_ENV=local
APP_KEY=
APP_URL=http://localhost:8000

DB_DATABASE=digital_menu
DB_USERNAME=root
DB_PASSWORD=

FILESYSTEM_DISK=public
```

---

## 📲 QR Code Flow

1. Admin creates a restaurant
2. System generates a QR code automatically
3. QR code links to:

   ```
   /menu/{restaurant-slug}
   ```
4. Customer scans and views menu instantly

---

## 🧠 Future Enhancements

* Online ordering & payments
* Table-based ordering system
* Kitchen display system (KDS)
* Sales analytics & reports
* Multi-branch analytics
* PWA support

---

## 🧾 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

**Your Name**
Full Stack Developer
📧 [your@email.com](mailto:your@email.com)
🌐 yourwebsite.com

---

✨ *If you want, I can also generate:*

* Arabic version 🇸🇦
* SaaS-ready README
* Database schema (ERD)
* API documentation (Postman / Swagger)

Just tell me 👍
