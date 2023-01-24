<?php 
namespace App\Services\Pelanggan;
use App\Repositories\PelangganRepository;
use App\Interfaces\IMasterDataService;
use DB;
use Illuminate\Support\Str;
use App\Presenters\JsonPresenter;
class PelangganService implements IMasterDataService{
    public function __construct(private PelangganRepository $repo, private JsonPresenter $presenter){}
    public function repo(){
        return $this->repo;
    }
    private function setUuid($request){
        $uuid = "";
        while($uuid == ""){
            $uuid = Str::uuid()->toString();
            $count = $this->repo->model()->where(array('id_pelanggan' => $uuid))->count();
            if($count > 0){
                $uuid = "";
            }
        }
        $request['id_pelanggan'] = $uuid;
        return $request;
    }
    public function save($formdata = null){
        try{
            $transaction = DB::transaction(function()use($formdata){
                $formdata = $formdata->toArray();
                if($formdata['id_pelanggan'] == ""){
                    $request = $this->setUuid($formdata);
                }else{
                    $request = $formdata;
                }
                $save = $this->repo->save($request);
                if(!$save){
                    DB::rollback();
                    throw new \Exception("Error Saving Form",500);
                }
                DB::commit();
                return true;
            },3);
            return $this->presenter->init(["data" => "", "errors" => "", "messages" => "Berhasil Save data", "success" => True], 201)->getResponse();
        }catch(\Exception $e){
            return $this->presenter->init(["data" => "", "errors" => $e->getMessage(), "messages" => "Gagal Save data", "success" => false], 500)->getResponse();
        }
    }
    public function update($formdata = null, int|string $id = null){
        try{
            $transaction = DB::transaction(function()use($formdata, $id){
                if(empty($id)){
                    DB::rollback();
                    throw new \Exception("Please provide id for updating data",400);
                }
                $check = $this->repo->model()->where("id_pelanggan", $id)->firstOrFail();
                $update = $formdata->toArray();
                unset($update['history_nota']);
                $update = $this->repo->update($update, $check->id);
                if(!$update){
                    DB::rollback();
                    throw new \Exception("Error Updating Form");
                }
                DB::commit();
                return $update;
            },3);
            return $this->presenter->init(["data" => "", "errors" => "", "messages" => "Berhasil Save data", "success" => True], 200)->getResponse();
        }catch(\Exception $e){
            return $this->presenter->init(["data" => "", "errors" => $e->getMessage(), "messages" => "Gagal Save data", "success" => false], 500)->getResponse();
        }
    }
    public function delete(int|string $id = null){
        try{
            $transaction = DB::transaction(function()use($id){
                if(empty($id)){
                    DB::rollback();
                    throw new \Exception("Please Provide ID for deleting data", 500);
                }
                $check = $this->repo->model()->where("id_pelanggan", $id)->firstOrFail();
                $delete = $this->repo->delete($check->id);
                if(!$delete){
                    DB::rollback();
                    throw new \Exception("Error Deleting Data", 500);
                }
                DB::commit();
                return true;
            }, 3);
            return $this->presenter->init(["data" => "", "errors" => "", "messages" => "Berhasil Hapus data", "success" => True], 200)->getResponse();
        }catch(\Exception $e){
            return $this->presenter->init(["data" => "", "errors" => $e->getMessage(), "messages" => "Gagal Hapus data", "success" => false], 500)->getResponse();
        }
    }
    public function find($id){
        try{
            $check = $this->repo->model()->where("id_pelanggan", $id)->firstOrFail();
            $db = $this->repo->model($check->id);
            if(!$db){
                throw new \Exception("Could Not Retrieve Data, Please Provide Valid ID", 500);
            }
            return $this->presenter->init(["data" => $db, "errors" => "", "messages" => "", "success" => True], 200)->getResponse();
        }catch(\Exception $e){
            return $this->presenter->init(["data" => "", "errors" => $e->getMessage(), "messages" => "", "success" => false], 500)->getResponse();
        }
    }
    public function findAll(array $conditions = null){
        try{
            $db = $this->repo->findAll();
            if(!empty($conditions)){
                
            }
            if(!$db){
                throw new \Exception("Could not retrive data");
            }
            return $this->presenter->init(["data" => $db, "errors" => "", "messages" => "", "success" => True], 200)->getResponse();
        }catch(\Exception $e){
            return $this->presenter->init(["data" => "", "errors" => $e->getMessage(), "messages" => "", "success" => false], 500)->getResponse();
        }
    }
}