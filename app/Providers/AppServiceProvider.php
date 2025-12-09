<?php

namespace App\Providers;
use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // app settings
        Inertia::share('app_settings', function () {
            return Setting::first();
        });

        // auth user
        Inertia::share([
        'auth' => function () {
            return auth()->check()
                ? ['user' => auth()->user()]
                : ['user' => null];
        }
    ]);

    }
}
