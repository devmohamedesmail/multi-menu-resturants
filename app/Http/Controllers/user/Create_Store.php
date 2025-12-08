<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;
use Cloudinary\Cloudinary;

class Create_Store extends Controller
{

    public function dashboard(){
        
        return Inertia::render("store/index", );
    }
    // index
    public function index(){
        return Inertia::render("store/register-store/index");
    }

    // register_store
    public function register_store(Request $request)
    {
      
        try {
            // Validate the request
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'store_name' => 'required|string|max:255|unique:stores,name',
                'store_email' => 'nullable|email|max:255',
                'store_phone' => 'nullable|string|max:50',
                'store_address' => 'nullable|string|max:500',
                'store_description' => 'nullable|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            // Create the user
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role_id'=>3,
            ]);

            // event(new Registered($user));

            // Handle image upload (required) - Using Cloudinary
            $imagePath = null;
            if ($request->hasFile('image')) {
                $cloudinary = new Cloudinary([
                    'cloud' => [
                        'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                        'api_key' => env('CLOUDINARY_API_KEY'),
                        'api_secret' => env('CLOUDINARY_API_SECRET'),
                    ],
                ]);

                $uploaded = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), [
                    'folder' => 'stores/logos',
                    'resource_type' => 'image',
                ]);

                $imagePath = $uploaded['secure_url'];
            }

            // Handle banner upload (optional) - Using Cloudinary
            $bannerPath = null;
            if ($request->hasFile('banner')) {
                $cloudinary = new \Cloudinary\Cloudinary([
                    'cloud' => [
                        'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                        'api_key' => env('CLOUDINARY_API_KEY'),
                        'api_secret' => env('CLOUDINARY_API_SECRET'),
                    ],
                ]);

                $uploaded = $cloudinary->uploadApi()->upload($request->file('banner')->getRealPath(), [
                    'folder' => 'stores/banners',
                    'resource_type' => 'image',
                ]);

                $bannerPath = $uploaded['secure_url'];
            }

            // Create the store
            $store = Store::create([
                'owner_id' => $user->id,
                'name' => $validated['store_name'],
                'email' => $validated['store_email'] ?? null,
                'phone' => $validated['store_phone'] ?? null,
                'address' => $validated['store_address'] ?? null,
                'description' => $validated['store_description'] ?? null,
                'image' => $imagePath,
                'banner' => $bannerPath,
            ]);

            // Log the user in
            Auth::login($user);

            return redirect()->route('home')->with('success', 'Store registered successfully!');

        } catch (\Throwable $th) {
            return back()->withErrors(['error' => 'An error occurred: ' . $th->getMessage()]);
        }
    }
}
