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
        Schema::create('penghuni', function (Blueprint $table) {
            $table->id('penghuni_id');
            $table->unsignedBigInteger('rumah_id');
            
            $table->string('nama');
            $table->string('foto_ktp');
            $table->enum('status_huni', ['kontrak', 'tetap'])->default('kontrak');
            $table->string('no_tlp');
            $table->enum('status_nikah', ['sudah', 'belum'])->default('belum');
            
            $table->foreign('rumah_id')->references('rumah_id')->on('rumah');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penghuni');
    }
};
