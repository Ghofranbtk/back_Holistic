import { AfterViewInit, Component } from '@angular/core';
import * as feather from 'feather-icons';
import * as sal from 'sal.js';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    feather.replace();
    sal({
      threshold: 0.1,
      once: true,
    } as sal.Options);

    $('.slick-activation-03').slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      cssEase: 'linear',
      adaptiveHeight: true,
      prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
      nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
      responsive: [{
              breakpoint: 1399,
              settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
              }
          },
          {
              breakpoint: 1200,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
              }
          },
          {
              breakpoint: 992,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
              }
          },
          {
              breakpoint: 576,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true,
                  arrows: false,
              }
          }
      ]
  });
  }
}
