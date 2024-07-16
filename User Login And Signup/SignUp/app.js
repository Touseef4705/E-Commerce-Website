import { auth , 
    createUserWithEmailAndPassword ,
    storage ,
    ref ,
    uploadBytes ,
    getDownloadURL ,
    db ,
    setDoc ,
    doc} from "../../Utils/utils.js"

const signup_user = document.getElementById("user_signup_btn");
const user_dp_input = document.getElementById("user_dp_input");
const user_email = document.getElementById("floating_email");
const user_password = document.getElementById("floating_password");
const user_repeat_password = document.getElementById("floating_repeat_password");
const user_number = document.getElementById("floating_phone");
const user_first_name = document.getElementById("floating_first_name");
const user_last_name = document.getElementById("floating_last_name");

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
                            console.log(e);
                            signup_user.disable = true;
                            signup_user.innerText = "Sign Up";
                        })
                    })
                }else{
                    console.log("Uploading Image Failed")
                    signup_user.disable = true;
                    signup_user.innerText = "Sign Up";
                }
                alert("Your Account Created")

                
            } catch(error){
                // console.log(error)
                alert(error)
                signup_user.disable = true;
                signup_user.innerText = "Sign Up";
            }
        } else{
            alert("Password Didn't Match")
            signup_user.disable = true;
            signup_user.innerText = "Sign Up";
        }
    }else{
        alert("All fields are required")
        signup_user.disable = true;
        signup_user.innerText = "Sign Up";
    }

    // console.log( "UserInfo=>" , userInfo)
});
