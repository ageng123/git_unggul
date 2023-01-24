<?php 
namespace App\Services\Penjualan;
use App\Repositories\{PenjualanRepository, ItemPenjualanRepository,BarangRepository};
use App\Interfaces\IMasterDataService;
use DB;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Presenters\JsonPresenter;
class PenjualanService implements IMasterDataService{
    public function __construct(
        private PenjualanRepository $repo, 
        private Request $request, 
        private ItemPenjualanRepository $detailRepo,
        private BarangRepository $repoBarang,
        private JsonPresenter $presenter
    ){}
    public function repo(){
        return $this->repo;
    }
    private function setUuid($request){
        $uuid = "";
        while($uuid == ""){
            $uuid = Str::uuid()->toString();
            $count = $this->repo->model()->where(array('id_nota' => $uuid))->count();
            if($count > 0){
                $uuid = "";
            }
        }
        $request['id_nota'] = $uuid;
        return $request;
    }
    public function save($formdata = null){
        try{
            $transaction = DB::transaction(function()use($formdata){
                
                $form = $formdata->toArray();
                
                if(empty($form['id_nota'])){
                    $form = $this->setUuid($form);
                }
                unset($form['detail_penjualan']);
                $save = $this->repo->save($form);
               
                if(!$save){
                    DB::rollback();
                    throw new \Exception("Error Saving Form",500);
                }
                $id = $form['id_nota'];
                //Save Item Penjualan..
                $save = $this->saveChild($id);
                if(!$save){
                    throw new \Exception("Error Saving");
                }
                DB::commit();
                return true;
            },3);
            return $this->presenter->init(["data" => "", "errors" => "", "messages" => "Save Data Penjualan Sukses", "success" => True], 200)->getResponse();
        }catch(\Exception $e){
            return $this->presenter->init(["data" => "", "errors" => $e->getMessage(), "messages" => "", "success" => false], 500)->getResponse();
        }
    }
    public function saveChild($parent = null){
       $total = 0;
       try{
        $this->detailRepo->model()->where('nota', $parent)->delete();
        foreach($this->request->detail_penjualan as $index => $value){
                $value["nota"] = $parent;
                $barang = $this->repoBarang->model()->where('kode', $value['kode_barang'])->first();
                if(!$barang){
                    throw new \Exception('Barang Not Found !',500);
                }
                $save = $this->detailRepo->save($value);
                if(!$save){
                    throw new \Exception("Failed to save nota detail data", 500);
                }
            $total += (int)$value['qty'] * (int)$barang->harga;
        }
        $update = $this->repo->model()->where('id_nota', $parent)->first()->update(['subtotal' => $total]);
        if(!$update){
            throw new \Exception("Failed to update subtotal");
        }
       }catch(\Exception $e){
        dd($e);
       }
       return true;
    }
    public function update($formdata = null, int|string $id = null){
        try{
            $transaction = DB::transaction(function()use($formdata, $id){
                if(empty($id)){
                    DB::rollback();
                    throw new \Exception("Please provide id for updating data",400);
                }
                $check = $this->repo->model($id);
                if($check->id_nota != $formdata->id_nota){
                    DB::rollback();
                    throw new \Exception("Form is not valid");
                }
                $updateData = $formdata->toArray();
                unset($updateData['detail_penjualan']);
                $update = $this->repo->update($updateData, $id);
                if(!$update){
                    DB::rollback();
                    throw new \Exception("Error Updating Form");
                }
                
                //Save Item Penjualan..
                $save = $this->saveChild($formdata->id_nota);
                if(!$save){
                    throw new \Exception("Error Saving");
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
                $check = $this->repo->model()->where("id_nota", $id)->firstOrFail();
                $data = $this->repo->model($check->id);
                if(!$data){
                    DB::rollback();
                    throw new \Exception("Error Deleting Data", 500);
                }
                $deleteChild = $this->detailRepo->model()->where('nota', $data->id_nota)->delete();
                if(!$deleteChild){
                    DB::rollback();
                    throw new \Exception("Error Deleting Data", 500);
                }
                $delete = $this->repo->delete($data->id);
                if(!$delete){
                    DB::rollback();
                    throw new \Exception("Error Deleting Data", 500);
                }
                DB::commit();
                return true;
            }, 3);
            return $this->presenter->init(["data" => "", "errors" => "", "messages" => "Delete Data Penjualan Sukses!", "success" => True], 200)->getResponse();
        }catch(\Exception $e){
            return $this->presenter->init(["data" => "", "errors" => $e->getMessage(), "messages" => "", "success" => false], 500)->getResponse();
        }
    }
    public function find($id){
        try{
            $check = $this->repo->model()->where('id_nota', $id)->firstOrFail();

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