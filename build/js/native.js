"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Вычисляю высоту карточки и задаю высоту для блока пустшки `.product__clear-area`
  var productItems = document.querySelectorAll(".product");

  if (productItems) {
    for (var i = 0; i < productItems.length; i++) {
      var divHeight = productItems[i].querySelector(".product__head").offsetHeight;
      productItems[i].querySelector(".product__clear-area").style.height = divHeight + "px";
    }
  } // Реализация слайдера


  function bannerSlider(el) {
    var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var play = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3000;
    el = document.querySelector(el);
    var arraySlides = el.querySelectorAll(".banner__slide");
    var amountSlide = arraySlides.length - 1;
    var activeSlide = 0;
    var curretSlide = 0;
    var wrapSlides = el.querySelector(".banner__wrapper");
    var widthSlide = arraySlides[0].offsetWidth;
    var btnPrev = el.querySelector(".banner__button.banner__button--prev");
    var btnNext = el.querySelector(".banner__button.banner__button--next");
    var next = 1;
    var prev = -1;
    var autoPlayIndex;

    function stateButton() {
      if (curretSlide === 0) {
        if (!btnPrev.classList.contains("banner__button--disabled")) {
          btnPrev.classList.add("banner__button--disabled");
          btnPrev.setAttribute("tabindex", "-1");
        }
      } else if (btnPrev.classList.contains("banner__button--disabled")) {
        btnPrev.classList.remove("banner__button--disabled");
        btnPrev.removeAttribute("tabindex", "-1");
      }

      if (curretSlide === amountSlide) {
        if (!btnNext.classList.contains("banner__button--disabled")) {
          btnNext.classList.add("banner__button--disabled");
          btnNext.setAttribute("tabindex", "-1");
        }
      } else if (btnNext.classList.contains("banner__button--disabled")) {
        btnNext.classList.remove("banner__button--disabled");
        btnNext.removeAttribute("tabindex", "-1");
      }
    }

    function swipeSlide(direction) {
      curretSlide += direction;

      if (loop) {
        if (curretSlide < 0) {
          curretSlide = amountSlide;
        }

        if (curretSlide > amountSlide) {
          curretSlide = 0;
        }
      } else {
        if (curretSlide < 0) {
          curretSlide = 0;
        }

        if (curretSlide > amountSlide) {
          curretSlide = amountSlide;
        }

        stateButton();
      }

      if (curretSlide !== activeSlide) {
        arraySlides[activeSlide].classList.remove("banner__slide--active");
        arraySlides[curretSlide].classList.add("banner__slide--active");
        wrapSlides.style.transform = "translate3d(" + -widthSlide * curretSlide + "px, 0px, 0px)";
      }

      activeSlide = curretSlide;
    }

    function startAutoSwipe() {
      autoPlayIndex = setInterval(function () {
        return swipeSlide(next);
      }, duration);
      el.addEventListener("mouseenter", stopAutoSwipe);
      el.removeEventListener("mouseleave", startAutoSwipe);
    }

    function stopAutoSwipe() {
      clearInterval(autoPlayIndex);
      el.removeEventListener("mouseenter", stopAutoSwipe);
      el.addEventListener("mouseleave", startAutoSwipe);
    }

    function init() {
      if (!arraySlides[activeSlide].classList.contains("banner__slide--active")) {
        arraySlides[activeSlide].classList.add("banner__slide--active");
      }

      if (!loop) {
        stateButton();
      }

      if (play) {
        startAutoSwipe();
      }

      btnNext.addEventListener("click", function () {
        return swipeSlide(next);
      });
      btnPrev.addEventListener("click", function () {
        return swipeSlide(prev);
      });
    }

    init();
  }

  bannerSlider(".banner.demo-1");
  bannerSlider(".banner.demo-2", true);
  bannerSlider(".banner.demo-3", true, true);
});