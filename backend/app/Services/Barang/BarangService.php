<?php 
namespace App\Services\Barang;
use App\Repositories\BarangRepository;
use App\Interfaces\IMasterDataService;
use DB;
use Illuminate\Support\Str;
use App\Presenters\JsonPresenter;
class BarangService implements IMasterDataService{
    public function __construct(private BarangRepository $repo, private JsonPresenter $presenter){}
    public function repo(){
        return $this->repo;
    }
    public function setUuid($request){
        $uuid = "";
        while($uuid == ""){
            $uuid = Str::uuid()->toString();
            $count = $this->repo->model()->where(array('kode' => $uuid))->count();
            if($count > 0){
                $uuid = "";
            }
        }
        $request['kode'] = $uuid;
        return $request;
    }
    public function save($formdata = null){
        try{
            $transaction = DB::transaction(function()use($formdata){
                $formdata = $formdata->toArray();
                if(empty($formdata['kode'])){
                    $formdata = $this->setUuid($formdata);
                }
                                    
                $save = $this->repo->save($formdata);
                if(!$save){
                    DB::rollback();
                    throw new \Exception("Error Saving Form",500);
                }
                DB::commit();
                return true;
            },3);
            return $this->presenter->init(["data" => "", "errors" => "", "messages" => "Berhasil Save Data", "success" => True], 201)->getResponse();
        }catch(\Exception $e){
            return $this->presenter->init(["data" => "", "errors" => $e->getMessage(), "messages" => "Error Save Data", "success" => false], 500)->getResponse();
        }
    }
    public function update($formdata = null, int|string $id = null){
        try{
            $transaction = DB::transaction(function()use($formdata, $id){
                if(empty($id)){
                    DB::rollback();
                    throw new \Exception("Please provide id for updating data",400);
                }
                $check = $this->repo->model()->where('kode', $id)->firstOrFail();
                $update = $formdata->toArray();
                unset($update['id']);
                unset($update['history_barang_keluar']);
                $update = $this->repo->update($update, $check->id);
                if(!$update){
                    DB::rollback();
                    throw new \Exception("Error Updating Form");
                }
                DB::commit();
                return $update;
            },3);
        }catch(\Exception $e){
            dd($e);
        }
    }
    public function delete(int|string $id = null){
        try{
            $transaction = DB::transaction(function()use($id){
                if(empty($id)){
                    DB::rollback();
                    throw new \Exception("Please Provide ID for deleting data", 500);
                }
                $check = $this->repo->model()->where('kode', $id)->firstOrFail();
                
                $delete = $this->repo->delete($check->id);
                if(!$delete){
                    DB::rollback();
                    throw new \Exception("Error Deleting Data", 500);
                }
                DB::commit();
                return true;
            }, 3);
        }catch(\Exception $e){
            dd($e);
        }
    }
    public function find($id){
        try{
            if(!is_int($id)){
                $getData = $this->repo->model()->where('kode', $id)->firstOrFail();
                $id = $getData->id;
            }

            $db = $this->repo->model($id);
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