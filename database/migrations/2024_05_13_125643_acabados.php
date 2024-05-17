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
        Schema::create('acabados', function (Blueprint $table) {
            $table->id();
            $table->string("nombre");
            $table->foreignId("coleccion_id")->constrained('colecciones')->cascadeOnDelete();
            $table->string("descripcion");
            $table->string("color");
            $table->string("precio_m2");
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acabados');
    }
};
