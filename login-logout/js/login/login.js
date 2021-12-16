document.getElementById("signup_button").addEventListener("click", showSignupForm);
document.getElementById("login_button").addEventListener("click", showLoginForm);


function showSignupForm(){
  event.preventDefault();
  let login = document.getElementById("login_site");
  let signup = document.getElementById("signup_site");
  login.classList.add("fate");
  login.classList.remove("not_fate");
  signup.classList.remove("fate");
  signup.classList.add("not_fate");
}
function showLoginForm(){
  event.preventDefault();
  let login = document.getElementById("login_site");
  let signup = document.getElementById("signup_site");
  signup.classList.add("fate");
  signup.classList.remove("not_fate");
  login.classList.remove("fate");
  login.classList.add("not_fate");
}

function sendRequestLogin(data) {
  let username = $('#username').val();
  let password = $('#password').val();
  let users = {
    "username": username,
    "password": password
  }
  $.ajax({
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      type: "POST",
      url: `http://localhost:8087/authenticate`,
      data: JSON.stringify(users),
      success: function (data) {
          alert("Login successful")
      },
      error: function(err){
          alert("error")
      }
  });
  event.preventDefault();
}
