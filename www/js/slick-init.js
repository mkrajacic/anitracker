$(document).ready(function () {
  if (navigator.userAgent.match(/Android/i)) {
    setTimeout(function () {
      $("#top-popularity-anime").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        draggable: true,
        mobileFirst: true,
        prevArrow: $(".prev-p"),
        nextArrow: $(".next-p"),
      });
    }, 1000);
    setTimeout(function () {
      $("#top-rated-anime").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        draggable: true,
        mobileFirst: true,
        prevArrow: $(".prev-r"),
        nextArrow: $(".next-r"),
      });
    }, 1000);
  } else {
    setTimeout(function () {
      $("#top-popularity-anime").slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        draggable: true,
        prevArrow: $(".prev-p"),
        nextArrow: $(".next-p"),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: false,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: false,
            },
          },
        ],
      });
    }, 1000);
    setTimeout(function () {
      $("#top-rated-anime").slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        draggable: true,
        prevArrow: $(".prev-r"),
        nextArrow: $(".next-r"),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: false,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: false,
            },
          },
        ],
      });
    }, 1000);
  }
});
