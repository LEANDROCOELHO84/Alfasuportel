jQuery(document).ready(function($) {

  "use strict";


  // Slider

  if($('.flexslider').length > 0) {
    $('.flexslider').flexslider({
      animation: "slide"
    });
  }
  var nextItem = '',
      ValidNextItem = '',
      prevItem = '',
      ValidPrevItem = '';
    prevItem       = $('.slider .flexslider .slides li').prev().css('background-image');
    ValidPrevItem  = prevItem.substr(5, prevItem.length - 11).concat('-100x50.jpg');
    nextItem       = $('.slider .flexslider .slides li').next().css('background-image');
    ValidNextItem  = nextItem.substr(5, nextItem.length - 11).concat('-100x50.jpg');
  $('.slider .flexslider .flex-next').hover(function () {
    $(this).css('background-image', 'url(' + ValidNextItem + ')');
  }, function () {
    $(this).css('background-image', 'url()');
  });
  $('.slider .flexslider .flex-prev').hover(function () {
    $(this).css('background-image', 'url(' + ValidPrevItem + ')');
  }, function () {
    $(this).css('background-image', 'url()');
  });

if($(window).width() > '900' ){
    jQuery('.animated').each(function(i, obj) {
        var anim_class = jQuery(this.element).data('animated');
        if(!jQuery(this).hasClass(anim_class)){
            jQuery('.animated').css('opacity', 0);
        }
    });
}


  //___________ animate Element when it visible
  $('.animated').waypoint(function() {
      var that = $(this.element).length > 0 ? $(this.element) : $(this);
      that.css('opacity', 1);
      that.addClass(that.data('animated'));
  },
  { offset: 'bottom-in-view' });


  /*_________________________________  Carousel ___________________*/
  $(".carousel_client").owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    loop:true,
    items:3,
    responsiveClass:true,
    responsive:{
      0:{
        items:2,
        nav:true
      },
      600:{
        items:3,
        nav:false
      },
      1000:{
        items:6,
        nav:true,
        loop:false
      },
      1200:{
        items:6,
        nav:true,
        loop:false
      }
    }
  });

  $(".owl-testimonail").owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    items: 1,
    autoPlay: true,
    stopOnHover: true,
    responsiveClass:true,
    responsive:{
      0:{
        items:1,
        nav:true
      },
      800:{
        items:1,
        nav:false
      },
      1000:{
        items:1,
        nav:true,
        loop:false
      }
    }
  });

/*_________________________________  Parallax ___________________*/

    if (!isMobile.apple.phone && !isMobile.android.phone && !isMobile.seven_inch) {
        $('.wd-form-image2').parallax("10%", -0.3);
        $('.wd-section-clients').parallax("30%", -0.3);
    }

  
/*__________________________portfolio masonry____________*/
// isotop on gallery

// cache container

var $container = $('#gallery-items');
// initialize isotope
$container.isotope({
  filter: '*',
 	itemSelector : '.element',
   animationEngine : 'best-available',
});

// filter items when filter link is clicked
  jQuery('#filters a').on('click',function (e) {
  $('.gallery-filter .current').removeClass('current');
  $(this).addClass('current');
  var selector = $(this).attr('data-filter');
  $container.isotope({ filter: selector });
  return false;


 });
  /*_________________________________  The Map ___________________*/
	function initializeMap() {
     	
        var styles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
;

        var styledMap = new google.maps.StyledMapType(styles, {
            name: "Styled Map"
        });

        var mapOptions = {
            scaleControl: true,
            scrollwheel: false,
            center: new google.maps.LatLng(latitude, longitude),
            zoom: flooring_zoom,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }

        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
        var image = window.location.origin + window.location.pathname + 'images/marker_icon.png';
        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            position: map.getCenter()
        });
        
        var infowindow = new google.maps.InfoWindow();
        if( companyname !=  ""){
          companyname = "<h4>" + companyname + "</h4>";
        }
        infowindow.setContent( "<div class='map-description'>" + companyname + " " + description + "</div>" );
        
        infowindow.open(map, marker);

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    }
   if ($('#map-canvas').length > 0) {
    
    var latitude = $('#map-canvas').data('latitude'),
        longitude = $('#map-canvas').data('longitude'),
        flooring_zoom = $('#map-canvas').data('zoom'),
        companyname = $('#map-canvas').data('companyname'),
        imagepath = $('#map-canvas').data('imagepath'),
        description = $('#map-canvas').data('decription');
    if (imagepath=="") {
        var image_markup = '';
    } else{
        var image_markup = '<div class="map-img"><img src="' + imagepath + '" alt="" width="320px"></div>';
    }



    google.maps.event.addDomListener(window, 'load', initializeMap);
  }



  /*_________________________________ Slider  ________________________*/

    $(window).load(function() {
    $('.fullscreen .swiper-slide').height( window.innerHeight );
    $(window).resize(function() {
      $('.fullscreen .swiper-slide').height( window.innerHeight );
    });

    var mc = $(".swiper-container").data("mousewheel-control");
    var swiper = new Swiper('.swiper-container', {

        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        speed: 1000,
        effect: 'slide',
        autoplay: 8000,
        autoplayDisableOnInteraction: false,
        loop: true,
        mousewheelControl: mc,
        grabCursor: true,
        
        // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazyLoading: true,
    watchSlidesVisibility : true
        
    });
    $(window).trigger('resize');



    /*_________________________________ Waypoints ___________________*/





$('.wd-section-blog-services.style-3').waypoint(function() {
      $('.wd-section-blog-services.style-3').addClass('anim-on');
      $('.wd-section-blog-services.style-3 .wd-blog-post').addClass('nohover');
  },
  { offset: 'bottom-in-view' });

  $('.animated').css('opacity', 0);


  //___________ Add animation delay
  var thisParent     = $(this).closest( '.animation-parent'),
      animationDelay = thisParent.data('animation-delay');

  // find ".animation-parent"
  $('.animation-parent').each(function( index, element ) {
    // find each ".animated" in the current ".animation-parent"
    $('.animated', $(this)).each(function ( index, element ) {
      thisParent     = $(this).closest( '.animation-parent' );
      animationDelay = thisParent.data('animation-delay');
      animationDelay = animationDelay * index;
      $(this).css('animation-delay', animationDelay + 'ms');
    });
  });



    });





  

	
    /*_________________________________ Carousel  ________________________*/

    $("#owl-example").owlCarousel({
      items: 5,
    });
    var owl_blog = $('.wd-gallery-images-holder');
    owl_blog.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
    owl_blog.find('.owl-stage-outer').children().unwrap();


    $('.wd-gallery-images-holder').owlCarousel({
        items: 1,
        nav: true,
        rtl: true,
        margin: 0,
        navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
        autoplay: true,
        autoplayTimeout: 5000,
    });



    /*_________________________________ fields animation  ________________________*/


    (function() {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
            (function() {
                // Make sure we trim BOM and NBSP
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function() {
                    return this.replace(rtrim, '');
                };
            })();
        }

        [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
            // in case the input is already filled..
            if( inputEl.value.trim() !== '' ) {
                classie.add( inputEl.parentNode, 'input--filled' );
            }

            // events:
            inputEl.addEventListener( 'focus', onInputFocus );
            inputEl.addEventListener( 'blur', onInputBlur );
        } );

        function onInputFocus( ev ) {
            classie.add( ev.target.parentNode, 'input--filled' );
        }

        function onInputBlur( ev ) {
            if( ev.target.value.trim() === '' ) {
                classie.remove( ev.target.parentNode, 'input--filled' );
            }
        }
    })();



  // _________________Empty Spaces

  if( $('.wd_empty_space').length ) {

    $('.wd_empty_space').each(function(i, obj) {
      wd_empty_space_padding(this);
    });

    window.addEventListener('resize', function () {
      $('.wd_empty_space').each(function(i, obj) {
        wd_empty_space_padding(this);
      });
    }, true);
  }

  function wd_empty_space_padding(el){
    var $mobile_height = $(el).data("heightmobile"),
      $tablet_height = $(el).data("heighttablet"),
      $desktop_height = $(el).data("heightdesktop");

    if (Modernizr.mq("(max-width: 40em)")) {
      $(el).css("height", $mobile_height);
    } else if (Modernizr.mq("(min-width: 40.063em) and (max-width: 64em)")) {
      $(el).css("height", $tablet_height);
    } else if (Modernizr.mq("(min-width: 64.063em)")) {
      $(el).css("height", $desktop_height);
    }
    $(document).foundation('equalizer', 'reflow');
  }

  //****************** rtl ******************
  function _rtl() {
    if( jQuery('html').attr('dir') == 'rtl' ){
      jQuery('[data-vc-full-width="true"]').each( function(i,v){
        jQuery(this).css('right' , jQuery(this).css('left') ).css( 'left' , 'auto');
      });
      //jQuery('#rev_slider_1_1_wrapper').css('left', '0') ;
    }
  }
  jQuery(document).on('vc-full-width-row', function () {
    _rtl();
  });
  _rtl();

   

});
