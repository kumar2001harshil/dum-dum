import '../ts/swiper-bundle';

(function() {
    'use strict';

    function initializeCardSliders() {
        document.querySelectorAll('.card-slider-component').forEach(function(component) {
            var swiper = component.querySelector('.swiper');
            var sliderId = component.getAttribute('id');
            if (swiper && !swiper.swiper) {
              new Swiper(swiper, {
                  slidesPerView: 'auto',
                  navigation: {
                      nextEl: component.querySelector('.swiper-button-next-' + sliderId),
                      prevEl: component.querySelector('.swiper-button-prev-' + sliderId),
                  }
              });
            }
        });
    }

    function initializeShowcaseSliders() {
        document.querySelectorAll('.showcase-slider-component').forEach(function(component) {
            // Desktop
            var imageSwiper = component.querySelector('.image-Swiper');
            var contentSwiper = component.querySelector('.content-Swiper');
            var sliderId = component.getAttribute('id');
            var slidesPerView = parseFloat(component.querySelector('.showcase-slides-per-view').textContent);
            var spaceBetween = parseFloat(component.querySelector('.showcase-space-between').textContent);
            if (imageSwiper && contentSwiper && !imageSwiper.swiper && !contentSwiper.swiper) {
                var contentSwiperInstance = new Swiper(contentSwiper, {
                    slidesPerView: 1,
                    speed: 800,
                    grabCursor: false,
                    allowTouchMove: false,
                    effect: 'fade',
                    centeredSlides: true,
                    spaceBetween: 33,
                    navigation: {
                        nextEl: component.querySelector('.desk-next-' + sliderId),
                        prevEl: component.querySelector('.desk-prev-' + sliderId),
                    }
                });
                var imageSwiperInstance = new Swiper(imageSwiper, {
                    slidesPerView: slidesPerView,
                    speed: 800,
                    longSwipes: false,
                    freeMode: false,
                    slidesPerGroup: 1,
                    allowTouchMove: false,
                    effect: 'slide',
                    centeredSlides: true,
                    spaceBetween: spaceBetween,
                    navigation: {
                        nextEl: component.querySelector('.desk-next-' + sliderId),
                        prevEl: component.querySelector('.desk-prev-' + sliderId),
                    }
                });
                imageSwiperInstance.controller.control = contentSwiperInstance;
                imageSwiperInstance.on('slideChange', function () {
                    imageSwiperInstance.slideTo(imageSwiperInstance.activeIndex);
                });
                imageSwiperInstance.on('click', function () {
                    imageSwiperInstance.slideTo(imageSwiperInstance.clickedIndex);
                });
            }
            // Mobile
            var mobileSwiper = component.querySelector('.case-Swiper');
            if (mobileSwiper && !mobileSwiper.swiper) {
                new Swiper(mobileSwiper, {
                    slidesPerView: 1.1,
                    centeredSlides: true,
                    spaceBetween: 22,
                    navigation: {
                        nextEl: component.querySelector('.mob-next-' + sliderId),
                        prevEl: component.querySelector('.mob-prev-' + sliderId),
                    },
                    breakpoints: {
                        320: { slidesPerView: 1.1, centeredSlides: false, spaceBetween: 22 },
                        480: { slidesPerView: 1.5, centeredSlides: false, spaceBetween: 20 },
                        579: { slidesPerView: 1.1, centeredSlides: false, spaceBetween: 20 },
                        640: { slidesPerView: 1.7, centeredSlides: false, spaceBetween: 22 },
                        768: { slidesPerView: 2, centeredSlides: false, spaceBetween: 22 }
                    }
                });
            }
        });
    }

    function initializeProductSliders() {
        document.querySelectorAll('.product-slider-component').forEach(function(component) {
            var sliderId = component.getAttribute('id');
            var slidesPerView = parseFloat(component.querySelector('.product-slides-per-view').textContent);
            var spaceBetween = parseFloat(component.querySelector('.product-space-between').textContent);
            var mainSlider = new Swiper('.main-slider', {
                slidesPerView: slidesPerView,
                spaceBetween: spaceBetween,
                slidesPerGroup: 1,
                effect: 'slide',
                speed: 800,
                centeredSlides: true,
                breakpoints: {
                    1200: {
                        centeredSlides: false,
                    }
                }
            });

            var leftSlider = new Swiper('.left-slider', {
                slidesPerView: 1,
                effect: 'slide',
                speed: 800,
                navigation: {
                    nextEl: '.swiper-button-next-' + sliderId,
                    prevEl: '.swiper-button-prev-' + sliderId,
                },
            });

            var rightSlider = new Swiper('.right-slider', {
                effect: 'fade',
                slidesPerView: 1,
            });
            // Sync navigation of all sliders
            mainSlider.on('slideChange', function () {
                leftSlider.slideTo(mainSlider.activeIndex);
                rightSlider.slideTo(mainSlider.activeIndex);
            });
            mainSlider.on('click', function () {
                leftSlider.slideTo(mainSlider.clickedIndex);
                rightSlider.slideTo(mainSlider.clickedIndex);
            });

            leftSlider.on('slideChange', function () {
                mainSlider.slideTo(leftSlider.activeIndex);
                rightSlider.slideTo(leftSlider.activeIndex);
            });

            rightSlider.on('slideChange', function () {
                mainSlider.slideTo(rightSlider.activeIndex);
                leftSlider.slideTo(rightSlider.activeIndex);
            });
        });
    }

    function onDomReady(initializeSliders) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeSliders);
        } else {
            initializeSliders();
        }
    }

    if (document.querySelector('.card-slider-component')) {
        onDomReady(initializeCardSliders);
    }

    if (document.querySelector('.product-slider-component')) {
        onDomReady(initializeProductSliders);
    }

    if (document.querySelector('.showcase-slider-component')) {
        onDomReady(initializeShowcaseSliders);
    }

})();
