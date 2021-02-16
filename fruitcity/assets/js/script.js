$(window).on('scroll', function() {
    if ($(window).scrollTop()) {
        $('nav').addClass('blackto');
    } else {
        $('nav').removeClass('blackto');
    }
});


$('.home-img img').mousemove(function(e) {
    var moveX = (e.pageX * -1 / 25);
    var moveY = (e.pageY * -1 / 25);
    $(this).css({
        'transform': 'translate(' + moveX + 'px,' + moveY + 'px)'
    })
});

// ==============================

//plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/
$('.btn-number').click(function(e) {
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function() {
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {

    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }


});
$(".input-number").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
// =============================

// $('.home .home-heading1').mousemove( function(e){
//     var moveX = (e.pageX * -1/25);
//     var moveY = (e.pageY * -1/25);
//     $(this).css({
//         'transform': 'translate('+ moveX +'px,' + moveY + 'px)'
//     })
// });





window.sr = ScrollReveal();

sr.reveal('.home h1', {
    duration: 2000,
    origin: 'left',
    distance: '110px',
    opacity: 0.3,
    delay: 0,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    // rotate: { x: 0, y: 10, z: 0 },
});

sr.reveal('.home h3', {
    duration: 2000,
    origin: 'right',
    distance: '100px',
    delay: 100,
    opacity: 0,
});

sr.reveal('.home p', {
    duration: 2000,
    origin: 'right',
    distance: '100px',
    delay: 200,
    opacity: 0,
});

sr.reveal('.home button', {
    duration: 2000,
    origin: 'right',
    distance: '100px',
    delay: 300,
    opacity: 0,
});

// sr.reveal('.home button', {
// 	duration: 2000,
// 	origin: 'right',
// 	distance: '120px',
// 	delay: 0,
// 	opacity: 0.1,
// 	easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
// });

sr.reveal('.about-heading h1', {
    duration: 1500,
    origin: 'bottom',
    distance: '100px',
    viewFactor: 0.01,
    delay: 0,
    opacity: 0.6,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});

sr.reveal('.about-img img', {
    duration: 1800,
    origin: 'left',
    distance: '300px',
    viewFactor: 0.01,
    delay: 80,
    opacity: 0.6,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});
sr.reveal('.about-content h2', {
    duration: 2000,
    origin: 'left',
    distance: '210px',
    viewFactor: 0.1,
    delay: 0,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});
sr.reveal('.about-content p', {
    duration: 2000,
    origin: 'left',
    distance: '110px',
    viewFactor: 0.1,
    delay: 0,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});
sr.reveal('.about-content button', {
    duration: 2000,
    origin: 'left',
    distance: '110px',
    viewFactor: 0.1,
    delay: 0,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});

sr.reveal('.service-heading h1', {
    duration: 1500,
    origin: 'bottom',
    distance: '100px',
    viewFactor: 0.01,
    delay: 0,
    opacity: 0.6,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});

sr.reveal('.service-left', {
    duration: 2500,
    origin: 'left',
    distance: '210px',
    viewFactor: 0.1,
    delay: 0,
    opacity: 0.7,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});






sr.reveal('.svr1', {
    duration: 2000,
    origin: 'right',
    distance: '80px',
    viewFactor: 0.2,
    delay: 0,
    opacity: 0.1,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});
sr.reveal('.svr2', {
    duration: 2100,
    origin: 'right',
    distance: '90px',
    viewFactor: 0.2,
    delay: 200,
    opacity: 0.1,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});
sr.reveal('.svr3', {
    duration: 2200,
    origin: 'right',
    distance: '100px',
    viewFactor: 0.2,
    delay: 300,
    opacity: 0.1,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});
sr.reveal('.svr4', {
    duration: 2200,
    origin: 'right',
    distance: '110px',
    viewFactor: 0.2,
    delay: 400,
    opacity: 0.1,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});




sr.reveal('.portfolio-heading h1', {
    duration: 1500,
    origin: 'bottom',
    distance: '100px',
    viewFactor: 0.21,
    delay: 0,
    opacity: 0.6,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});




sr.reveal('.contact-heading h1', {
    duration: 1500,
    origin: 'bottom',
    distance: '50px',
    viewFactor: 0.25,
    delay: 0,
    opacity: 0.6,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});

sr.reveal('.contact-heading p', {
    duration: 1500,
    origin: 'bottom',
    distance: '100px',
    viewFactor: 0.25,
    delay: 100,
    opacity: 0.6,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});





sr.reveal('.contact-form', {
    duration: 2500,
    origin: 'bottom',
    distance: '10px',
    viewFactor: 0.25,
    delay: 10,
    scale: 0.8,
    opacity: 0.6,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
});