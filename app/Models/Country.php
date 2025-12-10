<?php

namespace App\Models;

use App\Models\Store;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Country extends Model
{
    /** @use HasFactory<\Database\Factories\CountryFactory> */
    use HasFactory;
    protected $fillable = [
        'name_en',
        'name_ar',
        'currency_ar',
        'currency_en',
        'code',
    ];


    // Define relationship to Store model
    public function stores()
    {
        return $this->hasMany(Store::class);
    }
}
