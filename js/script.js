const body = document.body;
const html = document.documentElement;

// Отключение / включение скролла на странице
const bodyScrollControls = {
  scrollBarWidth: window.innerWidth - body.clientWidth,

  disable() {
    body.style.marginRight = `${this.scrollBarWidth}px`;
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      body.style.marginRight = null;
    }
    html.classList.add('stop-scroll');
  },

  enable() {
    body.style.marginRight = null;
    html.classList.remove('stop-scroll');
  }
}

// Anchors

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// Burger

let menu = document.querySelector(".menu");
let burger = document.querySelector(".burger");
let menuCloseBtn = document.querySelector(".menu__close");
let menuLinks = document.querySelectorAll(".nav__link");
let login = document.querySelector(".login");

burger.addEventListener('click', function () {

  menu.classList.add('menu--active');

  bodyScrollControls.disable();
})

menuCloseBtn.addEventListener('click', function () {

  menu.classList.remove('menu--active');

  bodyScrollControls.enable();
})

menuLinks.forEach(function (elLinks) {
  elLinks.addEventListener('click', function () {

    menu.classList.remove('menu--active');

    bodyScrollControls.enable();
  })
})

login.addEventListener('click', () => {
  menu.classList.remove('menu--active');

  bodyScrollControls.enable();
})

// Searchbox

let searchBtn = document.querySelector(".header-top__search-btn");
let searchbox = document.querySelector(".searchbox");
let searchCloseBtn = document.querySelector(".searchbox__close");

searchBtn.addEventListener('click', function () {

  searchbox.classList.add('searchbox--active');

  searchBtn.classList.add('header-top__search-btn--disabled');
})

searchCloseBtn.addEventListener('click', function () {

  searchbox.classList.remove('searchbox--active');

  searchBtn.classList.remove('header-top__search-btn--disabled');
})

document.addEventListener('click', (e) => {
  const withinBoundaries1 = e.composedPath().includes(searchBtn);
  const withinBoundaries2 = e.composedPath().includes(searchbox);

  if (!withinBoundaries1 && !withinBoundaries2) {

    searchbox.classList.remove('searchbox--active');

    searchBtn.classList.remove('header-top__search-btn--disabled');
  }
})


// Subnav

const btns = document.querySelectorAll(".subnav__btn");
const dropdowns = document.querySelectorAll(".dropdown");
const activeClassdropdowns = "dropdown--is-active";
const activeClassbtns = "subnav__btn--is-active";

btns.forEach(item => {
  item.addEventListener("click", function () {
    let DropThis = this.parentElement.querySelector(".dropdown");
    dropdowns.forEach(el => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns)
      }
    });
    btns.forEach(el => {
      if (el != this) {
        el.classList.remove(activeClassbtns)
      }
    });
    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);

    document.addEventListener('click', (drop) => {
      const withinBoundaries3 = drop.composedPath().includes(this);
      const withinBoundaries4 = drop.composedPath().includes(DropThis);

      if (!withinBoundaries3 && !withinBoundaries4) {

        DropThis.classList.remove(activeClassdropdowns);
        this.classList.remove(activeClassbtns);
      }
    });
  });
})


// Subnav Simplebar

document.querySelectorAll('.dropdown__simplebar').forEach(el => {
  new SimpleBar(el), {
    autoHide: false
  }
});


// Hero Swiper

const swiper1 = new Swiper('.swiper', {
  autoHeight: true,
  direction: 'vertical',
  slidesPerView: 1,
  loop: false,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  centeredSlides: true,
  rewind: true,
  speed: 1500,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
});


// Select

const element = document.querySelector('.gallery__select');
const choices = new Choices(element, {
  searchEnabled: false,
  placeholder: true,
  shouldSort: false,
  labelId: 'gallery__filter',
  classNames: {
    selectedState: 'is-selected',
  }
});


// Gallery Swiper

const swiper2 = new Swiper('.swiper_gallery', {
  autoplay: false,
  loop: false,
  effect: 'slide',

  breakpoints: {
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    },

    1281: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34
    },

    577: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 38
    },

    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0
    },
  },

  // Pagination
  pagination: {
    el: '.gallery__pagination',
    type: "fraction",
  },

  // Navigation
  navigation: {
    nextEl: '.gallery__next',
    prevEl: '.gallery__prev',
  },

  // Accessibility
  a11y: {
    itemRoleDescriptionMessage: 'Изображение галереи',
    firstSlideMessage: 'Первое изображение',
    lastSlideMessage: 'Последнее изображение',
    prevSlideMessage: 'Листать назад',
    nextSlideMessage: 'Листать дальше',
    paginationBulletMessage: 'Перейти к слайду {{index}}'
  },
});


// Pop Up

let gallerySlide = document.querySelectorAll(".gallery__slide");
let galleryPopup = document.querySelectorAll(".popup");
let galleryCloseBtn = document.querySelector(".popup__close");
let overlay = document.querySelector(".overlay")

gallerySlide.forEach(function (elGalleryslide) {
  elGalleryslide.addEventListener('click', function (gal) {
    const path = gal.currentTarget.dataset.path;

    document.querySelector(`[data-target="${path}"]`).classList.add('popup--active');

    overlay.classList.add('overlay--active');

    bodyScrollControls.disable();


    galleryCloseBtn.addEventListener('click', function () {

      document.querySelector(`[data-target="${path}"]`).classList.remove('popup--active');

      overlay.classList.remove('overlay--active');

      bodyScrollControls.enable();
    });


    overlay.addEventListener('click', function () {

      document.querySelector(`[data-target="${path}"]`).classList.remove('popup--active');

      overlay.classList.remove('overlay--active');

      bodyScrollControls.enable();
    })

  })
})


// Accordion

$(function () {
  $("#accordion").accordion({
    collapsible: true,
    active: false,
    heightStyle: "content"
  });
});


// Tabs
let tabsBtn = document.querySelectorAll('.accordion-content__tab');
let tabsItem = document.querySelectorAll('.catalog__item');

tabsBtn.forEach(function (element) {
  element.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function (btn) { btn.classList.remove('accordion-content__tab--active') });
    e.currentTarget.classList.add('accordion-content__tab--active');

    tabsItem.forEach(function (element) { element.classList.remove('catalog__item--active') });
    document.querySelector(`[data-target="${path}"]`).classList.add('catalog__item--active');

    if ($(window).width() <= 768) {
      document.querySelector('.catalog__item--active').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  });
});


// Events Swiper

const swiper3 = new Swiper('.swiper_events', {
  autoplay: false,
  loop: false,
  effect: 'slide',

  navigation: {
    nextEl: '.events__next',
    prevEl: '.events__prev',
  },

  pagination: {
    el: '.events__pagination',
    type: 'bullets',
    clickable: 'true'
  },

  breakpoints: {
    1281: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    },

    993: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27
    },

    577: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34
    },

    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0
    },
  },

  // Accessibility
  a11y: {
    itemRoleDescriptionMessage: 'Событие',
    firstSlideMessage: 'Первое событие',
    lastSlideMessage: 'Последнее событие',
    prevSlideMessage: 'Листать назад',
    nextSlideMessage: 'Листать дальше',
    paginationBulletMessage: 'Перейти к слайду {{index}}'
  },
});


// Partners Swiper

const swiper4 = new Swiper('.swiper_partners', {
  autoplay: false,
  loop: false,
  effect: 'slide',

  navigation: {
    nextEl: '.partners__next',
    prevEl: '.partners__prev',
  },

  breakpoints: {
    1281: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    },

    993: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50
    },

    577: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34
    },

    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0
    },
  },

  // Accessibility
  a11y: {
    itemRoleDescriptionMessage: 'Логотип партнера',
    firstSlideMessage: 'Первый партнер',
    lastSlideMessage: 'Последний партнер',
    prevSlideMessage: 'Листать назад',
    nextSlideMessage: 'Листать дальше',
    paginationBulletMessage: 'Перейти к слайду {{index}}'
  },
});


// Inputmask
var selector = document.getElementById("phone");

var im = new Inputmask("+7 (999) 999-99-99");
im.mask(selector);


// Form Submit

let validateForms = function (selector, rules, successModal, yaGoal) {
  new window.JustValidate(selector, {
    rules: rules,
    submitHandler: function (form) {
      let formData = new FormData(form);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      form.reset();
    }
  })
}

// Form validation

const validation = new JustValidate('#form', {
  errorFieldCssClass: 'is-invalid',
  errorLabelCssClass: 'is-label-invalid',
  errorLabelStyle: {
    color: '#d11616',
  },
});

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Слишком короткое имя',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Слишком длинное имя',
    },
  ])
  .addField('#phone', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      validator: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return phone.length === 10
      },
      errorMessage: 'Введите 10 символов',
    },
  ]);





// Map
ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.75846806898367, 37.60108849999989],
    zoom: 14,
    controls: [],
  }, {
    suppressMapOpenBlock: true
  });

  myMap.controls.add('zoomControl', {
    size: 'small',
    float: 'none',
    position: {
      bottom: '420px',
      right: '10px'
    }
  });

  myMap.controls.add('geolocationControl', {
    float: 'right',
    position: {
      bottom: '370px',
      right: '10px'
    }
  });

  myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {
    hintContent: 'Шоурум №4',
    balloonContent: 'Леонтьевский переулок, дом 5/1'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'img/pin.svg',
    iconImageSize: [20, 20],
  });

  myMap.geoObjects.add(myPlacemark);
}
