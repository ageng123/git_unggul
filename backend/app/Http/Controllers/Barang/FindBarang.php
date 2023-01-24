<?php

namespace App\Http\Controllers\Barang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Barang\BarangService;
class FindBarang extends Controller
{
    //
    public function __construct(private BarangService $service){}
    public function index($id){
        return $this->service->find($id);
    }
}
