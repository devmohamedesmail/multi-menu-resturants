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

    /**
     * Get the attributes for this meal
     */
    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'meal_attributes')
            ->withPivot('attribute_value_id')
            ->withTimestamps();
    }

    /**
     * Get the attribute values for this meal
     */
    public function attributeValues()
    {
        return $this->belongsToMany(AttributeValue::class, 'meal_attributes', 'meal_id', 'attribute_value_id')
            ->withPivot('attribute_id')
            ->withTimestamps();
    }
}
