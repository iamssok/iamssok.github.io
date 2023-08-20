const loginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector("#loginInput");
const greeting = document.querySelector("#greeting");
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.getElementById("todoList");

function login(e) {            
    e.preventDefault();
    loginForm.classList.add("hidden");
    todoForm.classList.remove("hidden");
    const username = loginInput.value;
    greeting.innerText = `Hello, ${username}!`;
}
loginForm.addEventListener("submit", login);

function deleteToDo(e) {
    const li = e.target.parentElement;
    li.remove();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    span.innerText = newTodo;
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    todoList.appendChild(li);
    li.appendChild(span);
    li.appendChild(button);
}

function todoSubmit(e) {
    e.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    paintToDo(newTodo);
}
todoForm.addEventListener("submit", todoSubmit);

const imgs = ["back1","back2","back3","back4","back5","back6","back7","back8"];
const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function updateBack() {
    const imgUrl = imgs[Math.floor(Math.random() * imgs.length)];
    document.body.style.background = `url(./images/${imgUrl}.jpg)`;
}
updateBack();

const clock = document.querySelector("#clock");
const calendar = document.querySelector("#calendar");
function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const days = dayNames[date.getDay()];
    const dates = date.getDate();
    const month = monthNames[date.getMonth()];
    clock.innerHTML = `${hours} <span>:</span> ${minutes}`;
    calendar.innerHTML = `${days} ${dates} ${month}`;
}
getClock();

const weather = document.querySelector("#weather p:first-child");
const city = document.querySelector("#weather p:last-child");
const API_KEY = "7a923370a59929f6858d50f29c1ae4fe";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("You live in", lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);