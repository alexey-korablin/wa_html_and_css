(function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#' + burger.dataset.target);
  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
})();

document.querySelectorAll('#nav li').forEach(function (navEl) {
  navEl.onclick = function () {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll('#nav li');

  navEls.forEach(function (navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add('is-active');
    } else {
      if (navEl.classList.contains('is-active')) {
        navEl.classList.remove('is-active');
      }
    }
  });

  var tabs = document.querySelectorAll('.tab-pane');

  tabs.forEach(function (tab) {
    if (tab.id == targetId) {
      tab.style.display = 'block';
    } else {
      tab.style.display = 'none';
    }
  });
}

// Switching tabs by keyboard actions
const keys = {
  right: 39,
  left: 37,
  home: 36,
  end: 35,
};

const direction = {
  39: 1,
  37: -1,
};

const tabs = document.querySelectorAll('[role="tab"]');
const panes = document.querySelectorAll('.tab-pane');

const keydownEventListener = (event) => {
  const key = event.keyCode;

  switch (key) {
    case keys.right:
    case keys.left:
      switchTabOnKeyDown(event);
      break;
    case keys.home:
    case keys.end:
      event.preventDefault();
      switchTabOnKeyDown(event);
      break;
    default:
      break;
  }
};

tabs.forEach((tab, i) => {
  tab.addEventListener('keydown', keydownEventListener);
  tab.querySelector('button').index = i;
  tab.index = i;
});

const switchTabOnKeyDown = (event) => {
  const target = event.target;
  const keyCode = event.keyCode;
  tabs.forEach((tab) => {
    tab.addEventListener('focus', focusEventHandler);
  });
  if (keys.end === keyCode) {
    focusLastTab();
    return;
  } else if (keys.home === keyCode) {
    focusFirstTab();
    return;
  }
  if (!direction[keyCode]) {
    return;
  }
  if (tabs[target.index + direction[keyCode]]) {
    tabs[target.index + direction[keyCode]].focus();
  } else if (direction[keyCode] > 0) {
    focusFirstTab();
  } else {
    focusLastTab();
  }
};

const focusEventHandler = (event) => {
  target = event.target;
  setTimeout(checkTabFocus, 0, target);
};

const focusLastTab = () => {
  tabs[tabs.length - 1].focus();
};

const focusFirstTab = () => {
  tabs[0].focus();
};

const checkTabFocus = (target) => {
  const focusedElement = document.activeElement;
  if (target === focusedElement) {
    activateTab(target);
  }
};

const activateTab = (tab) => {
  const navEl = tabs[tab.index];
  deactivateTabs();
  navEl.setAttribute('aria-selected', true);
  navEl.classList.add('is-active');
  const control = navEl.dataset.target;
  activatePane(control);
  navEl.focus();
};

const deactivateTabs = () => {
  tabs.forEach((tab) => {
    tab.removeEventListener('focus', focusEventHandler);
    tab.setAttribute('aria-selected', false);
    if (tab.classList.contains('is-active')) {
      tab.classList.remove('is-active');
    }
  });
  deactivatePane();
};

const activatePane = (control) => {
  panes.forEach((pane) => {
    if (pane.id === control) {
      pane.style.display = 'block';
    }
  });
};

const deactivatePane = () => {
  panes.forEach((pane) => (pane.style.display = 'none'));
};
