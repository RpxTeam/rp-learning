<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDataCourseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_course', function (Blueprint $table) {

            $table->increments('id');
            $table->integer('view')->nullable();
            $table->float('progress', 10 , 5)->nullable();
            $table->date('finish')->nullable();
            $table->integer('rating')->nullable();
            $table->text('testimonal')->nullable();
            $table->boolean('favorite')->nullable();
<<<<<<< HEAD
            
=======

>>>>>>> f2e7313fa968cb616d14a72eeb77166d20e44b6c
            $table->softDeletes();

            $table->index(['deleted_at']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_course');
    }
}
