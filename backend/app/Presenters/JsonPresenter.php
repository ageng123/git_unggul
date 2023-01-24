<?php 

namespace App\Presenters;


class JsonPresenter {
    public function __construct(){}
    public function init($presentData, $code){
        $this->presentData = $presentData;
        $this->code = $code;
        return $this;
    }
    public function getResponse(){
        return response()->json($this->presentData, $this->code);
    }
}