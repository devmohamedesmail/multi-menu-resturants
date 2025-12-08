<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class Users_controller extends Controller
{
    // show_users
    public function show_users(){
        $users = User::all();
        return Inertia::render("admin/users/index",["users"=>$users]);
    }



    public function admin_users_change_role($id){
        $user = User::find($id);
        $user->role = $user->role === 'admin' ? 'user' : 'admin';
        $user->save();
        return redirect()->back();
    }
}
