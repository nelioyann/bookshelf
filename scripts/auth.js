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
          $(".header__title").innerHTML = `Hello, ${doc.data().username}`;
          // $(".header__title").innerHTML = `Logged in as ${user.email}`;
        });

      // db.collection("users").doc(user.uid).collection("books").get().then(snapshot =>{
      //   lg(snapshot.docs)
      // })

      //toggle UI elements

      gsap.timeline()
      .to(".logged-out", {autoAlpha: 0, duration: 0.3})
      .to(".logged-out", {display: "none", duration: 0.1})
      .to(".logged-in", {display: "block", duration: 0.1})
      .to(".logged-in", {autoAlpha: 1, duration: 0.3})
      // $$(".logged-out").forEach((item) => (item.style.display = "none"));
      // $$(".logged-in").forEach((item) => (item.style.display = "block"));
    } else {
      // hide account info
      //   accountDetails.innerHTML = ""
      $(".header__title").innerHTML = `Log in to view your library`;

      // showFeedback("hide logged-in");
      gsap.timeline()
      .to(".logged-in", {autoAlpha: 0, duration: 0.3})
      .to(".logged-in", {display: "none", duration: 0.1})
      .to(".logged-out", {display: "block", duration: 0.1})
      .to(".logged-out", {autoAlpha: 1, duration: 0.3})
      // $$(".logged-in").forEach((item) => {
      //   item.style.display = "none";
      // });
      // $$(".logged-out").forEach((item) => (item.style.display = "block"));
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
  // gsap.set(".auth_signin", {
    
  //   autoAlpha: 0,
  // });

  const showFeedback = message =>{
    if (message == "Missing or insufficient permissions."){
      return null
    }
    // let feedback = $("#feedbackMessage")
    $(".feedback").innerHTML = message
    gsap.timeline()
    .to(".feedback", {y:"15vh", autoAlpha: 1, duration: 1, ease: "bounce.out"})
    .to(".feedback", {y: 0, autoAlpha: 0, delay:4})
   


}

  const setupBooks = (data) => {
    lg(data);
    if (data.length) {
      let html = `
    
        `;
      data.forEach((doc) => {
        const book = doc.data();
        // lg(doc)
        const li = `
        <div class="book">
          <div class="front">
            <div class="book__title">${book.title}</div>
            <div class="book__completion">${book.completed ? "finished" : "ongoing"}</div>
            </div>
            <form class="back">
              <section class="book__progress back__section">
                <span class="book__progress__button">-</span>
                <input class="book__progress__value" type="number" name="progress" value=${book.progress}></input>
                <span class="book__progress__button">+</span>
              </section>

              <section class="back__section">
                <label class="back__section__label">
                  <input class="back__section__input back__section__input__finished" type="checkbox"
                    name="finished" ${book.completed ? "checked" : ""}/>
                  <div class="back__section__toggle toggle"></div>
                  <span>Finished</span>
                </label>
              </section>

              <section class="back__section">
                <label class="back__section__label" >
                  <input class="back__section__input back__section__input__remove" type="checkbox"
                    name="remove" />
                  <div class="back__section__toggle toggle"></div>
                  <span>Remove</span>
                </label>
              </section>



              <button class="book__save">
                Save Changes 
              </button>


          </form>
				</div>
			`;
        html += li;
      });
      $(".books__list").innerHTML = html;

      $$(".book").forEach(book =>{
        book.addEventListener("click", (e)=>{
          if($(".flipped")){
            // lg()
            if(e.currentTarget.classList.contains("flipped")){
              // clicked book was flipped
              e.currentTarget.classList.remove("flipped")
            } else{
              $(".flipped").classList.remove("flipped")
              e.currentTarget.classList.add("flipped")

            }
          }
          else{
            // no cards flipped
            e.currentTarget.classList.add("flipped")
          }
          // lg(e.currentTarget)
        })
      })

      $$(".book__progress__button").forEach(button =>{
        button.addEventListener("click", e=>{
          e.stopPropagation()
          lg(e.currentTarget)
        })
      })
        

        $$(".book__progress__value").forEach(value =>{
          value.addEventListener("click", e=>{
            e.preventDefault()
            e.stopPropagation()
            lg(e.currentTarget)
          })
        })
        $$(".book__save").forEach(button =>{
          button.addEventListener("click", e=>{
            e.preventDefault()
            e.stopPropagation()
            lg(e.currentTarget)
          })
        })
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

      // update navigation active link
      $(".link-active").classList.remove("link-active")
      $(".link__books").classList.add("link-active")

      
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
              .to(".books", { overflow: "auto", duration: 1 })
              .to(".book", { autoAlpha: 1, duration: 1, stagger: {each:0.3} })
            
          },
          (err) => {
            showFeedback(err.message);
          }
          
        )
      lg(`show books tl ${showBooks_tl.reversed()}`)

    } else {
      // Logged out

      // update navigation active link
      $(".link-active").classList.remove("link-active")
      $(".link__signin").classList.add("link-active")

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

      lg(`show books tl ${showBooks_tl.reversed()}`)
      
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
      if (!showBooks_tl.reversed()){
        showBooks_tl.reverse()
      }
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
    lg(showBooks_tl.reversed())
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
        showFeedback("New book added! ")

        // update navigation active link
      $(".link-active").classList.remove("link-active")
      $(".link__books").classList.add("link-active")


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
              username: $(".auth__signup")["newUsername"].value,
            });
          // reset form
          // $(".auth__signup").reset();
        },
        (err) => {
          showFeedback(err.message)
          return null
        }
      )
      .then(() => {
        lg("reset here");
        // $(".auth__signup").reset();
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
