<?php 
namespace App\Interfaces;
interface IMasterDataService{
    public function repo();
    public function save($formdata = null);
    public function update($formdata = null, int|string $id = null);
    public function delete(int|string $id = null);
}