<?php

namespace App\Http\Controllers\admin;

use App\Models\Meal;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;

class Meal_controller extends Controller
{
    // show_meals_page
    public function show_meals_page()
    {
        try {
            $categories = Category::all();
            $meals = Meal::all();
            return Inertia::render("admin/meals/index", ["categories" => $categories, "meals" => $meals]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }


    public function store_meal(Request $request)
    {
        try {
            $meal = new Meal();
            $meal->category_id = $request->categoryId;
            $meal->name_en = $request->name_en;
            $meal->name_ar = $request->name_ar;
            $meal->description_en = $request->description_en;
            $meal->description_ar = $request->description_ar;
            $meal->price = $request->price;
            $image = $request->image;
            if ($image) {
                $image_name = Str::uuid()  . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads'), $image_name);
                $meal->image = $image_name;
            }
            $meal->save();
            return redirect()->back();
        } catch (\Throwable $th) {
            return $th;
        }
    }



    public function edit_meal($id)
    {
        try {

            $meal = Meal::findOrFail($id);
            $categories = Category::all();
            return Inertia::render("admin/meals/edit", ["meal" => $meal, "categories" => $categories]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }






    public function update_meal_confirm(Request $request, $id)
    {
        try {

            $meal = Meal::findOrFail($id);
            $meal->category_id = $request->categoryId;
            $meal->name_en = $request->name_en;
            $meal->name_ar = $request->name_ar;
            $meal->description_en = $request->description_en;
            $meal->description_ar = $request->description_ar;
            $meal->price = $request->price;
            $image = $request->image;
            if ($image) {
                $image_name = Str::uuid()  . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads'), $image_name);
                $meal->image = $image_name;
            }
            $meal->save();
            return redirect()->route('meals.page');
        } catch (\Throwable $th) {
            //throw $th;
        }
    }



    public function meal_delete($id)
    {
        try {
            
            $meal = Meal::findOrFail($id);
            $meal->delete();
            return redirect()->route('meals.page');
        } catch (\Throwable $th) {
            //throw $th;
        }
    }







}
