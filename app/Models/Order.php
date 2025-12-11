<?php

namespace App\Models;

use App\Models\Store;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $fillable = [
        'store_id',
        'user_id',
        'table_id',
        'table',
        'status',
        'total',
        'order',
        'name',
        'address',
        'phone',
        'location',
        'note',
    ];

    protected $casts = [
        "order"=> "array",
    ];


    // Define relationship to Store model
    public function store(){
        return $this->belongsTo(Store::class);
    }
}
