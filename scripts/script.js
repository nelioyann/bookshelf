document.addEventListener("DOMContentLoaded", ()=>{

    // lg("This page is working")
    // lg($("body"))

    gsap.to(".auth", {autoAlpha: 1, delay: 2})

    const switchForms = (e) =>{
        let target = (e.target.getAttribute("data-target"))
        lg(target)
        $(".link-active").classList.remove("link-active")
        e.target.classList.add("link-active")
        if(target == "auth__signup"){
            signin_tl.play()
            signup_tl.play()
        } else if(target = "auth__signin"){
            signin_tl.reverse()
            signup_tl.reverse()
            
        }

    }

    // I am deeply ashamed about the following lines of code
    $(".navigation__items__item-signup button").addEventListener("click", switchForms)
    $(".navigation__items__item-signin button").addEventListener("click", switchForms)
    $(".navigation__items__item-books button").addEventListener("click", switchForms)
    $(".navigation__items__item-add button").addEventListener("click", switchForms)
    
    
    $$(".form__button").forEach(element => {
      
      element.addEventListener("click", (e)=>{
        gsap.timeline()
        .to(e.target, {opacity: 0.5, duration: 0.3})
        .to(e.target, {opacity: 1, duration: 0.3, delay: 2})
        
        lg(e.target)
      })
    });



})