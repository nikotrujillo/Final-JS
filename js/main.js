/*******************************************************************************

  Title: Service 4 Home
  Date: June 2013 

*******************************************************************************/

(function($) {

  var App = {

    /**
     * Init Function
     */
    init: function() {
      App.homeHieght();
      App.fixedNavi();
      App.anchorSlide();
      App.lightBox();
      App.parallaxScroll();
      App.contactForm();      
    },

 
 
 
 
    /**
     * Home Screen Height
     */
    homeHieght: function() {
      var h = window.innerHeight;
      $('#head').height(h);
      $('.logo').css("margin-top", h/4);

      $(window).resize(function(){
        var h = window.innerHeight;
        $('#head').height(h);
        $('.logo').css("margin-top", h/4);
      });
 
 
    },

 
 
 
 
    /**
     * Navigation Fixed Position
     */
    fixedNavi: function() {
      var off = $('#navigation').offset().top;
      $(window).scroll(function () {
        var p = $(window).scrollTop();
        if ((p - 10)>off) {
          $('body').addClass('fx')
        } else {
          $('body').removeClass('fx');
        }
      });
    },

 
 
 
 
    /**
    * Navigation Fixed Position
    */
    contactForm: function() {
      //contact form init
      var options = {target: "#alert"}
      $("#contact-form").ajaxForm(options);
    },

 
 
 
 
    /**
     * Slide to next anchor navigation
     */
    anchorSlide: function() {
      $('#head .link, #navigation a, .arrow-up').on('click', function(e){
        var goTo = $(this).attr('href');
            navH = $('#navigation').height();

        $('html, body').animate({
          scrollTop: $(goTo).offset().top - navH + 1
        }, 1400, "easeInOutExpo");

        e.preventDefault();
      });
    },

 
 
 
    /**
     * Lightbox init (fancybox 1)
     */
    lightBox: function() {
      $('figure a').fancybox();
    },


 
 
    /**
    * Parallax Scrolling
    */
    parallaxScroll: function() {

      var winW = $(window).innerWidth();
      var winH = $(window).innerHeight();

      if ( winW > 1024 ) {
        // Cache the Window object
        $window = $(window);

        $('#head').each(function(){
          var $bgobj = $(this); // assigning the object

          $(window).scroll(function() {

            // Scroll the background at var speed
            // the yPos is a negative value because we're scrolling it UP!                
            var yPos = -($window.scrollTop() / 5); 

            // Put together our final background position
            var coords = 'center '+ yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });

          }); // window scroll Ends

        });

        $('#about-us header').each(function(){
            var $bgobj = $(this); // assigning the object
            
            $(window).scroll(function() {
                             
             // Scroll the background at var speed
             // the yPos is a negative value because we're scrolling it UP!
             var yPos = ($window.scrollTop() / 3)-1600;
             
             // Put together our final background position
             var coords = 'center '+ yPos + 'px';
             
             // Move the background
             $bgobj.css({ backgroundPosition: coords });
             
             }); // window scroll Ends
            
            });
 
        $('#contact header').each(function(){
            var $bgobj = $(this); // assigning the object
            
            $(window).scroll(function() {
                             
             // Scroll the background at var speed
             // the yPos is a negative value because we're scrolling it UP!
             var yPos = ($window.scrollTop() / 3)-2000;
             
             // Put together our final background position
             var coords = 'center '+ yPos + 'px';
             
             // Move the background
             $bgobj.css({ backgroundPosition: coords });
             
             }); // window scroll Ends

            });
 
        $('#portfolio header').each(function(){
            var $bgobj = $(this); // assigning the object

            $(window).scroll(function() {
                
                // Scroll the background at var speed
                // the yPos is a negative value because we're scrolling it UP!
                var yPos = ($window.scrollTop() / 3)-700;
                
                // Put together our final background position
                var coords = 'center '+ yPos + 'px';
                
                // Move the background
                $bgobj.css({ backgroundPosition: coords });
                
                }); // window scroll Ends

        });
 
 
        $('#services header').each(function(){
          var $bgobj = $(this); // assigning the object

          $(window).scroll(function() {

            // Scroll the background at var speed
            // the yPos is a negative value because we're scrolling it UP!                
            var yPos = ($window.scrollTop() / 3)-2100;

            // Put together our final background position
            var coords = 'center '+ yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });

          }); // window scroll Ends

        });
 
      }
      
    }
    
  }
  
  
  $(function() {
    App.init();
  });
  

})(jQuery);