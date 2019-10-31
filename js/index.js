/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item");
    var dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


// плавное появление элементов начало

var Revealator = typeof Revealator !== 'undefined' ? Revealator : {};

$(function () {
    Revealator = $.extend({}, {
        timer:           null,
        busy:            false,
        scroll_padding:  0,
        effects_padding: 0,
        refresh:         function () {}
    }, typeof Revealator !== 'undefined' ? Revealator : {});

    Revealator.refresh = function () {
        var $window = $(window);
        var $document = $(document);
        var $body = $(document.body);
        var i = 0;
        var window_top = Revealator.effects_padding;
        var window_bottom = $window.height() - Revealator.effects_padding;
        var document_top = Revealator.scroll_padding;
        var document_bottom = $document.height() - Revealator.scroll_padding;

        if ($window.scrollTop() === 0) {
            if (!$body.hasClass('at-top')) {
                $body.addClass('at-top').removeClass('at-bottom').removeClass('near-top').removeClass('near-bottom');
            }
        } else if ($window.scrollTop() + $window.height() === $document.height()) {
            if (!$body.hasClass('at-bottom')) {
                $body.addClass('at-bottom').removeClass('at-top').removeClass('near-top').removeClass('near-bottom');
            }
        } else if ($window.scrollTop() <= document_top) {
            if (!$body.hasClass('near-top')) {
                $body.addClass('near-top').removeClass('near-bottom').removeClass('at-top').removeClass('at-bottom');
            }
        } else if ($window.scrollTop() + $window.height() >= document_bottom) {
            if (!$body.hasClass('near-bottom')) {
                $body.addClass('near-bottom').removeClass('near-top').removeClass('at-top').removeClass('at-bottom');
            }
        } else {
            if ($body.hasClass('at-top') || $body.hasClass('at-bottom') || $body.hasClass('near-top') || $body.hasClass('near-bottom')) {
                $body.removeClass('at-top').removeClass('at-bottom').removeClass('near-top').removeClass('near-bottom');
            }
        }

        $('*[class*="revealator"]').each(function () {
            i++;
            var element = this;
            var $element = $(element);
            var element_bounding = element.getBoundingClientRect();

            var position_class = undefined;
            if (element_bounding.top > window_bottom && element_bounding.bottom > window_bottom) {
                position_class = 'revealator-below';
            } else if (element_bounding.top < window_bottom && element_bounding.bottom > window_bottom) {
                position_class = 'revealator-partially-below'
            } else if (element_bounding.top < window_top && element_bounding.bottom > window_top) {
                position_class = 'revealator-partially-above'
            } else if (element_bounding.top < window_top && element_bounding.bottom < window_top) {
                position_class = 'revealator-above';
            } else {
                position_class = 'revealator-within';
            }

            if ($element.hasClass('revealator-load') && !$element.hasClass('revealator-within')) {
                $element.removeClass('revealator-below revealator-partially-below revealator-within revealator-partially-above revealator-above');
                $element.addClass('revealator-within');
            }

            if (!$element.hasClass(position_class) && !$element.hasClass('revealator-load')) {
                if ($element.hasClass('revealator-once')) {
                    if (!$element.hasClass('revealator-within')) {
                        $element.removeClass('revealator-below revealator-partially-below revealator-within revealator-partially-above revealator-above');
                        $element.addClass(position_class);
                    }
                    if ($element.hasClass('revealator-partially-above') || $element.hasClass('revealator-above')) {
                        $element.addClass('revealator-within');
                    }
                } else {
                    $element.removeClass('revealator-below revealator-partially-below revealator-within revealator-partially-above revealator-above');
                    $element.addClass(position_class);
                }
            }
        });
    };

    $(window).bind('scroll resize load ready', function () {
        if (!Revealator.busy) {
            Revealator.busy = true;
            setTimeout(function () {
                Revealator.busy = false;
                Revealator.refresh();
            }, 150);
        }
    });
});

// плавное появление элементов окончание
