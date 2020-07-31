

const toggleTween = tween =>{
    tween.reversed() ? tween.play() : tween.reversed()
}

const signin_tl = gsap.timeline({paused:true, reversed: true }).to(".auth__signin", {
  x: "-100vw",
  autoAlpha: 1,
  ease: "back.inOut",
  duration: 1,
});
const signup_tl = gsap.timeline({paused:true, reversed: true }).to(".auth__signup", {
  x: 0,
  autoAlpha: 1,
  ease: "back.inOut",
  duration: 1,
});

// const books_tl = gsap.timeline({paused: true, reversed: true}).to(".book",{
//   autoAlpha: 1,
//   duration: 1
// })

const showBooks_tl = gsap
.timeline({paused:true, reversed: true })
.to(".books__list", { overflow: "none", duration: 0.1 })
.to(".books__list", { autoAlpha: 0, duration: 0.3 })
.to(".books__list", { display: "none", duration: 0.3 })
.to(".books__form", {autoAlpha: 0, duration: 0.1})
.to(".books__form", { display: "block", duration: 0.1 })
.to(".books__form", {autoAlpha: 1, duration: 0.3})
// signin_tl.play()
// signup_tl.play()