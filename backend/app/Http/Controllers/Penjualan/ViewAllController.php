<?php

namespace App\Http\Controllers\Penjualan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Penjualan\PenjualanService;

class ViewAllController extends Controller
{
    //
    public function __construct(private PenjualanService $service){}
    public function index(Request $request){
        return $this->service->findAll($request->toArray());
    }
}
