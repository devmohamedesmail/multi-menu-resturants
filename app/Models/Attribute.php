<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    /** @use HasFactory<\Database\Factories\AttributeFactory> */
    use HasFactory;

    protected $fillable = [
        'name_en',
        'name_ar',
        'type',
        'is_required',
        'sort_order',
    ];

    protected $casts = [
        'is_required' => 'boolean',
    ];

    /**
     * Get the attribute values for this attribute
     */
    public function values()
    {
        return $this->hasMany(AttributeValue::class)->orderBy('sort_order');
    }

    /**
     * Get the meals that have this attribute
     */
    public function meals()
    {
        return $this->belongsToMany(Meal::class, 'meal_attributes')
            ->withPivot('attribute_value_id')
            ->withTimestamps();
    }
}
