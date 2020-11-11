`use strict`;
// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
});

const loginElem = document.querySelector(`.login`);
const loginForm = document.querySelector(`.login-form`);
const loginEmail = document.querySelector(`.login-email`);
const loginPassword = document.querySelector(`.login-password`);
const loginForget = document.querySelector(`.login-forget`);
const loginSignin = document.querySelector(`.login-signin`);
const loginSignup = document.querySelector(`.login-signup`);
const userElem = document.querySelector(`.user`);
const userElemName = document.querySelector(`.user-name`);

const listUsers = [
  {
    email: `tek888@mail.ru`,
    password: `qazwsx12`,
    displayName: `Slava`,
  }, {
    email: `korzan.va@mail.ru`,
    password: `qazwsx12`,
    displayName: `Vyacheslav`,
  },
];


const setUsers = {
  user: null,
  signUp(email, password, handler) {
    console.log(`Регистрация`);
    if (!this.getUser(email)) {
      const displayName = email.slice(0, email.indexOf(`@`));
      const newUser = { email, password, displayName };
      console.log('newUser: ', newUser);
      listUsers.push(newUser);
      this.authorizedUser(newUser);
      handler();
    } else {
      alert(`Пользователь с таким email уже зарегистрирован`);
    }
  },
  signIn(email, password, handler) {
    console.log(`Вход`);
    const user = this.getUser(email);
    if (user) {
      if (user.password === password) {
        this.authorizedUser(user);
        handler();
      } else {
        console.log(`Пароль не верный`);
      }
    } else {
      console.log(`Пользователь ${email} не найден`);
    }
  },
  logOut() {
    console.log(`Выход`);

  },
  getUser(email) {
    return listUsers.find(user => user.email === email);
  },
  authorizedUser(user) {
    this.user = user; 
  },
};




const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = `none`;
    userElem.style.display = ``;
    userElemName.textContent = user.displayName;
  } else {
    loginElem.style.display = ``;
    userElem.style.display = `none`;
  }
};



loginSignup.addEventListener(`click`, e => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  setUsers.signUp(email, password, toggleAuthDom);
});

loginForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  setUsers.signIn(email, password, toggleAuthDom);
});



toggleAuthDom();