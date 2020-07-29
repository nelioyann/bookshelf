document.addEventListener("DOMContentLoaded", ()=>{
    

const setupUI = (user) => {
    if (user) {
  
      // account info
      // const html = `<div> Logged in as ${user.email}</div>`
      // accountDetails.innerHTML = html;
  
      //toggle UI elements
      $$(".logged-in").forEach(
        (item) => (item.style.display = "block")
      );
      $$(".logged-out").forEach(
        (item) => (item.style.display = "none")
        );
        lg("hide logged-out")
    } else {
        // hide account info
      //   accountDetails.innerHTML = ""
      lg("hide logged-in")
      $$(".logged-in").forEach((item) => {
        item.style.display = "none";
      });
      $$(".logged-out").forEach(
        (item) => (item.style.display = "block")
      );
    }
  };
// listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    //   account information
    lg("user logged in")
    // get data
    // db.collection("guides")
    //   .onSnapshot((snapshot) => {
    //     setupGuides(snapshot.docs);
        setupUI(user);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  } else {
    console.log("user logged out");
    setupUI();
    // setupGuides([]);
  }
});

//create guide
//   const createForm = document.querySelector("#create-form");
//   createForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     db.collection("guides")
//       .add({
//         title: createForm["title"].value,
//         content: createForm["content"].value,
//       })
//       .then(() => {
//         // close modal and reset form

//         const modal = document.querySelector("#modal-create");
//         M.Modal.getInstance(modal).close();
//         createForm.reset();
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   });

// signup

// console.log("test")
// const signupForm = document.querySelector(".auth__form");
// lg($(".auth__signup"))
$(".auth__signup").addEventListener("submit", (e) => {
  e.preventDefault();

//   get user info
  const email = $(".auth__signup")["new-email"].value;
//   lg(email)
  const password = $(".auth__signup")["new-password"].value;
    // lg(email)
//   sign up the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    // reset form
    $(".auth__signup").reset();
  });
});

// logout
// const logout = document.querySelector("#logout");
$(".link__signout").addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

//   // login
//   const loginForm = document.querySelector("#login-form");
  $(".auth__signin").addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = $(".auth__signin")["email"].value;
    const password = $(".auth__signin")["password"].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // close the signup modal & reset form
    //   const modal = document.querySelector("#modal-login");
    //   M.Modal.getInstance(modal).close();
      $(".auth__signin").reset();
    });
  });

})