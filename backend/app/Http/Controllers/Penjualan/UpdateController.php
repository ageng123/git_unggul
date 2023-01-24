<?php

namespace App\Http\Controllers\Penjualan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Penjualan\UpdateRequest;
use App\Services\Penjualan\PenjualanService;

class UpdateController extends Controller
{
    //
    public function __construct(private PenjualanService $service){}
    public function index(UpdateRequest $request, $id){
        return $this->service->update($request,$id);
    }
}
