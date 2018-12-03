<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table) {
            
            $table->increments('id');
            $table->integer('order')->nullable();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->text('description')->nullable();
            $table->string('type')->nullable();
            $table->text('content')->nullable();
            $table->string('mime')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            $table->index(['deleted_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lessons');
    }
}
