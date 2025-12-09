<?php

namespace App\Models;

use App\Models\Meal;
use App\Models\Store;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'store_id',
        'name_en',
        'name_ar',
        'image',
        'position',
    ];

    public function meals()
    {
        return $this->hasMany(Meal::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
