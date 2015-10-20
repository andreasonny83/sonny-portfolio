/**
 *
 * AngularJS portfolio
 *
 */
;(function() {


  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('portfolio', [
      'ngRoute',
      'firebase',
      'ngAnimate'
    ])
    .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   *
   */
  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/work-experience', {
        templateUrl: 'views/work.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/skills', {
        templateUrl: 'views/skills.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/hire-me', {
        templateUrl: 'views/hire.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    // $httpProvider.interceptors.push('authInterceptor');

  }


  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   *
   */
  angular
    .module('portfolio')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$location'];

  function authInterceptor($rootScope, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }


  /**
   * Run block
   */
  angular
    .module('portfolio')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {

    // put here everything that you need to run on page load

  }


})();
