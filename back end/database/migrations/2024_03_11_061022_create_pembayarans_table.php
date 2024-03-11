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
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('penghuni_id');
            $table->foreign('penghuni_id')->references('penghuni_id')->on('penghuni');
            $table->integer('jumlah_iuran');
            $table->enum('jenis_iuran', ['bulanan', 'tahunan']);
            $table->enum('status_bayar', ['lunas', 'belum']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayarans');
    }
};
