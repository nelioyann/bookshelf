document.addEventListener("DOMContentLoaded", ()=>{
    // Genesis of Jquery
    

    // lg("This page is working")
    // lg($("body"))

    const switchForms = (e) =>{
        let target = (e.target.getAttribute("data-target"))
        lg(target)
        $(".link-active").classList.remove("link-active")
        e.target.classList.add("link-active")
        if(target == "auth__signup"){
            signin_tl.play()
            signup_tl.play()
        //    toggleTween(signin_tl)
        //    toggleTween(signup_tl)
           lg(signin_tl.reversed())
           lg(signup_tl.reversed())
        } else{
            signin_tl.reverse()
            signup_tl.reverse()
        }

    }
    $(".navigation__items__item-signup").addEventListener("click", switchForms)
    $(".navigation__items__item-signin").addEventListener("click", switchForms)

    // Parent element of guides
// const guideList = document.querySelector(".guides");

// // Conditional menu
// const loggedOutLinks = document.querySelectorAll(".logged-out");
// const loggedInLinks = document.querySelectorAll(".logged-in");
// const accountDetails = document.querySelector('.account-details')


const setupUI = (user) => {
  if (user) {

	// account info
	// const html = `<div> Logged in as ${user.email}</div>`
	// accountDetails.innerHTML = html;

    //toggle UI elements
    $$(".logged-in").forEach(
      (item) => (item.style.display = "block")
    );
    $(".logged-out").forEach(
      (item) => (item.style.display = "none")
    );
  } else {
	  // hide account info
	//   accountDetails.innerHTML = ""
    $$(".logged-in").forEach((item) => {
      item.style.display = "none";
    });
    $$(".logged-out").forEach(
      (item) => (item.style.display = "block")
    );
  }
};

// const setupGuides = (data) => {
//   if (data.length) {
//     let html = "";
//     data.forEach((doc) => {
//       const guide = doc.data();
//       const li = `
// 				<li>
// 					<div class="collapsible-header grey lighten-4">${guide.title}</div>
// 					<div class="collapsible-body white">${guide.content}</div>
// 				</li>
// 			`;
//       html += li;
//     });
//     guideList.innerHTML = html;
//   } else {
//     guideList.innerHTML = `<h5 class="center-align">Login to see guides</h5>`;
//   }
// };

// // setup materialize components
// document.addEventListener("DOMContentLoaded", function () {
//   var modals = document.querySelectorAll(".modal");
//   M.Modal.init(modals);

//   var items = document.querySelectorAll(".collapsible");
//   M.Collapsible.init(items);
// });

})