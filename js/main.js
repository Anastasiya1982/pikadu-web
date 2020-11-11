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
})


// создаем перменные для получения элементов блока логинизации

const loginElem = document.querySelector('.login');
const loginForm=document.querySelector('.login-form');
const emailInput=document.querySelector('.login-email');
const passwordInput=document.querySelector('.login-password');
const loginSignup=document.querySelector('.login-signup');

// получаем элементы блока юзер ( когда зарегистрировался пользователь и вошел)
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

// создаем массив юзеров пока нет базы данных
const listUsers=[
  {
    id:'01',
    email:"mahanasty@mail.com",
    password:'123456',
    displayName:'NastyaJS',
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
  logIn(email, password,handler) {
   const user=this.getUser(email);
   if(user && user.password===password){
     this.autorizedUser(user);
     handler();
   }else{
     alert('Пользователь с такими данными не найден');
   }
  },
  logOut() {
    console.log('logOut')
  },
  signUp(email, password, handler) {

    if (!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }
    if (!this.getUser(email)) {
      // cоздаем юзера чтоб добавить в список
      const user = {email, password, displayName: email}
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
  }
};
// функция переключения авторизации ( меняем login  на user )
const toggleAuthDom =()=>{
  const user = setUsers.user;
  console.log(user);

  if(user){
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};


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
toggleAuthDom();

