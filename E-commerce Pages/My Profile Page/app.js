import {
  auth , 
  onAuthStateChanged ,
  doc ,
  getDoc ,
  db ,
  signOut ,
  updateDoc ,
  storage ,
  ref ,
  uploadBytes , 
  getDownloadURL
} from "../../Utils/utils.js"

const user_logout = document.getElementById("user_logout");
const user_login = document.getElementById("user_login");
const nav_disable = document.querySelectorAll("nav_disable");
const userDp = document.getElementById("userDp");

// Mobile Nav Element 
const side_navbar = document.getElementById("side_navbar");
const side_menu_open = document.getElementById("side_menu_open");
const side_menu_close = document.getElementById("side_menu_close");


//My Profile Element 
const profile_picture = document.getElementById("profile-picture");
const profile_username = document.getElementById("user-name");
const profile_email = document.getElementById("user-email");
const profile_password = document.getElementById("user-password");
const lg_profile = document.getElementById("lg_profile");
const profilePage = document.getElementById("profilePage");




window.sideBarOpen = sideBarOpen
window.sideBarClose = sideBarClose

function sideBarOpen(){
  side_menu_open.style.display = "none"
  side_navbar.style.display = "block"
  side_menu_close.style.display = "block"
}
function sideBarClose(){
  side_menu_close.style.display = "none"
  side_navbar.style.display = "none"
  side_menu_open.style.display = "block"
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
      // console.log(uid)
      getUserInfo(uid)
    //   updateProfile(uid)
      user_logout.style.display = "inline-block"
      user_login.style.display = "none"
      nav_disable.disable = false
      myProducts.style.display = "inline-block"
      // ...
    } else {
      user_logout.style.display = "none"
      myProducts.style.display = "none"
      user_login.style.display = "inline-block"
      window.location.href = "/"
      
      console.log("User is signed out")
      //  window.location.href = "/User Login And Signup/Login/index.html";
      // User is signed out
      // ...
    }
})

user_login.addEventListener("click" , ()=>{
  window.location.href = "/User Login And Signup/Login/index.html"
})
user_logout.addEventListener("click" , () => {
  signOut(auth).then(() => {
    console.log("Sign-out successful.")
    // Sign-out successful.
  }).catch((error) => {
    console.log(error)
    // An error happened.
  });
})
function getUserInfo(uid){
    const docRef = doc(db , "users" , uid);
    getDoc(docRef).then((data)=>{
      // console.log(data.data())
      userDp.src = data.data().user_dp_input;
      profile_picture.src = data.data().user_dp_input;
      profile_email.innerText = data.data().user_email;
      profile_password.innerText = data.data().user_password;
      const firstName = data.data().user_first_name;
      const lastName = data.data().user_last_name;
      profile_username.innerText = firstName + " " + lastName ;
      lg_profile.src = data.data().user_dp_input 
    //    console.log(lg_profile)
    })
}

// window.updateProfile = updateProfile
const update_btn = document.getElementById('update_button')
update_btn.addEventListener('click', function() {
    update_btn.innerText = "Updating Profile" ;
    update_btn.disable = true ;
    const fileInput = document.getElementById('profile-picture-input');
    const file = fileInput.files[0];
    if (file) {
        updateProfile(`${auth.currentUser.uid}`, file);
    } else {
        openModal()
        update_btn.innerText = "Update Profile Picture" ;
        update_btn.disable = false ;
        // alert('Please select an image file to update your profile picture.');
    }
});

async function updateProfile(uid, file) {
    console.log(uid , file)
    try {
        const profileUpdateref = ref(storage , `images/${uid}`);
        uploadBytes(profileUpdateref , file).then(()=>{
            // console.log("Image Uploaded")

            getDownloadURL(profileUpdateref).then((url)=>{
                // console.log("url a gya" , url)

                const profileChangeDb = doc(db , "users" ,uid);
                updateDoc(profileChangeDb , {
                    user_dp_input: url
                })
                openUpdateModal()
                // console.log("Firestore Updated")
            }).catch((err)=>{
                alert(err)
            })
        })

    } catch (error) {
        console.error("Error updating profile:", error);
    }
}
    
// Open Profile

    
// Get the modal
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close-button")[0];

function openModal() {
    modal.classList.add('show');
    setTimeout(() => {
        modal.style.display = "block";
    }, 1000); // Small timeout to trigger transition
}

span.onclick = function() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300); // Timeout to match the transition duration
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300); // Timeout to match the transition duration
    }
}


// Profile Modal
// Get the modal
const profile_picture_modal = document.getElementById("profile-picture-modal");
const close_profile = document.getElementById("close_profile");

profile_picture.addEventListener("click" ,()=>{
    openProfileModal()
    function openProfileModal() {
        profile_picture_modal.classList.add('show');
        setTimeout(() => {
            profile_picture_modal.style.display = "block";
        }, 1000); // Small timeout to trigger transition
    }
})

// const span = document.getElementsByClassName("close-button")[0];
close_profile.addEventListener("click" , ()=>{
    closeProfileModal()
    function closeProfileModal() {
        profile_picture_modal.classList.remove('show');
        setTimeout(() => {
            profile_picture_modal.style.display = "none";
        }, 300); // Timeout to match the transition duration
    }

})

window.onclick = function(event) {
    if (event.target == profile_picture_modal) {
        profile_picture_modal.classList.remove('show');
        setTimeout(() => {
            profile_picture_modal.style.display = "none";
        }, 300); // Timeout to match the transition duration
    }
}

// profile Updated
const updateModal = document.getElementById("update-modal");
const updateModalContent = updateModal.querySelector(".update-modal-content");
const updateModalCloseBtn = updateModal.querySelector(".close-button");

// Function to open the update modal
function openUpdateModal() {
    updateModal.style.display = "block";
}

// Function to close the update modal
function closeUpdateModal() {
    updateModal.style.display = "none";
    location.reload()
}

// Event listener for closing the update modal
updateModalCloseBtn.addEventListener("click", closeUpdateModal);

// Event listener for closing the update modal if clicked outside the modal content
window.addEventListener("click", function(event) {
    if (event.target === updateModal) {
        closeUpdateModal();
    }
});