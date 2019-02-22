<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDataTrailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_trails', function (Blueprint $table) {
            $table->boolean('view')->nullable();
            $table->float('progress', 10 , 5)->nullable();
            $table->date('finish')->nullable();
            $table->integer('rating')->nullable();
            $table->text('testimonal')->nullable();
            $table->boolean('favorite')->nullable();

            $table->integer('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('trail_id')->unsigned()->nullable();
            $table->foreign('trail_id')->references('id')->on('trails')->onDelete('cascade');
            $table->integer('course_id')->unsigned()->nullable();
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::table('data_courses', function (Blueprint $table) {
            $table->integer('trail_id')->unsigned()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_trails');
    }
}
