
window.getYoutubePlayer = function getYoutubePlayer(videoId = 'M7lc1UVf-VE', playerVars) {
    return new Promise((resolve, reject) => {
      if(!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        let waiting;
        let player;
        waiting = setInterval(() => {
          setTimeout(() => { 
            clearInterval(waiting) 
            reject('Something is wrong and the YT Script isn\'t loading')
          }, 2000)
          if (window.YT && window.YT.Player) {
            clearInterval(waiting)
            onYouTubeIframeAPIReady()
          }
        }, 50)
      } else {
        onYouTubeIframeAPIReady();
      }
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '315',
          width: '560',
          videoId,
          playerVars,
          events: {
            'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
          }
        });
      }
      // 4. The API will call this function when the video player is ready.
      function onPlayerReady() {
        resolve(player)
      }
      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      // let done = false;
      // function onPlayerStateChange(event) {
      //   if (event.data == YT.PlayerState.PLAYING && !done) {
      //     console.log(player.g.g.playerVars.end)
      //     setTimeout(stopVideo, 10000);
      //     done = true;
      //   }
      // }
      // function stopVideo() {
      //   player.stopVideo();
      // }
    })
  }