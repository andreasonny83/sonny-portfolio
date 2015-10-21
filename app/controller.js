/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 *
 */
;(function() {

  var app = angular.module('portfolio');
      app.controller('MainController', MainController);

  app.controller('WorkController', WorkController);
  app.controller('WorkItemController', WorkItemController);
  app.controller('SkillsController', SkillsController);
  app.controller('ContactController', ContactController);

  function MainController() {

    var self = this;

  }

  function SkillsController( $scope, $element, $firebaseObject ) {

    var self = this;

    var ref = new Firebase( 'https://sonnyportfolio.firebaseio.com/skills' );
    this.skills = $firebaseObject( ref );

  }

  function WorkController( $scope, $element, $firebaseObject ) {

    var self = this;

    var ref = new Firebase( 'https://sonnyportfolio.firebaseio.com/works' );
    this.works = $firebaseObject( ref );

    this.readMore = function($event, work) {

      work.readmore = ! work.readmore;

      if ( work.readmore ) {
        $( $event.target ).closest( '.panel' ).addClass('active');
      }
      else {
        $( $event.target ).closest( '.panel' ).removeClass('active');
      }
    }

  }

  function WorkItemController() {

    this.readmore = true;

  }

  function ContactController($scope, $http) {
    $scope.success = false;
    $scope.error = false;

    $scope.send = function () {
      $scope.success = false;
      $scope.error = false;

      $scope.formData.recaptcha_response = $( '#g-recaptcha-response' ).val();

      $http({
        method: 'POST',
        url: 'send.php',
        data: $.param($scope.formData),
        headers: { "Content-type": "application/x-www-form-urlencoded; charset=utf-8" },
      }).
      success(function (data) {
        if ( data.success ) {
        	$scope.success = true;
        }
        else {
          $scope.error = true;
        }
      }).
      error(function (data) {
      	$scope.error = true;
      });
    }
  }

})();
