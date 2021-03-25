const input = document.getElementById('input');
const submitBtn = document.getElementById('submit');
const form = document.getElementById('form');
const error = document.getElementById('err');
const shortURL = document.querySelector('.short-section');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('dataBase')
);

let dataBase =
  localStorage.getItem('dataBase') !== null ? localStorageTransactions : [];

let copyBtn;
let shortUrl;

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function generateID() {
  return Math.floor(Math.random() * 1000000);
}

function addToDOM(e) {
  e.preventDefault();

  if (input.value === '') {
    input.classList.add('wrong');
    error.style.display = "block";
  } else {
    let inputValue = input.value;
    postData(inputValue)
      .then(data => {
        console.log(data)
        const values = {
          id: generateID(),
          input: data.result.original_link,
          shortenURL: data.result.full_short_link
        };
        // console.log(data);
        dataBase.push(values);
        shortenLink(values);
        updateLocalStorage();
        input.value = '';
      });
    input.classList.remove('wrong');
    error.style.display = "none";
  }
}

async function postData(url) {
  // Default options are marked with *
  const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  return response.json();
}

// show shortened link to dom
function shortenLink(value) {
  const div = document.createElement('div');
  div.classList.add("shortLink");
  div.innerHTML = `
  <button class="delete-btn" onclick="removeURL(${value.id})">x</button>
  <h4>${value.input}</h4>
  <div class="copy">
    <input type="text" class="shortUrl${value.id}" value="${value.shortenURL}" readonly>
    <button class="copy-btn">Copy</button>
  </div>
  `;
  shortURL.appendChild(div);
  shortUrl = document.querySelectorAll('.shortUrl');
  copyBtn = document.querySelectorAll('.copy-btn');
  copyBtn.forEach(item => {
    item.addEventListener('click', copyButton);
  });
}

// Update local Storage
function updateLocalStorage() {
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
}

// Delete shorten URL
function removeURL(id) {
  dataBase = dataBase.filter(data => data.id !== id);
  updateLocalStorage();
  init();
}

// INIT APP
function init() {
  shortURL.innerHTML = '';
  dataBase.forEach(shortenLink);
}

init();

// Copy Button
function copyButton(e) {
  e.target.innerText = 'Copied';
  const url = e.target.previousElementSibling.className;
  console.log(url);
  e.target.style.backgroundColor = 'hsl(255, 11%, 22%)';
  copyText(url)
}

// Copy Text
function copyText(cla) {
  // Copy Text
  var copyText = document.querySelector("." + cla);
  console.log(copyText);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

// Event Listeners
form.addEventListener('submit', addToDOM);