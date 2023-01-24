<?php

namespace App\Http\Controllers\Barang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Barang\BarangService;
use App\Http\Requests\Barang\UpdateRequest;

class UpdateBarang extends Controller
{
    //
    public function __construct(private BarangService $service){}
    public function index(UpdateRequest $request, $id){
        return $this->service->update($request, (int)$id);
    }
}
