document.getElementById("logout__button").addEventListener("click", logout);

function logout(){
    event.preventDefault;
    localStorage.removeItem("data")
    window.location.href="../login-logout/login.html"
}