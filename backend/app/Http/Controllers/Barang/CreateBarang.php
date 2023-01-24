<?php

namespace App\Http\Controllers\Barang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Barang\BarangService;
use App\Http\Requests\Barang\CreateRequest;
class CreateBarang extends Controller
{
    //
    public function __construct(private BarangService $service){

    }
    public function index(CreateRequest $request){
        return $this->service->save($request);
    }
}
