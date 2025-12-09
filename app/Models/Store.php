<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Store extends Model
{
    /** @use HasFactory<\Database\Factories\StoreFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'image',
        'description',
        'banner',
    ];


    // Define relationship to User model
    public function categories()
    {
        return $this->hasMany(Category::class);
    }


    public function meals(){
        return $this->hasMany(Meal::class);
    }
}
