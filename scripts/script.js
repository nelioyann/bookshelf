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
    $(".navigation__items__item-signup").addEventListener("click", switchForms)
    $(".navigation__items__item-signin").addEventListener("click", switchForms)
    
    
    $(".auth__form__button").addEventListener("click", (e)=>{
      gsap.timeline()
      .to(e.target, {opacity: 0.5, duration: 0.3})
      .to(e.target, {opacity: 1, duration: 0.3, delay: 2})
      
      lg(e.target)
    })



})