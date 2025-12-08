<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Category_controller extends Controller
{
    // show_categories_page
    public function show_categories_page(){
        try {
              $categories = Category::all();
              return Inertia::render("admin/categories/index", ["categories"=> $categories]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }


    public function category_store(Request $request){
        try {


            $validate = $request->validate([
                "name_en"=> "required",
                "name_ar"=> "required",
            ]);

             $category = new Category();
             $category->name_en = $request->name_en;
             $category->name_ar = $request->name_ar;
             $image = $request->image;
             if ($image) {
                 $image_name = Str::uuid()  . '.' . $image->getClientOriginalExtension();
                 $image->move(public_path('uploads'), $image_name);
                 $category->image = $image_name;
             }
             $category->save();

        } catch (\Throwable $th) {
            //throw $th;
        }
    }


    // edit_category
    public function edit_category($id){
        try {
            $category = Category::findOrFail($id);
            return Inertia::render('admin/categories/edit', ['category'=> $category]);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function update_category_confirm(Request $request,$id){
        try {
            $category = Category::findOrFail($id);
            $category->name_en = $request->name_en;
            $category->name_ar = $request->name_ar;
            $image = $request->image;
            if ($image) {
                $image_name = Str::uuid()  . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads'), $image_name);
                $category->image = $image_name;
            }
            $category->save();
            return redirect()->route('categories.page');
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public function delete_category($id){
        try {
            $category = Category::findOrFail($id);
            $category->delete();
            return redirect()->route('categories.page');
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
