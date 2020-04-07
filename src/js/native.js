// function bannerSlider (el) {

// }

document.addEventListener(`DOMContentLoaded`, () => {

  let productItems = document.querySelectorAll(`.product`);
  if (productItems) {
    for (let i = 0; i < productItems.length; i++) {
      let divHeight = productItems[i].querySelector(`.product__head`).offsetHeight;
      productItems[i].querySelector(`.product__clear-area`).style.height = divHeight + `px`;
    }
  }

});

