'use strict';

var footer = document.querySelector('.page-footer');
var cols = footer.querySelectorAll('.page-footer__col');
// var togglers = footer.querySelectorAll('.page-footer__toggle');
// var lists = footer.querySelectorAll('.page-footer__list');
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

