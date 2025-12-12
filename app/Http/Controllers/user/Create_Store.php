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

    // ============ CATEGORY CRUD ============

    public function storeCategory(Request $request)
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();

        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'position' => 'nullable|integer',
        ]);

        $imagePath = $this->uploadToCloudinary($request->file('image'), 'categories');

        $category = $store->categories()->create([
            'name_en' => $validated['name_en'],
            'name_ar' => $validated['name_ar'],
            'image' => $imagePath,
            'position' => $validated['position'] ?? 0,
        ]);

        return back()->with('success', 'Category created successfully');
    }

    public function updateCategory(Request $request, $id)
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $category = $store->categories()->findOrFail($id);

        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'position' => 'nullable|integer',
        ]);

        $data = [
            'name_en' => $validated['name_en'],
            'name_ar' => $validated['name_ar'],
            'position' => $validated['position'] ?? $category->position,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadToCloudinary($request->file('image'), 'categories');
        }

        $category->update($data);

        return back()->with('success', 'Category updated successfully');
    }

    public function deleteCategory($id)
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $category = $store->categories()->findOrFail($id);
        
        $category->delete();

        return back()->with('success', 'Category deleted successfully');
    }

    // ============ MEAL CRUD ============

    public function storeMeal(Request $request)
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'description_en' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
        ]);

        $imagePath = $this->uploadToCloudinary($request->file('image'), 'meals');

        $meal = $store->meals()->create([
            'category_id' => $validated['category_id'],
            'name_en' => $validated['name_en'],
            'name_ar' => $validated['name_ar'],
            'description_en' => $validated['description_en'] ?? null,
            'description_ar' => $validated['description_ar'] ?? null,
            'image' => $imagePath,
            'price' => $validated['price'],
            'sale_price' => $validated['sale_price'] ?? null,
        ]);

        // Handle attributes
        if ($request->has('attributes')) {
            $attributes = json_decode($request->input('attributes'), true);
            if (is_array($attributes)) {
                foreach ($attributes as $attributeId => $valueId) {
                    $meal->attributes()->attach($attributeId, [
                        'attribute_value_id' => $valueId
                    ]);
                }
            }
        }

        return back()->with('success', 'Meal created successfully');
    }

    public function updateMeal(Request $request, $id)
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $meal = $store->meals()->findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'description_en' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
        ]);

        $data = [
            'category_id' => $validated['category_id'],
            'name_en' => $validated['name_en'],
            'name_ar' => $validated['name_ar'],
            'description_en' => $validated['description_en'] ?? null,
            'description_ar' => $validated['description_ar'] ?? null,
            'price' => $validated['price'],
            'sale_price' => $validated['sale_price'] ?? null,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadToCloudinary($request->file('image'), 'meals');
        }

        $meal->update($data);

        // Handle attributes
        if ($request->has('attributes')) {
            $attributes = json_decode($request->input('attributes'), true);
            if (is_array($attributes)) {
                $syncData = [];
                foreach ($attributes as $attributeId => $valueId) {
                    $syncData[$attributeId] = ['attribute_value_id' => $valueId];
                }
                $meal->attributes()->sync($syncData);
            }
        }

        return back()->with('success', 'Meal updated successfully');
    }

    public function deleteMeal($id)
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $meal = $store->meals()->findOrFail($id);
        
        $meal->delete();

        return back()->with('success', 'Meal deleted successfully');
    }

    /**
     * Create a new order (table or delivery)
     * 
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function createOrder(Request $request)
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'store_id' => 'required|exists:stores,id',
                'table_id' => 'nullable|exists:tables,id',
                'table' => 'nullable|string',
                'order' => 'required|json',
                'total' => 'required|numeric|min:0',
                'name' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:50',
                'address' => 'nullable|string',
                'location' => 'nullable|string',
                'note' => 'nullable|string',
            ]);

            // Determine if this is a table order or delivery order
            $isTableOrder = !empty($validated['table_id']) || !empty($validated['table']);
            $isDeliveryOrder = !empty($validated['name']) && !empty($validated['phone']) && !empty($validated['address']);

            // Validate that we have either table info or delivery info
            if (!$isTableOrder && !$isDeliveryOrder) {
                return back()->withErrors(['error' => 'Order must have either table information or delivery information']);
            }

            // Decode the order JSON string to array
            $orderArray = json_decode($validated['order'], true);
            
            // Create the order
            $orderData = [
                'store_id' => $validated['store_id'],
                'user_id' => Auth::check() ? Auth::id() : null,
                'order' => $orderArray,
                'total' => $validated['total'],
                'status' => 'pending',
            ];

            // Add table info if it's a table order
            if ($isTableOrder) {
                $orderData['table_id'] = $validated['table_id'] ?? null;
                $orderData['table'] = $validated['table'] ?? null;
                $orderData['name'] = null;
                $orderData['phone'] = null;
                $orderData['address'] = null;
                $orderData['location'] = null;
                $orderData['note'] = $validated['note'] ?? null;
            }

            // Add delivery info if it's a delivery order
            if ($isDeliveryOrder) {
                $orderData['table_id'] = null;
                $orderData['table'] = null;
                $orderData['name'] = $validated['name'];
                $orderData['phone'] = $validated['phone'];
                $orderData['address'] = $validated['address'];
                $orderData['location'] = $validated['location'] ?? null;
                $orderData['note'] = $validated['note'] ?? null;
            }

            // Create the order in database
            $order = \App\Models\Order::create($orderData);

            return back()->with('success', 'Order created successfully! Order ID: ' . $order->id);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Throwable $th) {
            \Log::error('Order creation error: ' . $th->getMessage());
            return back()->withErrors(['error' => 'Failed to create order: ' . $th->getMessage()])->withInput();
        }
    }

    /**
     * Update order status
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateOrderStatus(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            
            if (!$store) {
                return back()->withErrors(['error' => 'Store not found']);
            }

            $order = $store->orders()->findOrFail($id);

            $validated = $request->validate([
                'status' => 'required|in:pending,completed,cancelled',
            ]);

            $order->update([
                'status' => $validated['status']
            ]);

            return back()->with('success', 'Order status updated successfully');

        } catch (\Throwable $th) {
            \Log::error('Order status update error: ' . $th->getMessage());
            return back()->withErrors(['error' => 'Failed to update order status: ' . $th->getMessage()]);
        }
    }

    /**
     * Store a new table
     */
    public function storeTable(Request $request)
    {
        try {
            $user = Auth::user();
            $store = Store::where('user_id', $user->id)->first();

            if (!$store) {
                return back()->withErrors(['error' => 'Store not found']);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'capacity' => 'required|integer|min:1',
            ]);

            $table = $store->tables()->create([
                'name' => $validated['name'],
                'capacity' => $validated['capacity'],
            ]);

            // Generate QR Code
            $qrCode = $this->generateAndUploadQRCode($table, $store);
            $table->update(['qr_code' => $qrCode]);

            return back()->with('success', 'Table created successfully');

        } catch (\Throwable $th) {
            \Log::error('Table creation error: ' . $th->getMessage());
            return back()->withErrors(['error' => 'Failed to create table: ' . $th->getMessage()]);
        }
    }

    /**
     * Update table
     */
    public function updateTable(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            
            if (!$store) {
                return back()->withErrors(['error' => 'Store not found']);
            }

            $table = $store->tables()->findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'capacity' => 'required|integer|min:1',
            ]);

            $table->update([
                'name' => $validated['name'],
                'capacity' => $validated['capacity'],
            ]);

            // Regenerate QR Code if name changed
            if ($table->wasChanged('name')) {
                $qrCode = $this->generateAndUploadQRCode($table, $store);
                $table->update(['qr_code' => $qrCode]);
            }

            return back()->with('success', 'Table updated successfully');

        } catch (\Throwable $th) {
            \Log::error('Table update error: ' . $th->getMessage());
            return back()->withErrors(['error' => 'Failed to update table: ' . $th->getMessage()]);
        }
    }

    /**
     * Delete table
     */
    public function deleteTable($id)
    {
        try {
            $user = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            
            if (!$store) {
                return back()->withErrors(['error' => 'Store not found']);
            }

            $table = $store->tables()->findOrFail($id);
            $table->delete();

            return back()->with('success', 'Table deleted successfully');

        } catch (\Throwable $th) {
            \Log::error('Table deletion error: ' . $th->getMessage());
            return back()->withErrors(['error' => 'Failed to delete table: ' . $th->getMessage()]);
        }
    }

    /**
     * Generate QR Code and upload to Cloudinary
     */
    private function generateAndUploadQRCode($table, $store)
    {
        try {
            // Generate QR code URL (link to store with table number)
            $url = route('store.home', [
                'store_name' => $store->name,
                'store_id' => $store->id,
                'table' => $table->id
            ]);

            // Generate QR code as PNG
            $qrCode = \SimpleSoftwareIO\QrCode\Facades\QrCode::format('png')
                ->size(500)
                ->margin(2)
                ->generate($url);

            // Upload to Cloudinary
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => config('services.cloudinary.cloud_name'),
                    'api_key' => config('services.cloudinary.api_key'),
                    'api_secret' => config('services.cloudinary.api_secret'),
                ],
            ]);

            $uploadResult = $cloudinary->uploadApi()->upload(
                'data:image/png;base64,' . base64_encode($qrCode),
                [
                    'folder' => 'qr_codes',
                    'public_id' => 'table_' . $table->id . '_' . time(),
                ]
            );

            return $uploadResult['secure_url'];

        } catch (\Throwable $th) {
            \Log::error('QR Code generation error: ' . $th->getMessage());
            return null;
        }
    }
}
