import{ auth , 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  storage ,
  ref ,
  uploadBytes ,
  getDownloadURL ,
  db ,
  setDoc ,
  doc  
} from "../../Utils/utils.js"

import{
    showError
}  from "../../Utils/error.js"
import{
    showSuccess
}  from "../../Utils/success.js"
  // Login
console.log(showError)
console.log(showSuccess)

const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");
const loginUserBtn = document.getElementById("loginBtn");

loginUserBtn.addEventListener("click" , ()=>{
  loginUserBtn.disable = true;
  loginUserBtn.innerText = "Loading...";
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
    // console.log(errorMessage)
    // alert(errorMessage)
    showError(errorMessage)
    loginUserBtn.disable = false;
    loginUserBtn.innerText = "Login";
  });
})

// console.clear();

// SignUp 
const signup_user = document.getElementById("signupBtn");
const user_dp_input = document.getElementById("userProfile");
const user_email = document.getElementById("signupEmail");
const user_password = document.getElementById("SignupPassword");
const user_repeat_password = document.getElementById("signupRepeatPassword");
const user_number = document.getElementById("signPhoneNumber");
const user_first_name = document.getElementById("signupUserName");
const user_last_name = document.getElementById("signupUserLastName");

signup_user.addEventListener("click", async function() {
    let userInfo = {
        user_dp_input: user_dp_input.files[0] ,
        user_first_name: user_first_name.value,
        user_last_name: user_last_name.value,
        user_email: user_email.value,
        user_password: user_password.value,
        user_repeat_password: user_repeat_password.value,
        user_number: user_number.value
    };

    signup_user.disable = false;
    signup_user.innerText = "Loading...";
    
    if(user_dp_input.files[0] && user_first_name.value && user_email.value && user_password.value){
        if(user_password.value === user_repeat_password.value){
            try{
                const userCredential = await createUserWithEmailAndPassword(auth, user_email.value, user_password.value);
                const user = userCredential.user;
                console.log(user.uid);

                const imgRef = ref(storage , `images/${user.uid}`)
                if(user_dp_input.files[0]){
                    //Upload User Image
                    uploadBytes(imgRef , user_dp_input.files[0]).then(()=>{
                        // console.log("Upload Successfull")

                        // Get url For User Upload Photo
                        getDownloadURL(imgRef)
                        .then((url) => {
                            // console.log(url)
                            userInfo.user_dp_input = url

                            //Creat User Document Refrence
                            const userDbRef = doc(db , "users" , user.uid)

                            setDoc(userDbRef , userInfo).then(() => {
                                // console.log("User Object Update In Db");
                                window.location.href = "../../index.html"
                            }).catch(()=>{
                                // console.log("User Object Not Update In Db")
                                signup_user.disable = true;
                                signup_user.innerText = "Sign Up";
                            })

                        }).catch((e) => {
                            showError(e);
                            // console.log(e);
                            signup_user.disable = true;
                            signup_user.innerText = "Sign Up";
                        })
                    })
                }else{
                    showError("Uploading Image Failed")
                    // console.log("Uploading Image Failed")
                    signup_user.disable = true;
                    signup_user.innerText = "Sign Up";
                }
                // alert("Your Account Created")
                showSuccess("Your Account Created");

                
            } catch(error){
                // console.log(error)
                showError(error)
                signup_user.disable = true;
                signup_user.innerText = "Sign Up";
            }
        } else{
            showError("Password Didn't Match")
            signup_user.disable = true;
            signup_user.innerText = "Sign Up";
        }
    }else{
        showError("All fields are required")
        // alert("All fields are required")
        signup_user.disable = true;
        signup_user.innerText = "Sign Up";
    }

    // console.log( "UserInfo=>" , userInfo)
});



// Login And Signup Page Animation

const loginText = document.getElementById('login');
const signupText = document.getElementById('signup');

loginText.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signupText.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupText.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			loginText.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});
