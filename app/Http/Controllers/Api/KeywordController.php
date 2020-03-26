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
        // $keyword_id = 1;
        // $keyword = Keyword::findOrFail($keyword_id);
        // $videos = $keyword->videos()->get();
        // return [
        //     $videos,
        //     $keyword
        // ];

        $keywords = Keyword::all();
        foreach ($keywords as $keyword) {
            $videos = $keyword->videos()->get();
            $keyword->videos = $videos;
        }
        return $keywords;


        // $filtered = array_filter(
        //     $keywords,
        //     function ($key) use ($allowed) {
        //         return in_array($key, $allowed);
        //     },
        //     ARRAY_FILTER_USE_KEY
        // ); 
        // return $filtered;

        // $keywords = Keyword::all()->toArray();
        // return $keywords[0];

        // $keywords = Keyword::all();
        // $videos = [];
        // foreach($keywords as $keyword) {
        //     array_push($videos, $keyword->videos()->get());
        // }

        // return [
        //     $videos,
        //     $keywords,
        // ];


        //iki controller, keyword_id =1 için mesela, videoları da keyword_id ye göre çekicez. Keyword_id KULLANICININ TIKLADIĞI KELİME BELİRLEYECEK
    }

    


}
