import{ auth , signInWithEmailAndPassword  } from "../../Utils/utils.js"

const login_email = document.getElementById("floating_email");
const login_password = document.getElementById("floating_password");
const login_user = document.getElementById("login_user");

login_user.addEventListener("click" , ()=>{
  login_user.disable = true;
  login_user.innerText = "Loading...";
    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = "../../index.html"
    alert("Welcome To Our Website")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message + errorCode;
    console.log(errorMessage)
    alert(errorMessage)
    login_user.disable = false;
    login_user.innerText = "Login";
  });
})

