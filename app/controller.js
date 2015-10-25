/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 *
 */
;(function() {

  var app = angular.module( 'portfolio' );

  app.controller( 'MainController', MainController );
  app.controller( 'WorkController', WorkController );
  app.controller( 'ContactController', ContactController );

  function MainController( $scope, $firebaseObject, $routeParams ) {
    $scope.sortType = 'order';
    $scope.debug    = false;

    // live database from Firebase
    var ref = new Firebase( 'https://sonnyportfolio.firebaseio.com/' );
    $scope.data = $firebaseObject( ref );

    // activate debug mode
    if ( $routeParams.debug === 'true' ) {
      $scope.debug = true;
    }

    $scope.isVisible = function( tab ) {
      var visible = true;

      visible = tab.is_home === true ? false : visible;
      visible = tab.hide === true ? false : visible;

      return visible;
    }

  }

  function WorkController( $scope ) {
    $scope.readMore = function( $event, work ) {
      work.readmore = ! work.readmore;

      if ( work.readmore ) {
        $( $event.target ).closest( '.panel' ).addClass( 'active' );
        $( $event.target ).html( 'Close' );
      }
      else {
        $( $event.target ).closest( '.panel' ).removeClass( 'active' );
        $( $event.target ).html( 'Read More' );
      }
    }

  }

  function ContactController( $scope, $http ) {
    $scope.success = false;
    $scope.error   = false;

    $scope.send = function () {
      $scope.success = false;
      $scope.error   = false;

      $scope.formData.recaptcha_response = $( '#g-recaptcha-response' ).val();

      $http({
        method: 'POST',
        url: 'send.php',
        data: $.param($scope.formData),
        headers: { "Content-type": "application/x-www-form-urlencoded; charset=utf-8" },
      }).
      success( function ( data ) {
        if ( data.success ) {
        	$scope.success = true;
        }
        else {
          $scope.error = true;
        }
      }).
      error( function ( data ) {
      	$scope.error = true;
      });
    }

  }

})();
