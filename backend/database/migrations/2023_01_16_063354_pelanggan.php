<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('pelanggans', function(Blueprint $table){
            $table->id();
            $table->string('id_pelanggan', 200);
            $table->string("nama");
            $table->unsignedBigInteger("id_domisili")->nullable();
            $table->string("domisili")->nullable();
            $table->string("jenis_kelamin");
            $table->timestamps();
            $table->softDeletes();
            $table->unique(['id_pelanggan']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('pelanggans');
    }
};
