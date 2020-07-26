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
})