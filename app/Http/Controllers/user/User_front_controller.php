<?php

namespace App\Http\Controllers\user;

use App\Models\Meal;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Category;
use App\Models\Feedback;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class User_front_controller extends Controller
{
    //index
    public function index($table = null)
    {

        $categories = Category::all();
        $meals = Meal::all();
        return Inertia::render("front/index", ["categories" => $categories, "meals" => $meals, "table" => $table]);
    }


    // send_order
    public function send_order(Request $request)
    {
        $request->validate([
            'total' => 'required|numeric',
            'order' => 'required|array',
        ]);

        $order = new Order();
        $order->table = $request->table;
        $order->total = $request->total;
        $order->order = json_encode($request->order);
        $order->name = $request->name;
        $order->address = $request->address;
        $order->phone = $request->phone;
        $order->location = $request->location;
        $order->note = $request->note;
        $order->save();

        return redirect()->back()->with('success', 'Order saved successfully');
    }



    // checkout_page
    public function checkout_page()
    {
        return Inertia::render('front/checkout');
    }



    // category_meals
    public function category_meals($id)
    {
        $category = Category::with('meals')->findOrFail($id);
        return Inertia::render('front/cmeals', ['category' => $category]);
    }


    public function user_redirect()
    {
        // Check the role of the authenticated user
        if (Auth::check()) {
            $user = Auth::user();


            if ($user->role === 'admin') {
                return Inertia::render('dashboard');
            } else {
                $categories = Category::all();
                $meals = Meal::all();
                return Inertia::render("front/index", ["categories" => $categories, "meals" => $meals]);
            }
        }

        // If no user is authenticated, redirect to login
        return redirect()->route('login');
    }





    // send_feedback
    public function send_feedback(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
        ]);

        Feedback::create([
            'rating' => $request->rating,
        ]);

        return redirect()->back();
    }


    public function show_menu()
    {
        $menu = Category::with('meals')->get();
        return Inertia::render('front/menu', ['menu' => $menu]);
    }
}
