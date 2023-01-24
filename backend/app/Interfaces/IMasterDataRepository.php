<?php 
namespace App\Interfaces;
interface IMasterDataRepository{
    public function model(int $id = null);
    public function builder();
    public function save($formdata = null);
    public function update($formdata = null, int $id = null);
    public function delete(int $id = null);
    public function findAll(array $conditions = null);
}