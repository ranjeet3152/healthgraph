var env = {};
if(window){
  Object.assign(env, window.__env);
}
angular.module('MyApp', [
  'MyApp.services',
  'MyApp.controllers',
  'ngRoute','angularUtils.directives.dirPagination',
  'ngMaterial','ngMessages', 'ngStorage', 'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when("/", {templateUrl: "partials/login.html", controller: "loginController"}).
  when("/home", {templateUrl: "partials/home.html", controller: "homeController"}).
  when("/comments/:id", {templateUrl: "partials/comments.html", controller: "commentsController"}).
  when("/trash_post", {templateUrl:"partials/trash_post.html", controller: "trashPostController"}).
  when("/trash_comment", {templateUrl: "partials/trash_comment.html", controller: "trashCommentController"}).
  otherwise({redirectTo: '/'});
}
]).
config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
angular.module('MyApp').constant('__env', env);
