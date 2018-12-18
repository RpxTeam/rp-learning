<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDataCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_courses', function (Blueprint $table) {

            $table->boolean('view')->nullable();
            $table->float('progress', 10 , 5)->nullable();
            $table->date('finish')->nullable();
            $table->integer('rating')->nullable();
            $table->text('testimonal')->nullable();
            $table->boolean('favorite')->nullable();

            $table->integer('user_id')->unsigned();
            $table->integer('course_id')->unsigned();
            
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
