var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
});
