angular.module('MyApp.controllers', []).
controller('loginController', function($scope, appAPIservice, $window, $location) {
  $scope.loginUser = function() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var fd = new FormData();
    fd.append("username", username);
    fd.append("password", password);
    appAPIservice.loginUser(fd).then(function successCallback(response) {
      if (response.status === 200) {
      	localStorage.setItem("user_id", response.data.payload['user_id']);
        $location.path("/home");
      } else {
        alert("Something went wrong at the backend");
      }
      response = response.data;
    }, function errorCallback(response) {
      window.alert(response.data.meta.message);
    });
  };

  $scope.signUp = function() {
    var name = document.getElementById('create_name').value;
    var email_id = document.getElementById('email_id').value;
    var cfd = new FormData();
    cfd.append("name", name);
    cfd.append("email_id", email_id);
    console.log(cfd);
    appAPIservice.signUp(cfd).then(function successCallback(response) {
      if (response.status === 200) {
        $location.path("/home");
      } else {
        alert("Something went wrong at the backend");
        $window.location.reload();
      }
    }, function errorCallback(response) {
      window.alert(response.data.meta.message);
    });
  }

}).

controller('homeController', function($scope, appAPIservice, $window) {
	$scope.user_id = localStorage.user_id;
  $scope.loading = true;
  appAPIservice.getPost($scope.user_id).then(function successCallback(response) {
    response = response.data.payload;
    $scope.post_data = response['post_data'];
    $scope.loading = false;
  }, function errorCallback(response) {
    window.alert(response.data.meta.message);
  });

  $scope.createPost = function() {
    $scope.create_loading = true;
    var post = document.getElementById('create_post').value;
    var cfd = new FormData();
    cfd.append("post", post);
    appAPIservice.createPost(cfd, $scope.user_id).then(function successCallback(response) {
      response = response.data;
      $scope.post_data.push(response.payload['post_data_info']);
      window.alert(response.meta.message);
      $window.location.reload();
      $scope.create_loading = false;
    }, function errorCallback(response) {
      window.alert(response.data.meta.message);
    });
  }

  $scope.editPostFill = function(post) {
    $scope.post_id = post.id;
    $scope.edit_post = post.data;
  }

  $scope.editPost = function() {
    $scope.edit_loading = true;
    var edit_post = document.getElementById('edit_post').value;
    var cfd = new FormData();
    cfd.append("post", edit_post);
    appAPIservice.editPost(cfd, $scope.post_id).then(function successCallback(response) {
      response = response.data;
      window.alert(response.meta.message);
      $window.location.reload();
      $scope.edit_loading = false;
    }, function errorCallback(response) {
      window.alert(response.data.meta.message);
    });
  }

  $scope.softDeletePost = function(post_id) {
  	var confirmation = confirm('Are you sure you want to delete');
		if (confirmation == true) {
			$scope.loading = true;
			appAPIservice.softDeletePost(post_id).then(function successCallback(response){
				response = response.data;
				$scope.loading = false;
				$window.location.reload();
			}, function errorCallback(response){ 
				window.alert(response.data.meta.message);
				$scope.loading = false;
			});
		}
  }

  $scope.deletePost = function(post_id) {
  	var confirmation = confirm('Are you sure you want to delete');
		if (confirmation == true) {
			$scope.loading = true;
			appAPIservice.deletePost(post_id).then(function successCallback(response){
				response = response.data;
				$scope.loading = false;
				$window.location.reload();
			}, function errorCallback(response){ 
				window.alert(response.data.meta.message);
				$scope.loading = false;
			});
		}
  }

}).

controller('commentsController', function($scope, appAPIservice, $window, $routeParams) {

	$scope.loading = true;
  appAPIservice.getComment($routeParams.id).then(function successCallback(response) {
    response = response.data.payload;
    $scope.comment_data = response['comment_data'];
    $scope.post_name = response.post_name;
    $scope.loading = false;
  }, function errorCallback(response) {
    window.alert(response.data.meta.message);
  });

  $scope.createComment = function() {
  	let user_id = localStorage.user_id;
  	$scope.create_loading = true;
    var comment = document.getElementById('create_comment').value;
    var cfd = new FormData();
    cfd.append("comment", comment);
    appAPIservice.createComment(cfd, user_id, $routeParams.id).then(function successCallback(response) {
      response = response.data;
      $scope.comment_data.push(response.payload['comment_data_info']);
      window.alert(response.meta.message);
      $window.location.reload();
      $scope.create_loading = false;
    }, function errorCallback(response) {
      window.alert(response.data.meta.message);
    });
	}

	$scope.editCommentFill = function(comment) {
    $scope.comment_id = comment.id;
    $scope.edit_comment = comment.data;
  }

  $scope.editComment = function() {
    $scope.edit_loading = true;
    var edit_comment = document.getElementById('edit_comment').value;
    var cfd = new FormData();
    cfd.append("comment", edit_comment);
    appAPIservice.editComment(cfd, $scope.comment_id).then(function successCallback(response) {
      response = response.data;
      window.alert(response.meta.message);
      $window.location.reload();
      $scope.edit_loading = false;
    }, function errorCallback(response) {
      window.alert(response.data.meta.message);
    });
  }

  $scope.softDeleteComment = function(comment_id) {
  	var confirmation = confirm('Are you sure you want to delete');
		if (confirmation == true) {
			$scope.loading = true;
			appAPIservice.softDeleteComment(comment_id).then(function successCallback(response){
				response = response.data;
				$scope.loading = false;
				$window.location.reload();
			}, function errorCallback(response){ 
				window.alert(response.data.meta.message);
				$scope.loading = false;
			});
		}
  }

  $scope.deleteComment = function(comment_id) {
  	var confirmation = confirm('Are you sure you want to delete');
		if (confirmation == true) {
			$scope.loading = true;
			appAPIservice.deleteComment(comment_id).then(function successCallback(response){
				response = response.data;
				$scope.loading = false;
				$window.location.reload();
			}, function errorCallback(response){ 
				window.alert(response.data.meta.message);
				$scope.loading = false;
			});
		}
  }

}).

controller('trashPostController', function($scope, appAPIservice, $window) {

	$scope.loading = true;
	appAPIservice.getTrashPost().then(function successCallback(response) {
		response = response.data.payload;
		$scope.trash_post = response['trash_post'];
		$scope.loading = false;
	}, function errorCallback(response) {
		window.alert(response.data.meta.message);
	});

	$scope.restorePost = function(post_id) {
		var confirmation = confirm('Are you sure you want to restore');
		if (confirmation == true) {
			$scope.loading = true;
			appAPIservice.restorePost(post_id).then(function successCallback(response){
				response = response.data;
				$scope.loading = false;
				$window.location.reload();
			}, function errorCallback(response){ 
				window.alert(response.data.meta.message);
				$scope.loading = false;
			});
		}
	}

}).

controller('trashCommentController', function($scope, appAPIservice, $window) {

	$scope.loading = true;
	appAPIservice.getTrashComment().then(function successCallback(response) {
		response = response.data.payload;
		$scope.trash_comment = response['trash_comment'];
		$scope.loading = false;
	}, function errorCallback(response) {
		window.alert(response.data.meta.message);
	});

	$scope.restoreComment = function(comment_id) {
		var confirmation = confirm('Are you sure you want to restore');
		if (confirmation == true) {
			$scope.loading = true;
			appAPIservice.restoreComment(comment_id).then(function successCallback(response){
				response = response.data;
				$scope.loading = false;
				$window.location.reload();
			}, function errorCallback(response){ 
				window.alert(response.data.meta.message);
				$scope.loading = false;
			});
		}
	}

});