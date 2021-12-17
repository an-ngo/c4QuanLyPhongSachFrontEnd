document.getElementById("logout__button").addEventListener("click", logout);

function logout(){
    alert("logout clicked");
    event.preventDefault;
    localStorage.removeItem("data")
    window.location.href="/login-logout/login.html"
}