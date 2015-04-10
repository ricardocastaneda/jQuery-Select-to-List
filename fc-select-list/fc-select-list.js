(function($) {

$.fn.fc_select_list = function(options) {

  // SET VARIABLES
  var settings = $.extend({
    jQuery_animation: false,
    firstOptionLabel: false,
    firstOptionText: '',
    hover: true,
    click: false,
  }, options);

  
  this.each(function() {
    // classes
    if (settings.jQuery_animation ? css3_support = 'jQuery-transition' : css3_support = 'css3-transition');
    if (settings.click ? click_support = 'click-true' : click_support = '');
    if (settings.hover ? hover_support = 'hover-true' : hover_support = 'hover-false');


    var current = $(this);
    var wrapper_classes = 'fc-select-list-wrapper ' + css3_support + ' ' + hover_support + ' ' + click_support;
    var ul_classes = 'fc-select-list ';


    var opt = $(this).find('option');
    var opt_first = opt.eq(0).text();
    var select_id = 'select-' + opt_first;

    // text replacement
    var label_text;
    if (settings.firstOptionText == '' ? label_text = current.prev().text() : opt_first = settings.firstOptionText );

    $('<div class="' + wrapper_classes + '"><h4 class="fc-select-list-selected"><span class="selected-text">' + opt_first + '</span><span class="selected-arrow"></span></h4><ul id="' + select_id + '" class="' + ul_classes + '"></ul></div>').insertAfter(this);
	   
   for (var i = 0; i < opt.length; i++) {
     if ((i == 0) && (settings.firstOptionText != '')) { 
       $('<li class="fc-select-list-item">' + settings.firstOptionText + '</li>').appendTo($(this).next().find('.fc-select-list'));
     } else {
       $('<li class="fc-select-list-item">' + opt.eq(i).text() + '</li>').appendTo($(this).next().find('.fc-select-list'));
     }
   }
    current.hide();



 
  });


	



  z_index(); 
  if (settings.jQuery_animation) {
    jQueryAnimate();
  }
  if (settings.click) { 
    click_slideDown();
  }



  function z_index() {
    $('.fc-select-list-wrapper').each(function() {
      var current = $(this);
      current.hover(
        function() {
          $('.fc-select-list-wrapper').css({'z-index': 40});
          current.css('z-index', 50);
        },
        function() {
          if (current.hasClass('fc-open')) return;
          $('.fc-select-list-wrapper').css({'z-index': 40});
          // $('.fc-select-list-wrapper').filter(function() { return $(this).hasClass() != 'fc-open'; }).css({'z-index': 40});
        }
      );
    });
  }

  function jQueryAnimate() {
    $('.jQuery-transition').each(function() {
      var current = $(this);
      var ul = current.find('.fc-select-list');

      current.hover(
        function() {
          ul.not(':animated').slideDown();
        }, 
        function() {
          if (current.hasClass('fc-open')) return;
          current.css('z-index', 50);
          ul.slideUp(function() {current.css('z-index', 40);});
      });
    });
  }

  function click_slideDown() {
    $(document).on('click', '.selected-arrow', function() {
      var current = $(this);
      var current_parent = current.parents('.fc-select-list-wrapper');
      current_parent.addClass('fc-open');
      var ul = current_parent.find('ul');
      
      //ul.slideDown();
    });

    $(document).on('click', '.fc-open .selected-arrow', function() {
      var current = $(this);
      var current_parent = current.parents('.fc-select-list-wrapper');
      current_parent.removeClass('fc-open');
      var ul = current_parent.find('ul');
      
      //ul.slideUp();
    });

  }

}

  $(document).on('click', '.fc-select-list-item', function() {
    var current = $(this);
    var current_index = current.index();
    var current_text = current.text();
    var current_parent = current.parents('.fc-select-list-wrapper');
    var selected = current_parent.find('.selected-text');  
    selected.text(current_text);
    $('.fc-select-list li').removeClass('opt-selected');	  
    current.addClass('opt-selected');

    var real_select = current_parent.prev();
    real_select.find('option').prop('selected', false);
    real_select.find('option:eq(' + current_index + ')').prop('selected', true);
 console.log(current_index);
  });

  $('.fc-select-list-wrapper').each(function() {
    var closest_select = $(this).prev();
    var selected_initial = closest_select.find('option:selected').text();
    var selected = $(this).find('.selected-text');
    selected.text(selected_initial);
	  
    $(this).find('li').filter(function() {
      return $(this).text() === selected_initial;
     }).addClass('opt-selected');
  });

})(jQuery);
