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
        console.log(data)
          localStorage.setItem("data",JSON.stringify(data));

          window.location.href="../templates/Home.html"
document.getElementById("15").id
      },
      error: function(err){
        notification()

      }
  });
  event.preventDefault();
}

function sendSignUpRequest(){
  event.preventDefault();
  let mess = document.getElementById("messagebook")
  let username2 = $('#username2').val();
  let password2 = $('#password2').val();
  let fullname2 =$('#fullname2').val();
  let passwordrp2 = $('#passwordrp2').val();
  

  if(password2===passwordrp2){
    
  let customer = {
    "email": username2,
    "password": password2,
    "name": fullname2

  }
    $.ajax({
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      type: "POST",
      url: `http://localhost:8087/customers/signup`,
      data: JSON.stringify(customer),
      success: function (data) {
        console.log(data);
        showLoginForm();
      },
      error: function(err){
        console.log(err);
      }   
      
    })
  }else {
    notification()
  }
}

function notification(){
  const myTimeout = setTimeout(closeThis, 4000);
  let content = `
                <!-- Danger Alert Message -->
                <div class="container p-5" id="cha">
<div class="row no-gutters">
<div class="col-lg-5 col-md-12">
<div class="alert alert-success fade show" role="alert" style="    top: 620px;
    left: 530px; padding: 20px" >
<button id="close__button" type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="closeThis()">
<span aria-hidden="True">&times;</span>
</button>
<h4 class="alert-heading">Warning!</h4>
<p style="color: white">Invalid username or password.</p>
</div>
</div>
</div>
</div>`
  document.getElementById("note5").innerHTML = content
}
function closeThis(){
  document.getElementById("cha").style.display = "none";
}
