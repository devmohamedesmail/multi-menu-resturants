# --- Stage 1: Build Frontend (Vite) ---
FROM node:20 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


# --- Stage 2: Build Backend (Laravel) ---
FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    libzip-dev libonig-dev libpq-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

COPY --from=frontend /app/public/build ./public/build

RUN composer install --optimize-autoloader --no-dev

# ❌ ممنوع وضع أي .env commands
# ❌ ممنوع تشغيل php artisan key:generate
# ❌ ممنوع وضع APP_KEY هنا

CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=10000
