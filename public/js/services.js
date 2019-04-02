angular.module('MyApp.services', [])
  .factory('appAPIservice', function($http, __env) {
    var appAPI = {};
    var server = __env.apiUrl

    appAPI.getPost = function(user_id) {
    	return $http.get("get_post?user_id="+user_id)
    }

    appAPI.createPost = function(data, user_id) {
      var config = {
        withCredentials: false,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }
      return $http.post("/create_post?user_id="+user_id, data, config)
    }

    appAPI.editPost = function(data, post_id) {
      var config = {
        withCredentials: false,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }
      return $http.post("/edit_post?post_id="+post_id, data, config)
    }

    appAPI.softDeletePost = function(id) {
    	return $http.post("/soft_delete_post?post_id="+id)
    }

    appAPI.deletePost = function(id) {
    	return $http.post("/delete_post?post_id="+id)
    }

    appAPI.getComment = function(id) {
    	return $http.get("/get_comment?post_id="+id)
    }

    appAPI.createComment = function(data, user_id, post_id) {
      var config = {
        withCredentials: false,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }
      return $http.post("/create_comment?user_id="+user_id+"&post_id="+post_id, data, config)
    }

    appAPI.editComment = function(data, comment_id) {
      var config = {
        withCredentials: false,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }
      return $http.post("/edit_comment?comment_id="+comment_id, data, config)
    }

    appAPI.softDeleteComment = function(id) {
    	return $http.post("/soft_delete_comment?comment_id="+id)
    }

    appAPI.deleteComment = function(id) {
    	return $http.post("/delete_comment?comment_id="+id)
    }

    appAPI.getTrashPost = function() {
    	return $http.get("/trash_post")
    }

    appAPI.restorePost = function(id) {
    	return $http.post("/restore_post?post_id="+id)
    }

    appAPI.getTrashComment = function() {
    	return $http.get("/trash_comment")
    }

    appAPI.restoreComment = function(id) {
    	return $http.post("/restore_comment?comment_id="+id)
    }

    appAPI.signUp = function(data) {
      var config = {
        withCredentials: false,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }
      return $http.post("/sign_up", data, config)
    }

    appAPI.loginUser = function(data) {
      var config = {
        withCredentials: false,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }
      return $http.post("/index/login", data, config)
    }
    return appAPI;
  });