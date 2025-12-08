<?php

namespace App\Http\Middleware;
use Closure;
use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ShareSettings
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // مشاركة الإعدادات مع كل رد من Inertia
        Inertia::share([
            'app_settings' => fn () => Setting::first(),
        ]);
        return $next($request);
    }
}
