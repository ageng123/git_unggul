<?php

namespace App\Http\Controllers\Penjualan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Penjualan\PenjualanService;
class DeleteController extends Controller
{
    //
    public function __construct(private PenjualanService $service){}
    public function index($id){
        return $this->service->delete($id);
    }
}
