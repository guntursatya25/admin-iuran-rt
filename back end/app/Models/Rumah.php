<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rumah extends Model
{
    use HasFactory;
    protected $table = 'rumah';
    protected $primaryKey = 'rumah_id';
    protected $guarded = ['rumah_id', 'status', 'alamat'];

    // public function penghuni()
    // {
    //     return $this->hasMany(Penghuni::class, 'rumah_id', 'rumah_id');
    // }
    public function riwayatRumah()
    {
        return $this->hasMany(RiwayatRumah::class);
    }
}
