<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatRumah extends Model
{
    protected $table = 'riwayat_rumah';
    protected $guarded = [];
    protected $primaryKey = 'riwayat_id';
    use HasFactory;

    public function penghuni()
    {
        return $this->belongsTo(Penghuni::class, 'penghuni_id');
    }

    public function rumah()
    {
        return $this->belongsTo(Rumah::class, 'rumah_id');
    }
}
