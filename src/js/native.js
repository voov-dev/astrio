function bannerSlider (el) {
  el = document.querySelector(el);

  let loop = false;
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

      arraySlides[activeSlide].setAttribute(`tabindex`, `-1`);
      arraySlides[curretSlide].removeAttribute(`tabindex`, `-1`);

      wrapSlides.style.transform = `translate3d(` + -widthSlide * curretSlide + `px, 0px, 0px)`;
    }

    activeSlide = curretSlide;
  }

  function init() {
    for (let i = 0; i <= amountSlide; i++) {
      arraySlides[i].setAttribute(`tabindex`, `-1`);
    }

    arraySlides[activeSlide].removeAttribute(`tabindex`, `-1`);

    if (!arraySlides[activeSlide].classList.contains(`banner__slide--active`)) {
      arraySlides[activeSlide].classList.add(`banner__slide--active`);
    }

    if (!loop) {
      stateButton();
    }

    btnNext.addEventListener(`click`, () => {
      swipeSlide(next);
    });

    btnPrev.addEventListener(`click`, () => {
      swipeSlide(prev);
    });

  }

  init();
}

document.addEventListener(`DOMContentLoaded`, () => {

  let productItems = document.querySelectorAll(`.product`);
  if (productItems) {
    for (let i = 0; i < productItems.length; i++) {
      let divHeight = productItems[i].querySelector(`.product__head`).offsetHeight;
      productItems[i].querySelector(`.product__clear-area`).style.height = divHeight + `px`;
    }
  }

  let bannerOne = bannerSlider(`.banner`);

});

