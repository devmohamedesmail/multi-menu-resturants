<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Store;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Meal extends Model
{
    /** @use HasFactory<\Database\Factories\MealFactory> */
    use HasFactory;

    protected $fillable = [
        'category_id',
        'store_id',
        'name_en',
        'name_ar',
        'description_en',
        'description_ar',
        'image',
        'price',
        'sale_price',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }


    
}
