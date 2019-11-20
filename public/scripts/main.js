console.log("im working");

// mode switcher
const viewId = document.querySelector('#project');
const toggleMode = document.querySelector('.theme__switch');
const currentMode = localStorage.getItem('theme');

document.body.setAttribute('data-theme', currentMode);

if (viewId) {
  document.body.setAttribute('data-theme', 'light');
} else {
  document.body.setAttribute('data-theme', 'dark');
}

localStorage.setItem('theme', 'dark');
