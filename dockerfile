# -----------------------------
# 1) Build Stage for Node/Vite
# -----------------------------
FROM node:18-alpine AS vite-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


# -----------------------------
# 2) Laravel Production Image
# -----------------------------
FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    git \
    zip \
    unzip \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    icu-dev \
    libxml2-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        gd \
        intl \
        xml \
        opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy source code
COPY . .

# Copy Vite build from Node stage
COPY --from=vite-builder /app/public/build ./public/build

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Optimize Laravel
RUN php artisan config:clear \
    && php artisan route:clear \
    && php artisan view:clear \
    && php artisan route:cache \
    && php artisan config:cache

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port
EXPOSE 8080

# Apache or PHP-FPM? Render runs command directly → we use PHP artisan serve
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
