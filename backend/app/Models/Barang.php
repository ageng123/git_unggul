<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Barang extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded = [];
    public function history_barang_keluar(){
        return $this->hasMany(ItemPenjualan::class, 'kode_barang', 'kode');
    }
}
