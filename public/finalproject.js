var app = angular.module("reviewApp", ["ngRoute"])


    app.controller("searchController", function($scope){
        $scope.submit = function(){
          window.location.href = "#results/" + $scope.text
          $scope.text = ''
        }
     })

 
    app.controller("baseController", function($scope, $http, $sce, $routeParams){
      var game = $routeParams.game_name
      
      $http.get("https://vidrev.herokuapp.com/?search=" + game).success(function(data){
        
        console.log("data", data)


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
    
      


