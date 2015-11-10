$M = {};
(function () {
  $moving = {};

  var move = function (className, targetMarginLeft) {
    var carousels = document.getElementsByClassName(className)[0];
    clearInterval($moving);
    $moving = setInterval(function () {
      var marginLeft = carousels.style.marginLeft;
      marginLeft = parseInt(marginLeft);

      if (isNaN(marginLeft)) {
        if (targetMarginLeft === 0) {
          marginLeft = '0';
          clearInterval($moving);
        } else {
          marginLeft = '-10%';
        }
      } else if (-marginLeft === targetMarginLeft) {
        marginLeft += '%';
        clearInterval($moving);
      } else {
        if (-marginLeft < targetMarginLeft) {
          marginLeft = parseInt(marginLeft) - 10;
          marginLeft += '%';
        } else if (-marginLeft > targetMarginLeft) {
          marginLeft = parseInt(marginLeft) + 10;
          marginLeft += '%';
        }
      }
      carousels.style.marginLeft = marginLeft;

    }, 10);
  };

  var startMove = function (dotClass, imageClass, dotStyleSelect) {

    $('.' + dotClass).each(function (index, item) {
      item.onclick = function () {
        move(imageClass, index * 100);
        $('.' + dotClass).each(function (dotIndex, dot) {
			dot.classList.remove(dotStyleSelect);
        });
        this.classList.add(dotStyleSelect);
      };

    });
  }

  $M.startMove = startMove;

})($M);
