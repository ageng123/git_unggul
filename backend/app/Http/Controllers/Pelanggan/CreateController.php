<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Pelanggan\CreateRequest;
use App\Services\Pelanggan\PelangganService;

class CreateController extends Controller
{
    //
    public function __construct(private PelangganService $service){}
    public function index(CreateRequest $request){
        return $this->service->save($request);
    }
}
