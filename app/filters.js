;(function() {

  var app = angular.module( 'navFilters', [] );

  // deprecated
  app.filter( 'filternav', function() {

    return function( input ) {

      return input;

    };

  });

})();
