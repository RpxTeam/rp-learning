<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDataLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_lessons', function (Blueprint $table) {
           

            $table->boolean('view')->nullable();
            $table->float('progress', 10 , 5)->nullable();
            $table->date('finish')->nullable();
            $table->integer('user_id')->unsigned();
            $table->integer('course_id')->unsigned();
            $table->integer('lesson_id')->unsigned();
            
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
        Schema::dropIfExists('data_lesson');
    }
}
