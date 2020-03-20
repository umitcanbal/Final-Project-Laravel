<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Keyword;
use App\Video;


class KeywordController extends Controller
{
    public function getTheVideos() {
        $keyword_id = 1;
        $keyword = Keyword::findOrFail($keyword_id);
        $videos = $keyword->videos()->get();
        return [
            $videos,
            $keyword
        ];

        // $keywords = Keyword::all();
        // $videos = [];
        // foreach($keywords as $keyword) {
        //     array_push($videos, $keyword->videos()->get());
        // }

        // return [
        //     $videos,
        //     $keywords,
        // ];

        ANDREJ

        //iki controller, keyword_id =1 için mesela, videoları da keyword_id ye göre çekicez. Keyword_id KULLANICININ TIKLADIĞI KELİME BELİRLEYECEK
    }

    


}
