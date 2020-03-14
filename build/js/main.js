'use strict';

var KeyCode = {
  BACKSPACE: 8,
  ESCAPE: 27,
  ENTER: 13
};

// accordeon

(function () {
  var footer = document.querySelector('.page-footer');
  var cols = footer.querySelectorAll('.page-footer__col');

  footer.classList.remove('page-footer--nojs');

  cols.forEach(function (col) {
    var btn = col.querySelector('.page-footer__toggle');
    var list = col.querySelector('.page-footer__list');
    list.classList.remove('page-footer__list--show');

    btn.addEventListener('click', function () {
      list.classList.toggle('page-footer__list--show');
      btn.classList.toggle('page-footer__toggle--plus');
    });
  });
})();


// validation

(function () {
  var cbSection = document.querySelector('.callback');
  var cbPopup = document.querySelector('.popup');

  function validateCallbackForm(section) {
    var cbForm = section.querySelector('form');
    var telInput = cbForm.querySelector('input[type="tel"]');
    var swap;


    telInput.addEventListener('focus', function () {
      telInput.value = swap || '+7(';
    });

    telInput.addEventListener('input', function () {
      if (telInput.value.match(/\+$|\+7$|\+7\([^\d]/)) {
        telInput.value = '+7('; // не допускает значений '+', '+7' и ввода после скобки нечисловых значений
      }
      if (!telInput.value.match(/\)/)) { // проверка на наличие закрывающей скобки
        if (telInput.value.match(/\+7\(\d+/)) {
          telInput.value = telInput.value.match(/\+7\(\d+/); // записывает в значение поля вводимые числа и блокирует ввод нечисловых значений
        }

        if (telInput.value.match(/\+7\(\d{3}/)) { // добавляет скобку после ввода 3 чисел
          telInput.value += ')';
        }
      } else {
        telInput.value = telInput.value.match(/\+7\(\d{3}\)\d{0,7}/);
      }

      telInput.addEventListener('keydown', function (evt) {
        if (evt.keyCode === KeyCode.BACKSPACE && telInput.value.match(/\+7\(\d{3}\)$/)) { // добавляет возможность удалять закрывающую скобку и число перед ней
          telInput.value = telInput.value.slice(0, -1);
        }
      });

      telInput.addEventListener('change', function () {
        swap = telInput.value;
      });
    });

    telInput.addEventListener('invalid', function () {
      telInput.setCustomValidity('Значение поля должно быть в формате: +7(999)9999999');
    });

  }

  validateCallbackForm(cbSection);
  validateCallbackForm(cbPopup);
})();

// popup

(function () {
  var showButton = document.querySelector('.contacts__btn');
  var popup = document.querySelector('.popup');
  var closeButton = popup.querySelector('.popup__btn');
  var popupForm = popup.querySelector('.popup__form');
  var nameInput = popup.querySelector('input[name="name"]');
  var telInput = popup.querySelector('input[name="tel"]');
  var questionInput = popup.querySelector('textarea');
  var nameStorage = localStorage.getItem('name');
  var telStorage = localStorage.getItem('tel');
  var questionStorage = localStorage.getItem('question');

  function showPopup() {
    popup.classList.remove('visually-hidden');
    document.addEventListener('keydown', onPopupEscPress);
    document.body.style.overflow = 'hidden';
    getStorage();
    setStorage();
  }

  function closePopup() {
    popup.classList.add('visually-hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    document.body.style.overflow = 'auto';
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === KeyCode.ESCAPE) {
      closePopup();
    }
  }

  showButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      showPopup();
    }
  });

  closeButton.addEventListener('click', function () {
    closePopup();
  });

  document.addEventListener('click', function (evt) {
    var isButton = evt.target === showButton;
    var popupIsHidden = popup.classList.contains('visually-hidden');
    var popupWindow = popup.querySelector('.popup__window');
    var isPopup = evt.target === popupWindow || popupWindow.contains(evt.target);

    if (isButton) {
      if (popupIsHidden) {
        showPopup();
      } else {
        closePopup();
      }
    } else if (!isPopup) {
      closePopup();
    }
  });

  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      closePopup();
    }
  });

  function setStorage() {
    popupForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      if (popupForm.checkValidity() || !nameStorage || !telStorage || !questionStorage) {
        localStorage.setItem('name', nameInput.value);
        localStorage.setItem('tel', telInput.value);
        localStorage.setItem('question', questionInput.value);
      }
    });
  }

  function getStorage() {
    if (nameStorage) {
      nameInput.value = nameStorage;
    }
    if (telStorage) {
      telInput.value = telStorage;
    }

    if (questionStorage) {
      questionInput.value = questionStorage;
    }
  }
})();

// scroll

(function () {
  var promoLink = document.querySelector('.promo__link');
  var scrollDownLink = document.querySelector('.promo__scroll-link');

  function scrollToBlock(link) {
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      var blockID = link.getAttribute('href');
      var block = document.querySelector(blockID);

      block.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  scrollToBlock(promoLink);
  scrollToBlock(scrollDownLink);
})();

// element transfer

(function () {
  var html = document.documentElement;
  var DESKTOP_MIN_WIDTH = 1024;
  var termSpan = document.querySelector('.copyright__term');
  var footerIntro = document.querySelector('.page-footer__intro');
  var social = document.querySelector('.page-footer__social');
  var termClone = termSpan.cloneNode(true);

  if (html.clientWidth < DESKTOP_MIN_WIDTH) {
    termSpan.remove();
    footerIntro.insertBefore(termClone, social);
  }
})();
