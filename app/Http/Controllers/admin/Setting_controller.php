<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Setting_controller extends Controller
{
    // update_settings
    public function settings()
    {
        $setting = Setting::first();
        return Inertia::render(
            "admin/setting/index",
            ['setting' => $setting]
        );
    }

    public function update_settings(Request $request)
    {
        $setting = Setting::first();
        if ($setting) {
            $setting->title_en = $request->title_en;
            $setting->title_ar = $request->title_ar;
            $setting->description_en = $request->description_en;
            $setting->description_ar = $request->description_ar;
            $setting->email = $request->email;
            $setting->phone = $request->phone;
            $setting->address = $request->address;
            $setting->currency_en = $request->currency_en;
            $setting->currency_ar = $request->currency_ar;


            $logo = $request->logo;
            if ($logo) {
                $image_name = Str::uuid()  . '.' . $logo->getClientOriginalExtension();
                $logo->move(public_path('uploads'), $image_name);
                $setting->logo = $image_name;
            }

            $favicon = $request->favicon;
            if ($favicon) {
                $image_name = Str::uuid()  . '.' . $favicon->getClientOriginalExtension();
                $favicon->move(public_path('uploads'), $image_name);
                $setting->favicon = $image_name;
            }


            $setting->save();
        } else {
            $setting = new Setting();
            $setting->title_en = $request->title_en;
            $setting->title_ar = $request->title_ar;
            $setting->description_en = $request->description_en;
            $setting->description_ar = $request->description_ar;
            $setting->email = $request->email;
            $setting->phone = $request->phone;
            $setting->address = $request->address;
            $setting->currency_en = $request->currency_en;
            $setting->currency_ar = $request->currency_ar;


            $logo = $request->image;
            if ($logo) {
                $image_name = Str::uuid()  . '.' . $logo->getClientOriginalExtension();
                $logo->move(public_path('uploads'), $image_name);
                $setting->logo = $image_name;
            }

            $favicon = $request->favicon;
            if ($favicon) {
                $image_name = Str::uuid()  . '.' . $favicon->getClientOriginalExtension();
                $favicon->move(public_path('uploads'), $image_name);
                $setting->favicon = $image_name;
            }
            $setting->save();
        };
    }
}
