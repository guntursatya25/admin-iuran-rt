<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penghuni extends Model
{
    use HasFactory;
    protected $primaryKey = 'penghuni_id';

    protected $table = "penghuni";
    protected $guards = [];

    public function rumah()
    {
        return $this->belongsTo(Rumah::class);
    }
    public function riwayatRumah()
    {
        return $this->hasMany(RiwayatRumah::class);
    }
}
