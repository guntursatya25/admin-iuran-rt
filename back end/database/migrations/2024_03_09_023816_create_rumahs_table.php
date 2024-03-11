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
        Schema::create('rumah', function (Blueprint $table) {
            $table->id('rumah_id');
            $table->unsignedBigInteger('penghuni_id');
            $table->string('alamat');
            $table->enum('status', ['terhuni', 'tidakhuni'])->default('tidakhuni');

            $table->foreign('penghuni_id')->references('penghuni_id')->on('penghuni');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rumahs');
    }
};
