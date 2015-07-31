var app = angular.module("reviewApp", ["ngRoute"])


    app.controller("searchController", function($scope){
      (function() {

  
  var cards = document.querySelectorAll(".card.effect__random");
  var timeMin = 3;
  var timeMax = 15;
  var timeouts = [];

  
  for ( var i = 0, len = cards.length; i < len; i++ ) {
    var card = cards[i];
    var cardID = card.getAttribute("data-id");
    var id = "timeoutID" + cardID;
    var time = randomNum( timeMin, timeMax ) * 1000;
    cardsTimeout( id, time, card );
  }

  
  function cardsTimeout( id, time, card ) {
    if (id in timeouts) {
      clearTimeout(timeouts[id]);
    }
    timeouts[id] = setTimeout( function() {
      var c = card.classList;
      var newTime = randomNum( timeMin, timeMax ) * 1000;
      c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
      cardsTimeout( id, newTime, card );
    }, time );
  }

  
  function randomNum( min, max ) {
    return Math.random() * (max - min) + min;
  }

})();




        $scope.submit = function(){
          window.location.href = "#results/" + $scope.text
          
        }

     })

    app.controller("baseController", function($scope, $http, $sce, $routeParams){
      var game = $routeParams.game_name
      
      $http.get("https://vidrev.herokuapp.com/?search=" + game).success(function(data){
      
          $scope.reviews = data.Metacritic



          var youtubeData = data.Youtube
          youtubeData = youtubeData.map(function(video){
            video.videoUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video.videoId)
            return video
          })
          $scope.youtubes = youtubeData


          var twitchData = data.Twitch
          $scope.clickedOn = {}

          $scope.clickPlay = function(twitch) {
            $scope.clickedOn[twitch.stream_id] = true
          }

          twitchData = twitchData.map(function(video){
            $scope.clickedOn[video.stream_id] = false
            video.videoUrl = $sce.trustAsResourceUrl(video.links + "/embed")
            return video

          })
    
          $scope.twitches = data.Twitch 
     
          $scope.text = ''
        //}
        
                     
      })
    })

  app.config(function($routeProvider){

    $routeProvider
      
      .when("/results/:game_name",{
        templateUrl: "templates/results.html"
      })
      .otherwise({
        templateUrl:"templates/landing.html"
      })

  })
      


