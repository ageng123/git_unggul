<?php 
namespace App\Repositories;
use App\Interfaces\IMasterDataRepository;
use App\Models\Penjualan;
class PenjualanRepository implements IMasterDataRepository{
    public function __construct(private Penjualan $model){}
    public function model(int $id = null){
        if($id != null && !empty($id)){
            $find = $this->model->find($id)->load(['pelanggan', 'detail_nota']);;
            if(!$find){
                throw new \Exception("Data Not Found",500);
            }
            $this->model = $find;
        }
        return $this->model;
    }
    public function builder(){
        return $this->model;
    }
    public function save($formdata = null){
        if(empty($formdata)){
            throw new \Exception("You Not Provide any data to save !", 400);
        }
        $save = $this->model->create($formdata);
        if(!$save){
            throw new \Exception("Save Data Failed", 500);
        }
        return $save;
    }
    public function update($formdata = null, int $id = null){
        if(empty($id)){
            throw new \Exception("You not provide valid ID to update data", 500);
        }
        $data = $this->model($id);
        $update = $data->update($formdata);
        if(!$update){
            throw new \Exception("Update Data Failed", 500);
        }
        return $data;
    }
    public function delete(int $id = null){
        if(empty($id)){
            throw new \Exception("You not provide valid ID to delete data", 500);
        }
        $data= $this->model($id);
        $delete = $data->delete();
        if(!$delete){
            throw new \Exception("Delete Data Failed", 500);
        }
        return true;
    }
    public function findAll(array $conditions = null){
        return $this->model->all();
    }
}