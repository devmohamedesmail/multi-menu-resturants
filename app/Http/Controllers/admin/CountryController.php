<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountryController extends Controller
{
    public function index()
    {
        $countries = Country::latest()->get();
        
        return Inertia::render('admin/countries/index', [
            'countries' => $countries,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_en' => 'required|string|max:255|unique:countries,name_en',
            'name_ar' => 'required|string|max:255|unique:countries,name_ar',
            'currency_en' => 'nullable|string|max:255',
            'currency_ar' => 'nullable|string|max:255',
            'code' => 'required|string|max:10|unique:countries,code',
        ]);

        Country::create($validated);

        return redirect()->back()->with('success', 'Country created successfully');
    }

    public function edit($id)
    {
        $country = Country::findOrFail($id);
        $countries = Country::latest()->get();
        
        return Inertia::render('admin/countries/edit', [
            'country' => $country,
            'countries' => $countries,
        ]);
    }

    public function update(Request $request, $id)
    {
        $country = Country::findOrFail($id);
        
        $validated = $request->validate([
            'name_en' => 'required|string|max:255|unique:countries,name_en,' . $id,
            'name_ar' => 'required|string|max:255|unique:countries,name_ar,' . $id,
            'currency_en' => 'nullable|string|max:255',
            'currency_ar' => 'nullable|string|max:255',
            'code' => 'required|string|max:10|unique:countries,code,' . $id,
        ]);

        $country->update($validated);

        return redirect()->route('countries.page')->with('success', 'Country updated successfully');
    }

    public function delete($id)
    {
        $country = Country::findOrFail($id);
        $country->delete();

        return redirect()->back()->with('success', 'Country deleted successfully');
    }
}
