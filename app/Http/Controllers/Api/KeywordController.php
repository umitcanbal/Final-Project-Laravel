<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use App\Keyword;
use App\Video;

class KeywordController extends Controller
{
    public function getTheKeywords() {
        return Keyword::all();
    }

    public function getTheKeywordWithVideos($alias) {
        $keyword = Keyword::where("alias", $alias)->get()[0];
        $videos = $keyword->videos()->get();
        $keyword->videos = $videos;

        return $keyword;
    }
}
