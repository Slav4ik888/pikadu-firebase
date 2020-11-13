`use strict`;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9MnwjAPIyziQdi8Z1b_LDiDzqohC1bmQ",
  authDomain: "pikadu-841ee.firebaseapp.com",
  databaseURL: "https://pikadu-841ee.firebaseio.com",
  projectId: "pikadu-841ee",
  storageBucket: "pikadu-841ee.appspot.com",
  messagingSenderId: "899153665286",
  appId: "1:899153665286:web:017a402ecd121a5c115287"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
    
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
const buttonNewPost = document.querySelector(`.button-new-post`);
const addPostElem = document.querySelector(`.add-post`);


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
  //   imageUrl: `./img/no-user-image.png`,
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
        if (handler) {
          handler();
        }
      } else {
        console.log(`Пароль не верный`);
      }
    } else {
      console.log(`Пользователь ${email} не найден`);
    }
  },
  logOut(handler) {
    console.log(`Выход`);
    this.user = null;
    if (handler) {
      handler();
    }
    loginForm.reset();
  },
  editUser(displayName = ``, imageUrl = ``, handler) {
    if (displayName) {
      this.user.displayName = displayName;
    }
    if (imageUrl) {
      this.user.imageUrl = imageUrl;
    }
    console.log('user: ', this.user);
    if (handler) {
      handler();
    }
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
    buttonNewPost.classList.add(`visible`);
  } else {
    loginElem.style.display = ``;
    userElem.style.display = `none`;
    buttonNewPost.classList.remove(`visible`);
    addPostElem.classList.remove(`visible`);
    postsWrap.classList.add(`visible`);
  }
};

const showAddPost = () => {
  postsWrap.classList.remove(`visible`);
  addPostElem.classList.add(`visible`);
};


const setPosts = {
  allPosts: [
    {
      title: `Заголовлок поста`,
      body: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!`,
      tags: [`Свежее`, `Лучшее`, `Горячее`, `Подписки`],
      author: {displayName: `Shabolda`, imageUrl: `http://www.fonstola.ru/download.php?file=201802/1920x1080/fonstola.ru-281791.jpg`},
      date: `11.11.2020, 12:39`,
      likes: 15,
      comments: 3,
    },
    {
      title: `Заголовлок поста`,
      body: `Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!`,
      tags: [`Свежее`, `Горячее`],
      author: {displayName: `Slava`, imageUrl: `./img/avatar.png`},
      date: `09.11.2020, 12:39`,
      imageUrl: `./img/avatar.png`,
      likes: 35,
      comments: 13,
    },
  ],
  addPost(title, text, tags, handler) {

    this.allPosts.unshift({
      title,
      body: text,
      // tags: tags ? tags.split(`,`).map(tag => tag.trim()) : ``,
      tags: tags.split(`,`).map(tag => tag.trim()),
      author: {
        displayName: setUsers.user.displayName,
        imageUrl: setUsers.user.imageUrl,
      },
      date: new Date().toLocaleString(),
      likes: 0,
      comments: 0,
    });
    console.log(this.allPosts);
    if (handler) {
      handler();
    }
  },
};

const showAllPosts = () => {
  postsWrap.classList.add(`visible`);
  addPostElem.classList.remove(`visible`);

  let postHTML = ``;

  setPosts.allPosts.forEach((post) => {
    const { title, body, tags, likes, comments, author: {displayName, imageUrl}, date } = post;
    postHTML += `
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${body}</p>
          <div class="tags">`;
    postHTML += tags && tags.map((tag) => `<a href="#${tag}" class="tag">#${tag}</a>`).join(``);
    postHTML += `</div>
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
                <a href="#" class="author-username">${displayName}</a>
                <span class="post-time">${date}</span>
              </div>
              <a href="#" class="author-link"><img src="${imageUrl || "./img/avatar.png"}" alt="avatar" class="author-avatar"></a>
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

  buttonNewPost.addEventListener(`click`, (e) => {
    e.preventDefault();
    showAddPost();
    
  });
  
  addPostElem.addEventListener(`submit`, e => {
    e.preventDefault();
    const { title, text, tags } = addPostElem.elements;
    console.log(tags, text, title);
    if (title.value.length < 6) {
      alert(`Слишком короткий заголовок`);
      return;
    }
    if (text.value.length < 20) {
      alert(`Слишком короткий пост`);
      return;
    }
    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    
    addPostElem.classList.remove(`visible`);
    addPostElem.reset();
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener(`DOMContentLoaded`, init);

// git add . && git commit -m "3 lesson" && git push origin master
