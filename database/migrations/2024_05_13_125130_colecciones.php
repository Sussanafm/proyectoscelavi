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
        Schema::create('colecciones', function (Blueprint $table) {
            $table->id();
            $table->string("nombre");
            $table->string("formato");
            $table->string("thickness");
            $table->string("wearlayer");
            $table->string("typology");
            $table->string("total_thickness");
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('colecciones');
    }
};
