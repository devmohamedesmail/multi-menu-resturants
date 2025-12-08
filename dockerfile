# --- Stage 1: Build Frontend (Vite) ---
FROM node:20 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


# --- Stage 2: Build Backend (Laravel) ---
FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    libzip-dev libonig-dev libpq-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy Laravel project files
COPY . .

# Copy built frontend into public folder
COPY --from=frontend /app/public/build ./public/build

# Install Laravel dependencies
RUN composer install --optimize-autoloader --no-dev

# Create env
RUN cp .env.example .env
RUN php artisan key:generate

CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=10000
