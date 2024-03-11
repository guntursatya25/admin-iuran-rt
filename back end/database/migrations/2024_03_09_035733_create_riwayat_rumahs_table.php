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
        Schema::create('riwayat_rumah', function (Blueprint $table) {
            $table->id('riwayat_id');

            $table->unsignedBigInteger('penghuni_id');
            $table->foreign('penghuni_id')->references('penghuni_id')->on('penghuni');

            $table->unsignedBigInteger('rumah_id');
            $table->foreign('rumah_id')->references('rumah_id')->on('rumah');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_rumahs');
    }
};
