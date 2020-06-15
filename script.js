const input = document.getElementById('input');
const submitBtn = document.getElementById('submit');
const form = document.getElementById('form');
const error = document.getElementById('err');

form.addEventListener('click', (e) => {
  e.preventDefault();
});

submitBtn.addEventListener('click', (e) => {
  if(input.value === '') {
    console.log("empty");
    input.classList.add('wrong');
    error.style.display = "block";
  } else {
    console.log(input.value);
    input.classList.remove('wrong');
    error.style.display = "none";
  }
});

