<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Pelanggan\UpdateRequest;
use App\Services\Pelanggan\PelangganService;

class UpdateController extends Controller
{
    //
    public function __construct(private PelangganService $service){}
    public function index(UpdateRequest $request, $id){
        return $this->service->update($request, $id);
    }
}
