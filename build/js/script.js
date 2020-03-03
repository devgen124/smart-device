'use strict';
var html = document.querySelector('html');
var windowWidth = html.clientWidth;
var MOBILE_WIDTH = 767;
var promoBtn = document.querySelector('.button--big');

if (windowWidth < MOBILE_WIDTH) {
  promoBtn.textContent = 'Бесплатная консультация';
}
