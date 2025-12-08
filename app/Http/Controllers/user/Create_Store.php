<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Create_Store extends Controller
{
    // index
    public function index(){
        return Inertia::render("front/register-store/index");
    }
}
