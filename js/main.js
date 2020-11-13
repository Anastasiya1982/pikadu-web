const firebaseConfig = {
  apiKey: "AIzaSyBtnDJyhB1kT25IB-Aek0VQ9rveEy19dT8",
  authDomain: "pikadu-web.firebaseapp.com",
  databaseURL: "https://pikadu-web.firebaseio.com",
  projectId: "pikadu-web",
  storageBucket: "pikadu-web.appspot.com",
  messagingSenderId: "381686327212",
  appId: "1:381686327212:web:e8c22a6ccc455ec3d5bc09"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);

// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию

const regExpValidEmail=/^\w+@\w+\.\w{2,}$/;//  валидация для емейла  регулярным выражением
// создаем перменные для получения элементов блока логинизации

const loginElem = document.querySelector('.login');
const loginForm=document.querySelector('.login-form');
const emailInput=document.querySelector('.login-email');
const passwordInput=document.querySelector('.login-password');
const loginSignup=document.querySelector('.login-signup');

// получаем элементы блока юзер ( когда зарегистрировался пользователь и вошел)
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem=document.querySelector('.exit');
const editElem=document.querySelector('.edit');
const editContainer=document.querySelector('.edit-container');
const editUsername=document.querySelector('.edit-username');
const editPhotoUrl=document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
// добавление постов
const buttonNewPost=document.querySelector('.button-new-post');
const addPostElem=document.querySelector('.add-post');


const postsWrapper=document.querySelector('.posts');
// создаем массив юзеров пока нет базы данных
const listUsers=[
  {
    id:'01',
    email:"mahanasty@mail.com",
    password:'123456',
    displayName:'NastyaJS',
    photo: 'https://avatarko.ru/img/kartinka/8/zhivotnye_sobaka_7950.jpg',
  },
  {
    id:'02',
    email:"katerol@mail.com",
    password:'789555',
    displayName:'KillKate',

  },
  {
    id:'03',
    email:"maksLeskin@mail.com",
    password:'112255',
    displayName:'MaksJS',
  }
];


const setUsers= {
  user: null,
  //добавляем методы
  // войти авторизованному пользователю
  logIn(email, password,handler) {
    if(!regExpValidEmail.test(email)) {
      alert('email не валиден');
      return;
    }

   const user=this.getUser(email);
   if(user && user.password===password){
     this.autorizedUser(user);
     handler();
   }else{
     alert('Пользователь с такими данными не найден');
   }
  },
  logOut(handler) {
    this.user=null;
    if(handler){
      return handler();
    }
  },
  //регистрация
  signUp(email, password, handler) {

    if (!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }
    if (!regExpValidEmail.test(email)) {
      alert('email не валиден');
      return;
    }
    if (!this.getUser(email)) {
      // cоздаем юзера чтоб добавить в список
      const user = {email, password, displayName: email.substring(0,email.indexOf('@'))};
      listUsers.push(user);// добавляем юзера
      this.autorizedUser(user);// авторизация
      handler();// функция toggleAuthDom  при авторизации меняются блоки
    } else {
      alert("Пользователь с таким email уже зарегистрирован");
    }
  },
  getUser(email) {
    let user = null;
    // получаем данные каждого объекта  и сверяем
    //   for(let i = 0; i <listUsers.length; i++){
    //     if(listUsers[i].email === email){
    //       user =listUsers[i];
    //       break;
    //     }
    //   }
    //   return user;

    // другой способ с помощью findб упрощаем код
    return listUsers.find((item)=>item.email===email)
  },
  autorizedUser(user){
    this.user=user;
  },
  editUser(userName, userPhoto,handler) {
    if(userName){
      this.user.displayName=userName;
    }
    if(userPhoto){
      this.user.photo=userPhoto;
    }
    handler();
  },
};
// функция переключения авторизации ( меняем login  на user )

const setPosts={
  allPost:[
    {
      title:"Заголовок поста 1",
      text:"Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего егo снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что ведущими о решила одна алфавит!",
      tags:['свежее', 'новое', 'горячее','vjt'],
      author:{displayName:"Nataly",photo:"https://img.fireden.net/ic/image/1587/19/1587198566799.png"},
      date:"11.11.2020, 22:54:00",
      like:45,
      comments:20,
    },
    {
      title:"Заголовок поста 2",
      text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequuntur dolores hic itaque iure labore magnam nobis quo sit vitae? Accusantium, animi consectetur corporis deserunt dignissimos, ea error, impedit maxime molestiae mollitia nam nemo placeat quas qui tempora vitae voluptate. Aliquam commodi corporis culpa deleniti, doloremque eum eveniet facere ipsum iste laborum maxime, modi nulla pariatur ratione saepe sit tempora",
      tags:['свежее', 'новое', 'горячее','vjt' ],
      author:{displayName: "Kate",photo: 'https://avatarko.ru/img/kartinka/8/zhivotnye_sobaka_7950.jpg'},
      date:"10.11.2020, 18:54:00",
      comments:10,
      like:15,
    }
  ],

  addPost(title,text,tags,handler){
    const newPost={
      title:title,
      text:text,
      tags:tags.split(',').map(item=>item.trim()),
      author:{
        displayName:setUsers.user.displayName,
        photo:setUsers.user.photo
      },
      date: new Date().toLocaleString(),
      like:0,
      comments:0,
    }
    this.allPost.unshift(newPost);

    if(handler){
      return handler();
    }
  }
};


const toggleAuthDom =()=>{
  const user = setUsers.user;
  console.log(user);

  if(user){
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
    }
};

const showAddPost=()=>{
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}

const showAllPosts=()=>{


  let postsTML = "";

  setPosts.allPost.forEach((post) => {

    const { title, text, date,comments, like, author, tags } = post;

    postsTML += `
         <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text} </p>
        <div class="tags"> 
        ${tags.map((tag) =>`<a href="#${tag}" class="tag">#${tag}</a>`)}         
        </div>         
        </div>       
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${like}</span>
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
              <a href="#" class="author-username">${author.displayName}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src="img/avatar1.jpeg" alt="avatar" class="author-avatar"></a>
          </div>
         
        </div>
      
      </section>    
    `
  })

    postsWrapper.innerHTML = postsTML;
  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
}

document.addEventListener('DOMContentLoaded',()=>{
  init();
})


const init=()=>{
  loginForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const emailValue=emailInput.value;
    const passwordValue=passwordInput.value;
    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  })


  loginSignup.addEventListener('click',(event)=>{
    event.preventDefault();

    const emailValue=emailInput.value;
    const passwordValue=passwordInput.value;

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();

  })
  exitElem.addEventListener('click',event=> {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });

  editElem.addEventListener("click",event=>{
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value=setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', event=>{
    event.preventDefault();

    setUsers.editUser(editUsername.value,editPhotoUrl.value,toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню
    menu.classList.toggle('visible');
  })
  //добавление на кнопку
  buttonNewPost.addEventListener('click', (event)=>{
    event.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit',event=>{
    event.preventDefault();
    const formElements=addPostElem.elements;
    console.log(formElements);
    const { title, text, tags } = formElements;
    console.log(title, text, tags)

    if(title.value.length<6){
      alert('Слишком короткий заголовок');
      return
    }

    if(text.value.length<10){
      alert('Слишком короткий заголовок');
      return;
    }

    setPosts.addPost(title.value,text.value,tags.value, showAllPosts);
       addPostElem.classList.remove('visibe');
       addPostElem.reset();
  })
  showAllPosts();
  toggleAuthDom();
}


