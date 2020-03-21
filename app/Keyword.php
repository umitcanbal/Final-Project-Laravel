<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{
    public function videos() {
        return $this->belongsToMany(Video::class, "keyword_video", "keyword_id", "video_id")->withPivot("offset_start");
    }

}
