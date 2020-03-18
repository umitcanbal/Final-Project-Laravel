<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKeywordVideoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('keyword_video', function (Blueprint $table) {
        
            $table->unsignedBigInteger("keyword_id")->nullable();
            $table->unsignedBigInteger("video_id")->nullable();
            $table->unsignedBigInteger("offset_start")->nullable();

            $table->primary([
                "keyword_id",
                "video_id",
                "offset_start"
            ]);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('keyword_video', function (Blueprint $table) {
            //
        });
    }
}
