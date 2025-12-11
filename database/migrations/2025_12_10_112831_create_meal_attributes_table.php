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
        Schema::create('meal_attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meal_id')->constrained('meals')->onDelete('cascade');
            $table->foreignId('attribute_id')->constrained('attributes')->onDelete('cascade');
            $table->foreignId('attribute_value_id')->constrained('attribute_values')->onDelete('cascade')->nullable();
            $table->timestamps();
            
            // Ensure a meal can only have one value per attribute
            $table->unique(['meal_id', 'attribute_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meal_attributes');
    }
};
