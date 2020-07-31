document.addEventListener("DOMContentLoaded", () => {
  const setupUI = (user) => {
    if (user) {
      // account info
      // const html = `<div> Logged in as ${user.email}</div>`
      $(".header__title").innerHTML = `Logged in as ${user.email}`;

      //toggle UI elements
      $$(".logged-in").forEach((item) => (item.style.display = "block"));
      $$(".logged-out").forEach((item) => (item.style.display = "none"));
      lg("hide logged-out");
    } else {
      // hide account info
      //   accountDetails.innerHTML = ""
      $(".header__title").innerHTML = `Log in to view your library`;

      lg("hide logged-in");
      $$(".logged-in").forEach((item) => {
        item.style.display = "none";
      });
      $$(".logged-out").forEach((item) => (item.style.display = "block"));
    }
  };

  const hideForms = () => {
    signin_tl.play();
    signup_tl.reverse();
  };


const setupBooks = (data) => {
  lg(data)
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const book = doc.data();
      const li = `
				<li class="book">
					<div class="book__title">${book.title}</div>
					<div class="book__completion">${book.completed ? "finished": "ongoing"}</div>
				</li>
			`;
      html += li;
    });
    $(".books__list").innerHTML = html;
  } else {
    $(".books__list").innerHTML = `<h5 class="">Login to see guides</h5>`;
  }
};


  // listen for auth status changes
  auth.onAuthStateChanged((user) => {
    if (user) {
      //   account information
      lg("user logged inn");
      lg(user)
      // Hide forms
      hideForms();

      // get data
      db.collection("books")
      .onSnapshot((snapshot) => {
        setupBooks(snapshot.docs);
        setupUI(user);
        
        // Show books
        $(".auth").style.display = "none"
        gsap.timeline()
        .to(".books", {display: "block"})
        .to(".book", {autoAlpha: 1, duration: 1, delay: 0.3})
        .to(".books", {overflow: "auto"})

        },
        err => {
          console.log(err.message);
        })
    } else {
      console.log("user logged out");
      signin_tl.reverse();
      // signup_tl.reverse(false)
      gsap.timeline()
      .to(".books", {overflow:"hidden", duration: 0.1})
      // .to(".book", {autoAlpha: 0, duration: 0.3})
      .to(".books", {display:"none", duration: 0.1})
      .to(".auth", {display:"block", duration: 0.1})
      // $(".auth").style.display = "block"
      setupUI();
      // setupGuides([]);
    }
  });

  //create book
    createForm.addEventListener("submit", (e) => {
      e.preventDefault();

      db.collection("guides")
        .add({
          title: createForm["title"].value,
          content: createForm["content"].value,
        })
        .then(() => {
          // close modal and reset form

          const modal = document.querySelector("#modal-create");
          M.Modal.getInstance(modal).close();
          createForm.reset();
        })
        .catch((err) => {
          console.log(err.message);
        });
    });

  // signup

  // console.log("test")
  // const signupForm = document.querySelector(".auth__form");
  // lg($(".auth__signup"))
  $(".auth__signup").addEventListener("submit", (e) => {
    e.preventDefault();

    //   get user info
    const email = $(".auth__signup")["new-email"].value;
    const password = $(".auth__signup")["new-password"].value;
    //   sign up the user
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      // reset form
      $(".auth__signup").reset();
    }, err => lg(err.message))
  });

  // logout
  // const logout = document.querySelector("#logout");
  $(".link__signout").addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut();
  });

  //   // login
  $(".auth__signin").addEventListener("submit", (e) => {
    e.preventDefault();
    // get user info
    const email = $(".auth__signin")["email"].value;
    const password = $(".auth__signin")["password"].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // hide form
      hideForms();
      // reset form
      $(".auth__signin").reset();
    }).catch(err => lg(err.message))
  });
});
