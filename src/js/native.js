document.addEventListener(`DOMContentLoaded`, () => {

  // Вычисляю высоту карточки и задаю высоту для блока пустшки `.product__clear-area`
  let productItems = document.querySelectorAll(`.product`);
  if (productItems) {
    for (let i = 0; i < productItems.length; i++) {
      let divHeight = productItems[i].querySelector(`.product__head`).offsetHeight;
      productItems[i].querySelector(`.product__clear-area`).style.height = divHeight + `px`;
    }
  }

  // Реализация слайдера
  function bannerSlider (el, loop = false, play = false, duration = 3000) {
    el = document.querySelector(el);
    let arraySlides = el.querySelectorAll(`.banner__slide`);
    let amountSlide = arraySlides.length - 1;
    let activeSlide = 0;
    let curretSlide = 0;
    let wrapSlides = el.querySelector(`.banner__wrapper`);
    let widthSlide = arraySlides[0].offsetWidth;
    let btnPrev = el.querySelector(`.banner__button.banner__button--prev`);
    let btnNext = el.querySelector(`.banner__button.banner__button--next`);
    let next = 1;
    let prev = -1;
    let autoPlayIndex;

    function stateButton() {
      if (curretSlide === 0) {
        if (!btnPrev.classList.contains(`banner__button--disabled`)) {
          btnPrev.classList.add(`banner__button--disabled`);
          btnPrev.setAttribute(`tabindex`, `-1`);
        }
      } else if (btnPrev.classList.contains(`banner__button--disabled`)) {
        btnPrev.classList.remove(`banner__button--disabled`);
        btnPrev.removeAttribute(`tabindex`, `-1`);
      }

      if (curretSlide === amountSlide) {
        if (!btnNext.classList.contains(`banner__button--disabled`)) {
          btnNext.classList.add(`banner__button--disabled`);
          btnNext.setAttribute(`tabindex`, `-1`);
        }
      } else if (btnNext.classList.contains(`banner__button--disabled`)) {
        btnNext.classList.remove(`banner__button--disabled`);
        btnNext.removeAttribute(`tabindex`, `-1`);
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
        arraySlides[activeSlide].classList.remove(`banner__slide--active`);
        arraySlides[curretSlide].classList.add(`banner__slide--active`);

        wrapSlides.style.transform = `translate3d(` + -widthSlide * curretSlide + `px, 0px, 0px)`;
      }

      activeSlide = curretSlide;
    }

    function startAutoSwipe() {
      autoPlayIndex = setInterval(() => swipeSlide(next), duration);
      el.addEventListener(`mouseenter`, stopAutoSwipe);
      el.removeEventListener(`mouseleave`, startAutoSwipe);
    }

    function stopAutoSwipe() {
      clearInterval(autoPlayIndex);
      el.removeEventListener(`mouseenter`, stopAutoSwipe);
      el.addEventListener(`mouseleave`, startAutoSwipe);
    }

    function init() {
      if (!arraySlides[activeSlide].classList.contains(`banner__slide--active`)) {
        arraySlides[activeSlide].classList.add(`banner__slide--active`);
      }

      if (!loop) {
        stateButton();
      }

      if (play) {
        startAutoSwipe();
      }

      btnNext.addEventListener(`click`, () => swipeSlide(next));
      btnPrev.addEventListener(`click`, () => swipeSlide(prev));
    }

    init();
  }

  bannerSlider(`.banner.demo-1`);
  bannerSlider(`.banner.demo-2`, true);
  bannerSlider(`.banner.demo-3`, true, true);
});

