var Nameinput = document.getElementById('floatingname');
var Emailinput = document.getElementById('floatingEmail');
var Passinput = document.getElementById('floatingPassword');
var signupbtn = document.getElementById('signupbtn');
var messageDiv = document.getElementById('message');
var Accounts = JSON.parse(localStorage.getItem('accounts')) || [];

function isValidName(name) {
  return /^[A-Za-z ]{3,}$/.test(name);
}

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
}

function isValidPassword(password) {
  return /^[A-Za-z0-9]{4,}$/.test(password);
}

function showValidation(input, isValid) {
  if (isValid) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}
function checkemail() {
  for (var i = 0; i < Accounts.length; i++) {
    if (Accounts[i].email.toLowerCase() === Emailinput.value.toLowerCase()) {
      return true;
    }
  }
  return false;
}
function getinput() {
  const nameValid = isValidName(Nameinput.value);
  const emailValid = isValidEmail(Emailinput.value);
  const passValid = isValidPassword(Passinput.value);

  showValidation(Nameinput, nameValid);
  showValidation(Emailinput, emailValid);
  showValidation(Passinput, passValid);

  if (!nameValid || !emailValid || !passValid) return;

  if (checkemail()) {
    Nameinput.classList.remove("is-valid");
    Emailinput.classList.remove("is-valid");
    Passinput.classList.remove("is-valid");

    messageDiv.innerHTML = `<div class="alert alert-danger text-center"> This email is already registered.</div>`;
    return;
  }

  var Accountobj = {
    name: Nameinput.value,
    email: Emailinput.value,
    pass: Passinput.value
  };

  Accounts.push(Accountobj);
  localStorage.setItem('accounts', JSON.stringify(Accounts));
  clearinp();

  Nameinput.classList.remove("is-valid");
  Emailinput.classList.remove("is-valid");
  Passinput.classList.remove("is-valid");
  messageDiv.innerHTML = `<div class="alert alert-success text-center"> Registered successfully.</div>`;
  setTimeout(function () {
      window.location.href = "../index.html";
    }, 1500);
}

function clearinp() {
  Nameinput.value = '';
  Emailinput.value = '';
  Passinput.value = '';
}
signupbtn.addEventListener('click', getinput);
