import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

// const auth = getAuth();

//ссылка на нашу БД

const appSettings = {
  databaseURL: "https://dailydrive-9c942-default-rtdb.europe-west1.firebasedatabase.app/"
}

// инициализация приложения
const app = initializeApp(appSettings);

// подключение БД
const database = getDatabase(app);

// указываем имя БД с которой будем работать
const salaryInDB = ref(database, "salaryList")

//читаем поля ввода и кнопку

const salaryNameEl = document.getElementById("input-name");
const salaryValueEL = document.getElementById("input-value");
const addButtonEl = document.getElementById("add-button");

//читаем список, который будем менять
const salaryListEl = document.getElementById("salary-list");


// слушаем кнопку
addButtonEl.addEventListener("click", function() {

//получаем данные из поля ввода
  let salaryValue = salaryValueEL.value;
  
//отправляем полученые данные в БД
  push(salaryInDB, salaryValue);
  
//очищаем поле ввода
  clearSalaryPlaseholderEL(salaryValueEL);

})

//получаем данные из БД
onValue(salaryInDB, function(snapshot) {

  if(snapshot.exists()) {

    //получаем данные ключ/значение для каждого элемента
      let salaryValuesArr = Object.entries(snapshot.val());
    
    //очищаем список перед вставкой(иначе продублируется)
      clearSalaryListEL(salaryListEl);
    
    //пробегаем по полученному списку данных
      for (let i = 0; i < salaryValuesArr.length; i++) {
    
    //получаем масси элемента содержащий [0]ключ [1]значение
        let currSalary = salaryValuesArr[i]
    
    //получаем ID элемента
        let currSalaryID = currSalary[0];
    
    //получаем значение эдемента
        let currSalaryValue = currSalary[1];
    
    //вставляем элемент в список
        appendSalaryTosalaryListEl(currSalaryValue, currSalaryID);
        }
  } else {
    salaryListEl.innerHTML = "Нет значений!"
  }
  
}) 


//очистка поля ввода
function clearSalaryPlaseholderEL(clearPlaceholder) {
  clearPlaceholder.value = "";
}

//очистка списка
function clearSalaryListEL(clearList) {
  clearList.innerHTML = "";
}

//вставка нового элемента, чтобы его можно было потом читать из JS
function appendSalaryTosalaryListEl(salaryValue, SalaryID) {

  let newEl = document.createElement("Li"); //создать новый элемент

  newEl.className = "salary_list-el"; //присвоить ему имя класса для CSS

  newEl.textContent = salaryValue; //помещаем текст в новый элемент

  //удаляем из базы данных значения по даблклику

  newEl.addEventListener("dblclick" , function() {
    let exactLocationStoryInDB = ref(database, `salaryList/${SalaryID}`)

    remove(exactLocationStoryInDB)
  })

  salaryListEl.append(newEl); // добавляем элемент в конец блока

}

//определяем размеры экрана (чисто попробовал)

// let screenButt = document.getElementById("screen_button");

// screenButt.addEventListener("click", function() {
//   let blockField = document.getElementById("block-field");
//   let newWindow = document.createElement("div")
//   newWindow.className = "newWindow"
//   newWindow.textContent = `${window.screen.width} x ${window.screen.height}`;
//   blockField.append(newWindow);
//   console.log(newWindow);
// })


// const firebaseConfig = {
//     apiKey: "AIzaSyDvacZY-cX80BTDlUVaeRzVpiAC5tJTcGU",
//     authDomain: "dailydrive-9c942.firebaseapp.com",
//     databaseURL: "https://dailydrive-9c942-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "dailydrive-9c942",
//     storageBucket: "dailydrive-9c942.firebasestorage.app",
//     messagingSenderId: "893889408051",
//     appId: "1:893889408051:web:5b9998657fb15a1a7c8746"
//   };



// const authButt = document.getElementById("auth-button");

// authButt.addEventListener('click', function() {
//   const authName = document.getElementById("auth-name").value;
//   const authPassword = document.getElementById("auth-pass").value;
//   const authMail = document.getElementById("auth-email").value;

//   createUserWithEmailAndPassword(authName, authPassword, authMail)
//   .then((userCredential) => {
//     const user = userCredential.user;

//     alert('User Created');
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     alert(errorMessage)
//   })

//   // alert(`${authName} ${authPassword} ${authMail}`)
// })