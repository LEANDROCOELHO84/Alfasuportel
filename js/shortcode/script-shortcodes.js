jQuery(document).ready(function($) {

  "use strict";

  $(document).foundation();

// COUNT UP
    var datafile = $('.wd-fucts .number').data('file');
    $('.wd-fucts .number').counterUp({
        delay: 10,
        time: datafile
    });
// END COUNT UP



    $('.circular-item-style-1').appear();
    $(document.body).on('appear', '.circular-item-style-1', function() {
    	
        // Radial progress bar
        var easy_pie_chart = {};
        $('.circular-item-style-1').removeClass("hidden");
        $('.circular-pie-style-1').each(function() {
            $(this).easyPieChart(jQuery.extend(true, {}, easy_pie_chart, {
                size: 220,
                animate: 2000,
                lineWidth: 2,
                lineCap: 'square',
                barColor: $(this).data('color'),
                lineWidth: 4,
                scaleColor: false,
                barColor: '#2980b9',
                trackColor: '#DAD9DB',


                onStep: function(from, to, percent) {
                    this.el.children[0].innerHTML = Math.round(percent) + '%';
                }
            }));
        });
    });


	
    $('.circular-item-style-2').appear();
    $(document.body).on('appear', '.circular-item-style-2', function() {

        // Radial progress bar
        var easy_pie_chart = {};
        $('.circular-item-style-2').removeClass("hidden");
        $('.circular-pie-style-2').each(function() {
            $(this).easyPieChart(jQuery.extend(true, {}, easy_pie_chart, {
                size: 220,
                animate: 2000,
                lineWidth: 42,
                lineCap: 'square',
                barColor: $(this).data('color'),
                lineWidth: 24,
                scaleColor: false,
                barColor: '#2980b9',
                trackColor: 'transparent',
                onStep: function(from, to, percent) {
                    this.el.children[0].innerHTML = Math.round(percent) + '%';
                }
            }));
        });
    });



    $('.circular-item-style-3').appear();
    $(document.body).on('appear', '.circular-item-style-3', function() {

        // Radial progress bar
        var easy_pie_chart = {};
        $('.circular-item-style-3').removeClass("hidden");
        $('.circular-pie-style-3').each(function() {
            $(this).easyPieChart(jQuery.extend(true, {}, easy_pie_chart, {
                size: 220,
                animate: 2000,
                lineWidth: 42,
                lineCap: 'square',
                barColor: $(this).data('color'),
                lineWidth: 24,
                scaleColor: false,
                barColor: '#2980b9',
                trackColor: '#DAD9DB',
                onStep: function(from, to, percent) {
                    this.el.children[0].innerHTML = Math.round(percent) + '%';
                }
            }));
        });
    });


   var jQuerywindow = $(window);
 
   $('.parallax').each(function(){
     var jQueryscroll = $(this);

      $(window).scroll(function() {                           
        var yPos = -(jQuerywindow.scrollTop() / jQueryscroll.data('speed'));
        var coords = '50% '+ yPos + 'px';
        jQueryscroll.css({ backgroundPosition: coords });   
      });
   });
});



