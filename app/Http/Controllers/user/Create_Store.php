<?php

namespace App\Http\Controllers\user;

use App\Models\Attribute;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Store;
use App\Models\Country;
use App\Models\Category;
use Cloudinary\Cloudinary;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class Create_Store extends Controller
{

    // store_home
    public function store_home($store_name = null, $store_id = null, $table = null){
        try {
        //   dd($store_name, $store_id, $table);
            $store = Store::with([
                'categories' => function($query) {
                    $query->withCount('meals');
                },
                'meals.category',
                'country'
            ])->findOrFail($store_id);
            
            return Inertia::render('store/home', [
                'store' => $store,
                'table' => $table,
            ]);
        } catch (\Throwable $th) {
            return redirect()->route('home')->with('error', 'Store not found');
        }
    }
    public function dashboard(){

        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first(); 
        if($store){
            $categories = $store->categories()->withCount('meals')->get();
            $meals = $store->meals()->with('category')->get();
            $country = $store->country()->first();
            $attributes = Attribute::with('values')->orderBy('sort_order')->get();
            $orders = $store->orders()->get();
            $tables = $store->tables()->get();
            
            $stats = [
                'totalCategories' => $categories->count(),
                'totalMeals' => $meals->count(),
                'totalOrders' => $orders->count(),
                'totalRevenue' => 0,
            ];

            return Inertia::render("store/index", [
                'store' => $store,
                'categories' => $categories,
                'country' => $country,
                'meals' => $meals,
                'stats' => $stats,
                'attributes' => $attributes,
                'orders'=>$orders,
                'tables'=>$tables,
            ]);
        } else{
            return Inertia::render("store/register-store/index");
        }
    }
    // index
    public function index(){
       try {
         $countries = Country::all();
        return Inertia::render("store/register-store/index", [
            'countries' => $countries,
        ]);
       } catch (\Throwable $th) {
        //throw $th;
       }
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
                'slug' => 'nullable|string|max:255|unique:stores,slug',
                'country_id' => 'nullable',
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
                 "role" => "store_owner",
            ]);

            event(new Registered($user));

            // Upload images to Cloudinary
            $imagePath = $this->uploadToCloudinary($request->file('image'), 'stores/logos');
            
            $bannerPath = null;
            if ($request->hasFile('banner')) {
                $bannerPath = $this->uploadToCloudinary($request->file('banner'), 'stores/banners');
            }

            // Create the store
            $store = Store::create([
                'user_id' => $user->id,
                'country_id' => $validated['country_id'] ?? null,
                'name' => $validated['store_name'],
                'slug' => $validated['slug'] ?? null,
                'email' => $validated['store_email'] ?? null,
                'phone' => $validated['store_phone'] ?? null,
                'address' => $validated['store_address'] ?? null,
                'description' => $validated['store_description'] ?? null,
                'image' => $imagePath,
                'banner' => $bannerPath,
            ]);

            // Log the user in
            Auth::login($user);

            return redirect()->route('store.dashboard')->with('success', 'Store registered successfully!');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Throwable $th) {
            \Log::error('Store registration error: ' . $th->getMessage());
            return back()->withErrors(['error' => $th->getMessage()])->withInput();
        }
    }

    // Upload file to Cloudinary
    private function uploadToCloudinary($file, $folder)
    {
        try {
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key' => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);

            $result = $cloudinary->uploadApi()->upload($file->getRealPath(), [
                'folder' => $folder,
            ]);

            return $result['secure_url'];
        } catch (\Exception $e) {
            \Log::error('Cloudinary upload failed: ' . $e->getMessage());
            throw new \Exception('Image upload failed');
        }
    }

    // Get store data with categories and meals
    public function getDashboardData()
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        
        if (!$store) {
            return redirect()->route('register.store.page');
        }

        $categories = $store->categories()->withCount('meals')->get();
        $meals = $store->meals()->with('category')->get();
        $stats = [
            'totalCategories' => $categories->count(),
            'totalMeals' => $meals->count(),
            'totalOrders' => 0, // You can add order count later
            'totalRevenue' => 0, // You can add revenue calculation later
        ];

        return response()->json([
            'store' => $store,
            'categories' => $categories,
            'meals' => $meals,
            'stats' => $stats,
        ]);
    }

  

   

    /**
     * Create a new order (table or delivery)
     * 
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
   

    /**
     * Store a new table
     */
 
}
