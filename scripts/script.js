document.addEventListener("DOMContentLoaded", ()=>{
    // Genesis of Jquery
    window.$ = document.querySelector.bind(document)
    window.$$ = document.querySelectorAll.bind(document)
    // Cheap Log function
    const lg = (el) =>{
        console.log(el);
    };

    lg("This page is working")
    lg($("body"))

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
})