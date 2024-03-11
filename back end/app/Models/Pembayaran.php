<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;
    protected $table = 'pembayaran';
    protected $primaryKey = 'id';
    protected $guards = ['penghuni_id','status_bayar','jenis_iuran','jumlah_iuran'];

    public function penghuni()
    {
        return $this->belongsTo(Penghuni::class);
    }

    public function rumah()
    {
        return $this->belongsTo(Rumah::class);
    }
}
