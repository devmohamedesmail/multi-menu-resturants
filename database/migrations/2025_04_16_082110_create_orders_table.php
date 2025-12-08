<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('table')->nullable();
            $table->integer('status')->default(0)->nullable();
            $table->string('total')->nullable();
            $table->json('order')->nullable();
            $table->longText('name')->nullable();
            $table->longText('address')->nullable();
            $table->longText('phone')->nullable();
            $table->longText('location')->nullable();
            $table->longText('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
