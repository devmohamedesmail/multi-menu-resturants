<?php

use App\Http\Controllers\admin\Category_controller;
use App\Http\Controllers\admin\Meal_controller;
use App\Http\Controllers\admin\Order_controller;
use App\Http\Controllers\admin\Setting_controller;
use App\Http\Controllers\admin\Users_controller;
use App\Http\Controllers\user\User_front_controller;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
    
//     return Inertia::render('welcome');
// })->name('home');





Route::controller(Setting_controller::class)->group(function(){
    Route::get('/admin/settings', 'settings')->name('settings');
    Route::post('/admin/settings/update', 'update_settings')->name('update.settings');
});




Route::controller(Category_controller::class)->group(function(){
    Route::get('/admin/categories', 'show_categories_page')->name('categories.page');
    Route::post('/admin/store/category', 'category_store')->name('category.store');
    Route::get('/admin/edit/category/{id}','edit_category')->name('category.edit');
    Route::post('/admin/update/category/{id}','update_category_confirm')->name('category.update.confirm');
    Route::get('/admin/delete/category/{id}','delete_category')->name('category.delete');
});


Route::controller(Meal_controller::class)->group(function(){
    Route::get('/admin/meals', 'show_meals_page')->name('meals.page');
    Route::post('/admin/store/meal', 'store_meal')->name('meal.store');
    Route::get('/admin/edit/meal/{id}','edit_meal')->name('edit.meal.page');
    Route::post('/admin/update/meal/{id}','update_meal_confirm')->name('meal.update.confirm');
    Route::get('/admin/delete/meal/{id}','meal_delete')->name('meal.delete');
});



Route::controller(Order_controller::class)->group(function(){
    Route::get('/admin/orders', 'all_orders')->name('orders.page');
    Route::get('/admin/dialy/orders', 'daily_orders')->name('dialy.orders');
    Route::get('/fetch/dialy/orders', 'fetch_daily_orders')->name('fetch.dialy.orders');
    Route::get('/last/order/','get_last_order')->name('last.order');
    Route::get('/order/preparing/{id}','change_order_status_to_preparing')->name('order.preparing');
    Route::get('/order/done/{id}','change_order_status_to_done')->name('order.done');
});

Route::controller(Users_controller::class)->group(function(){
    Route::get('/admin/users', 'show_users')->name('users.page');
    Route::get('/admin/users/change/role/{id}', 'admin_users_change_role')->name('admin.users.change.role');
    
});
















// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', 'dashboard')->name('dashboard');
    Route::get('dashboard',[User_front_controller::class,'user_redirect'])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';



// **************************************************************************************
Route::controller(User_front_controller::class)->group(function(){
    Route::get('/{table?}','index')->name('home');
    Route::post('/send/order','send_order')->name('send.order');
    Route::get('/category/meals/{id}','category_meals')->name('category.meals.page');
    Route::get('/checkout/page','checkout_page')->name('checkout.page');
    Route::post('/send/feedback','send_feedback')->name('send.feedback');
    Route::get('/show/menu/','show_menu')->name('show.menu');
});
