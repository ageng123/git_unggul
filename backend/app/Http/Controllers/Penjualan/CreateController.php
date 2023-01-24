<?php

namespace App\Http\Controllers\Penjualan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Penjualan\PenjualanService;
use App\Http\Requests\Penjualan\CreateRequest;

class CreateController extends Controller
{
    //
    public function __construct(private PenjualanService $service){}
    public function index(CreateRequest $request){
        return $this->service->save($request);
    }
}
