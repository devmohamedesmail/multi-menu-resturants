<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    /** @use HasFactory<\Database\Factories\AttributeValueFactory> */
    use HasFactory;

    protected $fillable = [
        'attribute_id',
        'value_en',
        'value_ar',
        'price_modifier',
        'sort_order',
    ];

    protected $casts = [
        'price_modifier' => 'decimal:2',
    ];

    /**
     * Get the attribute that owns this value
     */
    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    /**
     * Get the meals that use this attribute value
     */
    public function meals()
    {
        return $this->belongsToMany(Meal::class, 'meal_attributes')
            ->withPivot('attribute_id')
            ->withTimestamps();
    }
}
