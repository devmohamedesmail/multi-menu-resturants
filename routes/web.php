<?php

use App\Http\Controllers\admin\BannerController;
use App\Http\Controllers\admin\CountryController;
use App\Http\Controllers\admin\Setting_controller;
use App\Http\Controllers\admin\Users_controller;
use App\Http\Controllers\store\CategoryController;
use App\Http\Controllers\store\MealController;
use App\Http\Controllers\store\OrderController;
use App\Http\Controllers\store\TableController;
use App\Http\Controllers\user\Create_Store;
use App\Http\Controllers\user\User_front_controller;
use Illuminate\Support\Facades\Route;



Route::controller(Setting_controller::class)->group(function () {
    Route::get('/admin/settings', 'settings')->name('settings');
    Route::post('/admin/settings/update', 'update_settings')->name('update.settings');
});


Route::controller(CountryController::class)->group(function () {
    Route::get('/admin/countries', 'index')->name('countries.page');
    Route::post('/admin/store/country', 'store')->name('country.store');
    Route::get('/admin/edit/country/{id}', 'edit')->name('country.edit');
    Route::post('/admin/update/country/{id}', 'update')->name('country.update');
    Route::get('/admin/delete/country/{id}', 'delete')->name('country.delete');
});













Route::controller(Users_controller::class)->group(function () {
    Route::get('/admin/users', 'show_users')->name('users.page');
    Route::get('/admin/users/change/role/{id}', 'admin_users_change_role')->name('admin.users.change.role');

});




Route::controller(BannerController::class)->group(function () {
    Route::get('/admin/banners', 'index')->name('banners.page');
    Route::post('/admin/store/banner', 'store')->name('banner.store');
    Route::get('/admin/edit/banner/{id}', 'edit')->name('banner.edit');
    Route::post('/admin/update/banner/{id}', 'update')->name('banner.update');
    Route::get('/admin/delete/banner/{id}', 'delete')->name('banner.delete');
});



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [User_front_controller::class, 'user_redirect'])->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';



// **************************************************************************************
Route::controller(User_front_controller::class)->group(function () {
    Route::get('/', 'index')->name('home');
});



// =============== create store ======================
Route::controller(Create_Store::class)->group(function () {
    Route::get('/store/home/{store_name?}/{store_id?}/{table?}', 'store_home')->name('store.home');
    Route::get('/register/store', 'index')->name('register.store.page');
    Route::post('/register/store', 'register_store')->name('register.store');
    Route::get('/store/dashboard', 'dashboard')->name('store.dashboard');

    // Get dashboard data (categories, meals, stats)
    Route::get('/store/dashboard/data', 'getDashboardData')->name('store.dashboard.data');

});



/**
 * store category controller
 */

Route::controller(CategoryController::class)->group(function () {
    Route::post('/store/categories', 'storeCategory')->name('store.category.store')->middleware('auth');
    Route::put('/store/categories/{id}', 'updateCategory')->name('store.category.update')->middleware('auth');
    Route::delete('/store/categories/{id}', 'deleteCategory')->name('store.category.delete')->middleware('auth');
});

/**
 * store meal controller
 */

Route::controller(MealController::class)->group(function () {
    Route::post('/store/meals', 'storeMeal')->name('store.meal.store')->middleware('auth');
    Route::put('/store/meals/{id}', 'updateMeal')->name('store.meal.update')->middleware('auth');
    Route::delete('/store/meals/{id}', 'deleteMeal')->name('store.meal.delete')->middleware('auth');
});


Route::controller(OrderController::class)->group(function () {
    Route::post('/store/create/order', 'createOrder')->name('store.create.order')->middleware('auth');
    Route::post('/store/order/{id}/status', 'updateOrderStatus')->name('store.order.update.status')->middleware('auth');
});


Route::controller(TableController::class)->group(function () {
    Route::post('/store/tables', 'storeTable')->name('store.table.store');
    Route::put('/store/tables/{id}', 'updateTable')->name('store.table.update');
    Route::delete('/store/tables/{id}', 'deleteTable')->name('store.table.delete');
});
