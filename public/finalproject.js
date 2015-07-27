var app = angular.module("reviewApp", ["ngRoute"])

 
    app.controller("baseController", function($scope, $http, $sce){
            $http.get("https://vidrev.herokuapp.com")
             .success(function(data){
                 $scope.reviews = data.Metacritic
                 var youtubeData = data.Youtube
              youtubeData = youtubeData.map(function(video){
                video.videoUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video.videoId)
                return video
              })
                 $scope.youtubes = youtubeData
                 var twitchData = data.Twitch
                 console.log('Here1')
                 $scope.clickedOn = {}

                $scope.clickPlay = function(twitch) {
                  $scope.clickedOn[twitch.stream_id] = true
                  
                }

                twitchData = twitchData.map(function(video){
                    console.log('Here1.5')
                    $scope.clickedOn[video.stream_id] = false
                    console.log('Here2')
                   video.videoUrl = $sce.trustAsResourceUrl(video.links + "/embed")
                   console.log('Here3')
                    return video

                })
                console.log('Here4')
                $scope.twitches = data.Twitch 


             })
            

    })

           


    app.controller("searchController", function($scope, $http, $location){
      $scope.submit = function() {
              if ($scope.text){
                 
                 $http.get("http://389b0914.ngrok.io/?search=" + $scope.text)
                      .success(function(data){
                        //$location.url('/results')
                      
                      })
                      $scope.text = ''
          }
      }
  })
  app.config(function($routeProvider){

    $routeProvider
      
      .when("/results",{
        templateUrl: "templates/results.html"
      })
      .otherwise({
        templateUrl:"templates/landing.html"
      })

  })
    
      


