var app = angular.module("reviewApp", [])

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
             		video.videoUrl = $sce.trustAsResourceUrl("https://www.twitch.tv/worldofnerds/embed")
             		return video
             	})
    			$scope.twitches = data.Twitch
    			console.log($scope.twitches)
    		})
    })
    	


