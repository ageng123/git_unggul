<?php

namespace App\Http\Controllers\Pelanggan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Pelanggan\PelangganService;

class FindController extends Controller
{
    //
    public function __construct(private PelangganService $service){}
    public function index($id){
        return $this->service->find($id);
    }
}
