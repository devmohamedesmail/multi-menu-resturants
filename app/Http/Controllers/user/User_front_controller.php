<?php

namespace App\Http\Controllers\user;
use Inertia\Inertia;
use App\Models\Banner;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class User_front_controller extends Controller
{
    //index
    public function index($table = null)
    {
        $banners = Banner::all();
        return Inertia::render("front/landing", [
            "banners" => $banners,
        ]);
    }

    public function user_redirect()
    {
        // Check the role of the authenticated user
        $bannners = Banner::all();
        if (Auth::check()) {
            $user = Auth::user();

            if ($user->role === 'admin') {
                return Inertia::render('dashboard');
            }
            if ($user->role === 'store_owner') {
                return Inertia::render("front/landing", ["banners" => $bannners]);
            } else {
                return Inertia::render("front/landing", ["banners" => $bannners]);
            }

        }

        // If no user is authenticated, redirect to login
        return redirect()->route('login');
    }

}
