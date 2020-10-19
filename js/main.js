"use strict";

(function () {
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  window.main = {
    isEscEvent(evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent(evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
