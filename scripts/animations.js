gsap.set(".auth__signin", {
  x: 0,
  autoAlpha: 1,
});
gsap.set(".auth__signup", {
  x: "100vw",
  autoAlpha: 0,
});

const toggleTween = tween =>{
    tween.reversed() ? tween.play() : tween.reversed()
}

const signin_tl = gsap.timeline({paused:true, reversed: true }).to(".auth__signin", {
  x: "-100vw",
  autoAlpha: 0,
  ease: "back.inOut",
  duration: 1,
});
const signup_tl = gsap.timeline({paused:true, reversed: true }).to(".auth__signup", {
  x: 0,
  autoAlpha: 1,
  ease: "back.inOut",
  duration: 1,
});


// signin_tl.play()
// signup_tl.play()