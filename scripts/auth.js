document.addEventListener("DOMContentLoaded", () => {
  const setupUI = (user) => {
    if (user) {
      // account info
      // const html = `<div> Logged in as ${user.email}</div>`
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          lg("fetching user doc");
          // lg(doc)
          // doc.collection("books").get().then(snapshot =>{
          //   lg(snapshot)
          // })
          $(".header__title").innerHTML = `Logged in as ${doc.data().username}`;
          // $(".header__title").innerHTML = `Logged in as ${user.email}`;
        });

      // db.collection("users").doc(user.uid).collection("books").get().then(snapshot =>{
      //   lg(snapshot.docs)
      // })

      //toggle UI elements
      $$(".logged-in").forEach((item) => (item.style.display = "block"));
      $$(".logged-out").forEach((item) => (item.style.display = "none"));
    } else {
      // hide account info
      //   accountDetails.innerHTML = ""
      $(".header__title").innerHTML = `Log in to view your library`;

      // showFeedback("hide logged-in");
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

  gsap.set(".feedback", {
    y: 0,
    autoAlpha: 0,
  });

  const showFeedback = message =>{
    if (message == "Missing or insufficient permissions."){
      return null
    }
    // let feedback = $("#feedbackMessage")
    $(".feedback").innerHTML = message
    gsap.timeline()
    .to(".feedback", {y:"15vh", autoAlpha: 1, duration: 1, ease: "bounce.out"})
    .to(".feedback", {y: 0, autoAlpha: 0, delay:4})
    // feedback.fadeIn()
    // $(".logo_img").toggle("fold")
    // feedback.fadeIn().delay(1200).fadeOut()
    // feedback.css("animation", "feedbackSlide 1s")
    // setTimeout(() =>{ alert("Hello"); }, 3000);



}
// const showBookForm = (e) =>{
//   gsap
//         .timeline()
//         .to(".books__list", { autoAlpha: 0, duration: 0.3 })
//         .to(".books__list", { display: "none", duration: 0.3 })
//         .to(".books__form", {autoAlpha: 0, duration: 0.1})
//         .to(".books__form", { display: "block", duration: 0.1 })
//         .to(".books__form", {autoAlpha: 1, duration: 0.3})
//         // .to(".auth", { display: "block", duration: 0.1 });

// }
  const setupBooks = (data) => {
    lg(data);
    if (data.length) {
      let html = `
    
        `;
      data.forEach((doc) => {
        const book = doc.data();
        const li = `
				<li class="book">
					<div class="book__title">${book.title}</div>
					<div class="book__completion">${book.completed ? "finished" : "ongoing"}</div>
				</li>
			`;
        html += li;
      });
      $(".books__list").innerHTML = html;

    } else {
      lg("no books")
      $(".books__list").innerHTML = `<h5 class="books__list__text">You don't have any book yet</h5>`;
    }
  };

  // listen for auth status changes
  auth.onAuthStateChanged((user) => {
    if (user) {
      
      //   account information
      lg("user logged inn");
      lg(user);
      // Hide forms
      hideForms();

      // get data
      db.collection("users")
        .doc(user.uid)
        .collection("books")
        .onSnapshot(
          (snapshot) => {
            setupBooks(snapshot.docs);

      // lg($(".add__book"))
      
            setupUI(user);

            // Show books
            $(".auth").style.display = "none";
            gsap
              .timeline()
              .to(".books", { display: "block" })
              .to(".book", { autoAlpha: 1, duration: 1, delay: 0.3 })
              .to(".books", { overflow: "auto" });
            
          },
          (err) => {
            showFeedback(err.message);
          }
          
        );
    } else {
      gsap.set(".auth__signin", {
        x: 0,
        autoAlpha: 1,
      });
      gsap.set(".auth__signup", {
        x: "100vw",
        autoAlpha: 0,
      });
      // showFeedback("user logged out");
      signin_tl.reverse();
      // signup_tl.reverse(false)
      gsap
        .timeline()
        .to(".books", { overflow: "hidden", duration: 0.1 })
        // .to(".book", {autoAlpha: 0, duration: 0.3})
        .to(".books", { display: "none", duration: 0.1 })
        .to(".auth", { display: "block", duration: 0.1 })
        .to(".auth__signin", { autoAlpha: 1, duration: 0.3 });
      // $(".auth").style.display = "block"
      setupUI();
      // setupGuides([]);
    }
  });

  //create book
  $(".link__add").addEventListener("click", ()=>{
    // lg("show form")
    // lg(showBooks_tl.reversed())
    showBooks_tl.play()
    // tween.reversed() ? tween.play() : tween.reversed()
  })
  $(".link__books").addEventListener("click", ()=>{
    // lg(showBooks_tl.reversed())
    showBooks_tl.reverse()
  })

  $(".books__form").addEventListener("submit", (e) => {
    e.preventDefault();
    let user = auth.currentUser;
    lg(user.uid)
    // lg()
    db.collection("users").doc(user.uid).collection("books")
      // add completion
      // add total
      .add({
        title: $(".books__form")["title"].value,
        progress: $(".books__form")["progress"].value,
        completed: $(".books__form")["completed"].checked
      })
      .then(() => {
        // reset form

        $(".books__form").reset();
        // $(".auth").style.display = "none";
        showBooks_tl.reverse()
        // gsap
        //   .timeline()
        //   .to(".books__form", { autoAlpha: 0, duration: 0.3 })
        //   .to(".books__form", { display: "none" })
        //   .to(".books__list", { display: "flex", duration: 1, delay: 0.3 })
        //   .to(".books__list", { autoAlpha: 1, duration: 1 })
          // .to(".books", { overflow: "auto" });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // signup
  $(".auth__signup").addEventListener("submit", (e) => {
    e.preventDefault();

    //   get user info
    const email = $(".auth__signup")["new-email"].value;
    const password = $(".auth__signup")["new-password"].value;
    //   sign up the user
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(
        (cred) => {
          return db
            .collection("users")
            .doc(cred.user.uid)
            .set({
              username: $(".auth__signup")["username"].value,
            });
          // reset form
          // $(".auth__signup").reset();
        },
        (err) => showFeedback(err.message)
      )
      .then(() => {
        lg("reset here");
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
  $(".auth__signin").addEventListener("submit", (e) => {
    e.preventDefault();
    // get user info
    const email = $(".auth__signin")["email"].value;
    const password = $(".auth__signin")["password"].value;

    // log the user in
    auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        // hide form
        hideForms();
        // reset form
        $(".auth__signin").reset();
      })
      .catch((err) => showFeedback(err.message));
  });
});
