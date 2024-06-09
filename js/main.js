var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var User = []

function issignupEmpty() {
     if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
          return false
     } else {
          return true
     }
}
function issigninEmpty() {
     if (signinEmail.value == "" || signinPassword.value == "") {
          return false
     } else {
          return true
     }
}
function emailalreadyExists() {
     for (var i = 0; i < User.length; i++) {
          if (User[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
               return false
          }
     }
}

if (localStorage.getItem('users') == null) {
     User = []
} else {
     User = JSON.parse(localStorage.getItem('users'))
}
function signUp() {
     if (issignupEmpty() == false) {
          document.getElementById('signupStatus').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
          return false
     }
     var userCred = {
          name: signupName.value,
          email: signupEmail.value,
          password: signupPassword.value,
     }
     if (User.length == 0 && isemailValid(userCred.email) ) {
          User.push(userCred)
          localStorage.setItem('users', JSON.stringify(User))
          document.getElementById('signupStatus').innerHTML = '<span class="text-success m-3">Success</span>'
          window.location.href = '../index.html'
          return true
     }
     if (emailalreadyExists() == false) {
          document.getElementById('signupStatus').innerHTML = '<span class="text-danger m-3">email already exists</span>'

     } else if(isemailValid(userCred.email)) {
          User.push(userCred)
          localStorage.setItem('users', JSON.stringify(User))
          document.getElementById('signupStatus').innerHTML = '<span class="text-success m-3">Success</span>'
          window.location.href = '../index.html'
     } else {
          document.getElementById('signinStatus').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
     }
}
function signIn() {
     if (issigninEmpty() == false) {
          document.getElementById('signinStatus').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
          return false
     }
     if (isemailValid(signinEmail.value)) {
          for (var i = 0; i < User.length; i++) {
               if (User[i].email.toLowerCase() == signinEmail.value.toLowerCase() && User[i].password.toLowerCase() == signinPassword.value.toLowerCase()) {
                    localStorage.setItem('username', User[i].name)
                    window.location.href = './pages/home.html'
               } else {
                    document.getElementById('signinStatus').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
               }
          }
     }
}

var username = localStorage.getItem('username')
if (username) {
     document.getElementById('welcome').innerHTML = "Welcome " + username
}


function logout() {
     localStorage.removeItem('username')
     window.location.href = '../index.html'
}

function isemailValid(email) {
     var pattern = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+')
     return pattern.test(email);
}