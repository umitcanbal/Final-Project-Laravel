<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Keyword;
use App\Video;

class VideoController extends Controller
{
    public function getTheVideos($alias) {

        $keyword = Keyword::where("alias", $alias)->get();
        $videos = $keyword[0]->videos()->get();
        return $videos;        
    }
}
