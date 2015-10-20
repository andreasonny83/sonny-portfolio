/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 *
 */
;(function() {

  angular
    .module('portfolio')
    .controller('MainController', MainController)
    .controller('WorkController', WorkController)
    .controller('WorkItemController', WorkItemController);

    // app.controller( 'PortfolioCtrl', function( $scope, $firebaseObject ) {
    // });

  function MainController() {

    var self = this;


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

})();
