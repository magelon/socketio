	

var stAnimations = angular.module('stAnimations', ['ngAnimate']);

stAnimations.animation('.char', function() {

  var animateUp = function(element, className, done) {
    if(className != 'active') {
      return;
    }
    element.css({
      position: 'absolute',
      opacity:0.25,
	
      top: 0,
      left: -500,
      display: 'block'
    });

    jQuery(element).animate({
      	 
	opacity: 1,
	left: 0
	
    },500, done);

    return function(cancel) {
      if(cancel) {
        element.stop();
      }
    };
  }

  var animateDown = function(element, className, done) {
    if(className != 'active') {
      return;
    }
    element.css({
      position: 'absolute',
	opacity: 1,
      left: 0,
      top: 0
    });

    jQuery(element).animate({
	opacity: 0.25,
      left: -500
    },500, done);

    return function(cancel) {
      if(cancel) {
        element.stop();
      }
    };
  }

  return {
    addClass: animateUp,
    removeClass: animateDown
  };
});