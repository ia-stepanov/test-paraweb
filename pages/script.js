import $ from 'jquery';
import 'slick-carousel';

$(".carousel").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  dots: true,
});

