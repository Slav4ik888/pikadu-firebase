`use strict`;
// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector(`.login`);
const loginForm = document.querySelector(`.login-form`);
const loginEmail = document.querySelector(`.login-email`);
const loginPassword = document.querySelector(`.login-password`);
const loginForget = document.querySelector(`.login-forget`);
const loginSignin = document.querySelector(`.login-signin`);
const loginSignup = document.querySelector(`.login-signup`);
const iconExit = document.querySelector(`.exit`);
const userElem = document.querySelector(`.user`);
const userElemName = document.querySelector(`.user-name`);
const iconEditProfile = document.querySelector(`.edit-profile`);
const editContainer = document.querySelector(`.edit-container`);
const editSubmit = document.querySelector(`.edit-submit`);
const editUsername = document.querySelector(`.edit-username`);
const editFoto = document.querySelector(`.edit-foto`);
const userAvatarElem = document.querySelector(`.user-avatar`);
const postsWrap = document.querySelector(`.posts`);


const listUsers = [
  {
    email: `tek888@mail.ru`,
    password: `qazwsx12`,
    displayName: `Slava`,
    imageUrl: ``,
  }, {
    email: `korzan.va@mail.ru`,
    password: `qazwsx12`,
    displayName: `Vyacheslav`,
    imageUrl: ``,
  },
];


const setUsers = {
  // user: {
  //   email: `tek888@mail.ru`,
  //   password: `qazwsx12`,
  //   displayName: `Slava`,
  // },
  user: null,
  signUp(email, password, handler) {
    console.log(`Регистрация`);

    if (email.trim() === `` || password.trim() === ``) {
      alert(`Введите данные`);
      return;
    }

    if (!regExpValidEmail.test(email)) {
      alert(`Email не валиден`);
      return;
    }

    if (!this.getUser(email)) {
      const displayName = email.slice(0, email.indexOf(`@`));
      const imageUrl = `./img/no-user-image.png`;
      const newUser = { email, password, displayName, imageUrl };
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
    
    if (!regExpValidEmail.test(email)) {
      alert(`Email не валиден`);
      return;
    }
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
  logOut(handle) {
    console.log(`Выход`);
    this.user = null;
    handle();
    loginForm.reset();
  },
  editUser(displayName = ``, imageUrl = ``, handle) {
    if (displayName) {
      this.user.displayName = displayName;
    }
    if (imageUrl) {
      this.user.imageUrl = imageUrl;
    }
    console.log('user: ', this.user);
    handle();
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
    userAvatarElem.src = user.imageUrl || userAvatarElem.src;
  } else {
    loginElem.style.display = ``;
    userElem.style.display = `none`;
  }
};

const setPosts = {
  allPosts: [
    {
      title: `Заголовлок поста`,
      body: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!`,
      tags: [`Свежее`, `Лучшее`, `Горячее`, `Подписки`],
      author: `tek888@mail.ru`,
      date: `11.11.2020, 12:39`,
      imageUrl: `./img/avatar.png`,
      likes: 15,
      comments: 3,
    },
    {
      title: `Заголовлок поста`,
      body: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!`,
      tags: [`Свежее`, `Горячее`],
      author: `korzan.va@mail.ru`,
      date: `09.11.2020, 12:39`,
      imageUrl: `./img/avatar.png`,
      likes: 35,
      comments: 13,
    },
  ],


};

const showAllPosts = () => {
  let postHTML = ``;

  setPosts.allPosts.forEach((post) => {
    const { title, body, tags, likes, comments, author, imageUrl, date } = post;
    postHTML += `
    <section class="post">
      <div class="post-body">
        <h2 class="post-title">${title}</h2>
        <p class="post-text">${body}</p>
        <div class="tags">
        ${tags && tags.map((tag) => `<a href="#" class="tag">#${tag}</a>`).join(``)}
        </div>
      </div>
      <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${likes}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src="${imageUrl}" alt="avatar" class="author-avatar"></a>
          </div>
        </div>
      </section>
    `;
  });
  postsWrap.innerHTML = postHTML;
};

const init = () => {
  // отслеживаем клик по кнопке меню и запускаем функцию 
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  });
  loginSignup.addEventListener(`click`, e => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;

    setUsers.signUp(email, password, toggleAuthDom);
    loginForm.reset();
  });

  loginForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;

    setUsers.signIn(email, password, toggleAuthDom);
  });

  iconEditProfile.addEventListener(`click`, (e) => {
    e.preventDefault();
    editContainer.classList.toggle(`visible`);
    editUsername.value = setUsers.user.displayName;
    // if (!editContainer.closest(`.visible`)) {
    //   editContainer.classList.add(`visible`);
    // } else {
    //   editContainer.classList.remove(`visible`);
    // }
  });

  editSubmit.addEventListener(`click`, e => {
    e.preventDefault();
    setUsers.editUser(editUsername.value, editFoto.value, toggleAuthDom);
    editContainer.classList.remove(`visible`);
  });

  iconExit.addEventListener(`click`, (e) => {
    e.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener(`DOMContentLoaded`, init);

// git add . && git commit -m "2 lesson" && git push origin master
