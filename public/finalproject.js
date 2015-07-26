var app = angular.module("reviewApp", ["ngRoute"])

    app.controller("pageController", function($scope, $http){

      
        $http.get("http://389b0914.ngrok.io/?search=" + $scope.search)
            .success(function(data){
              console.log("hi")


            })
      
    })

    app.controller("metaController", function($scope, $http){
            $http.get("https://vidrev.herokuapp.com")
             .success(function(data){
                 $scope.reviews = data.Metacritic
                 console.log($scope.reviews)
             })

    })

           

    app.controller("youtubeController", function($scope, $http, $sce){
            $http.get("https:vidrev.herokuapp.com")
             .success(function(data){
             	var youtubeData = data.Youtube
             	youtubeData = youtubeData.map(function(video){
             		video.videoUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video.videoId)
             		return video
             	})
                 $scope.youtubes = youtubeData
                 console.log($scope.youtubes)
             })


        })

    app.controller("twitchController", function($scope, $http, $sce){
       $http.get("https://vidrev.herokuapp.com")
           .success(function(data){
               var twitchData = data.Twitch
                twitchData = twitchData.map(function(video){
                    $scope.clickedOn[video.stream_id] = false
                   video.videoUrl = $sce.trustAsResourceUrl(video.links + "/embed")
                    return video
                })
                $scope.twitches = data.Twitch 
               console.log($scope.twitches)
           })

      $scope.clickedOn = {}

      $scope.clickPlay = function(twitch) {
        $scope.clickedOn[twitch.stream_id] = true
        
      }
    })

    /*app.controller.("searchController", function($scope, $http){
          $http.get("http://389b0914.ngrok.io/?search=dota2")
            .success(function(data){
              $scope.clickSearch() = data
              console.log(this)
            
        })

    })*/
  app.config(function($routeProvider){

    $routeProvider
      
      .when("/results",{
        templateUrl: "templates/results.html"
      })
      .otherwise({
        templateUrl:"templates/landing.html"
      })

  })
    
      


