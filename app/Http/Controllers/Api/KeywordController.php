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
    }
}
