// ============================================================slider-js============================================================

$(document).ready(function () {
    // Declare Carousel jquery object
    var owl = $('#mainSlider_custom');

    // Carousel initialization
    owl.owlCarousel({
        loop: true,
        rewind: true,
        autoplay: true,
        margin: 0,
        nav: false,
        dots: true,
        smartSpeed: 600,
        nav: true,
        items: 1
    });


    // add animate.css class(es) to the elements to be animated
    function setAnimation(_elem, _InOut) {
        // Store all animationend event name in a string.
        // cf animate.css documentation
        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        _elem.each(function () {
            var $elem = $(this);
            var $animationType = 'animated ' + $elem.data('animation-' + _InOut);

            $elem.addClass($animationType).one(animationEndEvent, function () {
                $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
            });
        });
    }

// Fired before current slide change
    owl.on('change.owl.carousel', function (event) {
        var $currentItem = $('.owl-item', owl).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-out]");
        setAnimation($elemsToanim, 'out');
    });

// Fired after current slide has been changed
    var round = 0;
    owl.on('changed.owl.carousel', function (event) {

        var $currentItem = $('.owl-item', owl).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-in]");

        setAnimation($elemsToanim, 'in');
    })

    owl.on('translated.owl.carousel', function (event) {
        console.log(event.item.index, event.page.count);

        if (event.item.index == (event.page.count - 1)) {
            if (round < 1) {
                round++
                console.log(round);
            } else {
                owl.trigger('stop.owl.autoplay');
                var owlData = owl.data('owl.carousel');
                owlData.settings.autoplay = true; //don't know if both are necessary
                owlData.options.autoplay = true;
                owl.trigger('refresh.owl.carousel');
            }
        }
    });




    // wpum_field_11 - date birth
    $("input[name='desired_date']").prop('maxlength', 10);
    $("input[name='desired_date']").bind('keyup keypress', function (event) {
        var code = event.keyCode || event.which;
        if (code != 8) {
            var valuebirthday = $(this).val();
            if (valuebirthday.length == 2 || valuebirthday.length == 5) {
                $(this).val($(this).val() + '/');
            }
        }
    });


    <!--======== datepicher-js ========-->
    $("input[name='desired_date']").each(function () {
        $(this).datepicker({
            maxDate: '31/12/2001',
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            autoclose: true,
            orientation: "bottom right",
            yearRange: "1900:2001",
            defaultDate: '1990-01-01'
        });

        $.datepicker.regional['fr'] = {
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
                'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        };

        $.datepicker.setDefaults($.datepicker.regional['fr']);

    });

// currentSize
    $('h1, h2, h3, h4, h5, h6,p,a').not($('.font-enquiries li a')).each(function () {
        var currentSize = $(this).css('font-size');
        $(this).attr('data-fontsize', currentSize);
    });

    var counterclick = 0;

    $('.font-enquiries li a').click(function (event) {
        counterclick++;
        if ($(this).parent('li').hasClass('plus')) {
            if (counterclick <= 3) {
                $('h1, h2, h3, h4, h5, h6,p,a').not($('.font-enquiries li a')).each(function () {
                    var currentSize = $(this).css('font-size');
                    var currentSizePlus = parseFloat(currentSize) * 1.05;
                    $(this).css('font-size', currentSizePlus);
                });
            }
        }
        if ($(this).parent('li').hasClass('minus')) {
            $('h1, h2, h3, h4, h5, h6,p,a').not($('.font-enquiries li a')).each(function () {
                var currentSize1 = $(this).css('font-size');
                var currentSizePlus2 = parseFloat(currentSize1) * 0.95;
                if (currentSize1 <= $(this).attr('data-fontsize')) {
                    $(this).css('font-size', $(this).attr('data-fontsize'));
                    counterclick = 0;
                }
                else {
                    $(this).css('font-size', currentSizePlus2);
                }
            });
        }
        // preventDefault
        event.preventDefault();
    });

    // equal-height
    var height = Math.max($(".services-sidbar").height(), $(".bg-background-full").height());
    $(".services-sidbar").height(height);
    $(".bg-background-full").height(height + 15);
});



// ==================================================================================end-slider==================================================================================

//=================================================== equal-height =====================================================


$.fn.equalHeights = function(){
    var max_height = 0;
    $(this).each(function(){
        max_height = Math.max($(this).height(), max_height);
    });
    $(this).each(function(){
        $(this).height(max_height);
    });
};

$(document).ready(function(){
    $('className').equalHeights();
});


//=================================================== end-equal-height =====================================================

// ==================================================================================counter-section==================================================================================
$('.count').each(function () {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
        duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
// ==================================================================================end-counter-section==================================================================================

// ==================================================================================end-slider-js==================================================================================

$('.servic-content, .box-content-aides, .btn-aides, .hover-effect, .bg-gray, .servic-content-small, .box-gradient, .box-service, .offer-box').hover(function () {
    $(this).toggleClass('animated pulse');
});

new WOW().init();


//============================================================testimonial-slider===================================================================================================
$(document).ready(function () {
    $("#testimonial-slider").owlCarousel({
        loop: true,
        rewind: true,
        autoplay: true,
        margin: 0,
        nav: false,
        dots: true,
        smartSpeed: 1000,
        items: 1
    });
});

$(document).ready(function () {
    $("#testimonial-artical").owlCarousel({
        loop: true,
        rewind: true,
        autoplay: true,
        margin: 0,
        nav: false,
        dots: true,
        smartSpeed: 600,
        items: 1
    });
});


// ================================================================================simulateurs-tabs================================================================================

$("#simulateursTabs>li").click(function () {
    $(this).addClass("done").nextAll().removeClass("done");
    /*$(this).next().addClass("active").nextAll().slice(0).removeClass("active");*/
});

$("[href='#one']").click(function () {
    $(".progress-bar").css("width", "18%");
});
$("[href='#two']").click(function () {
    $(".progress-bar").css("width", "34%");
});
$("[href='#three']").click(function () {
    $(".progress-bar").css("width", "50%");
});
$("[href='#four']").click(function () {
    $(".progress-bar").css("width", "66%");
});
$("[href='#five']").click(function () {
    $(".progress-bar").css("width", "82%");
});
$("[href='#six']").click(function () {
    $(".progress-bar").css("width", "99%");
});


//simulateurs-active
$('.custom-habitez').on('change', function () {
    $(this).closest('label').toggleClass('active');
});


$(".custom-control-radio1").click(function () {
    $(this).addClass("active");
    $(".custom-control-radio2").removeClass("active");
});

$(".custom-control-radio2").click(function () {
    $(this).addClass("active");
    $(".custom-control-radio1").removeClass("active");
});

$(".custom-control-radio-click").click(function () {
    $(".custom-control-radio-click").removeClass("active");
    $(this).addClass("active");

});

//==================================== end-tabing-active ==============================================


//==================================== button-active ==============================================



//==================================== end-button-active ==============================================

// add-class-perents-accoudin
if ($(window).width() < 767) {
    $('.collapse.tab-pane').wrap('<div class="panel"></div>');
} else {
    $('.collapse.tab-pane').unwrap('<div class="panel"></div>');
}
// end-add-class-perents-accoudin


