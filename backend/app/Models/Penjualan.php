<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Penjualan extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded = [];
    protected $appends = ["subtotal_string"];
    public function pelanggan(){
        return $this->hasOne(Pelanggan::class,'id_pelanggan', 'kode_pelanggan');
    }
    public function detail_nota(){
        return $this->hasMany(ItemPenjualan::class, 'nota', 'id_nota');
    }
    public function getSubtotalStringAttribute(){
        $subtotal = $this->subtotal;
        return "Rp. ".number_format($subtotal, 2, ',','.');
    }
}
