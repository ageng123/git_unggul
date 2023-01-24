<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Pelanggan\PelangganService;

class ViewAllController extends Controller
{
    //
    public function __construct(private PelangganService $service){}
    public function index(Request $request){
        return $this->service->findAll($request->toArray());
    }
}
