import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animation } from '@angular/animations';
import {trigger, style, animate, transition } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { location } from 'src/app/models/toast';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  // animations: [
  //   trigger("right" , [
  //     transition("void => *", [
  //       style({ transform: "translateX(200%)" }),
  //       animate(300)
  //     ]),
  //     transition("* => void", [
  //       animate(300, style({ transform: "translateX(200%)" }))
  //     ])
  //   ]),
  //   trigger("left", [
  //     transition("void => *", [
  //       style({ transform: "translateX(-200%)" }),
  //       animate(300)
  //     ]),
  //     transition("* => void", [
  //       animate(300, style({ transform: "translateX(-200%)" }))
  //     ])
  //   ]),
  // ]
})
export class ToastComponent implements OnInit {
  @Input()
  toast: location;
  timer: number;
  style: { [key: string]: any } = {};
  animationtype = null;
  constructor(private toastService: ToastService) { }

  ngOnInit(): void {

    this.timer = this.toast.duration;
    if (this.toast.duration > 0) {
      const interval = setInterval(() => {
        this.toast.duration--;
        if (this.toast.duration === 0) {
          switch(this.animationtype)
          {
            case 'left': 
              this.style.animationName = 'left_close';
              break;
            case 'right':
              this.style.animationName = 'right_close';
              break;
            case 'top':
              this.style.animationName = 'top_close';
              break;
            case 'bottom':
              this.style.animationName = 'bottom_close';
              break;
            case 'center':
              this.style.animationName = 'center_close';
              break;
          }
          const timeout = setTimeout(() => {
            this.toastService.closeToast(this.toast.index);
            clearTimeout(timeout);
          }, 1000);
          clearInterval(interval);
        }
      }, 1000);
    }

    this.toastService.toasts$.subscribe(data => {
      this.style.x = this.toast.x;
      this.style.y = this.toast.y;
    });
    if(this.toast.y === 'TOP') {
      this.style.top = '0'
      if(this.toast.x === 'CENTER')
      {
        this.style.animationName = 'top_appear';
        this.style.animationDuration = '2s';
        this.animationtype = 'top'
      }
    }
    else if(this.toast.y === 'BOTTOM')
    {
      this.style.bottom = '0'
      if(this.toast.x === 'CENTER')
      {
        this.style.animationName = 'bottom_appear';
        this.style.animationDuration = '2s';
        this.animationtype = 'bottom'

      }
    }
    else
    {
      this.style.top = '50%'
      this.style.transform = 'translateY(-50%)'
    }
    if(this.toast.x === 'LEFT') {
      this.style.left = '0';
      this.style.animationName = 'left_appear';
      this.style.animationDuration = '2s';
      this.animationtype = 'left'

    }
    else if(this.toast.x === 'RIGHT')
    {
      this.style.right = '0'
      this.style.animationName = 'right_appear';
      this.style.animationDuration = '2s';
      this.animationtype = 'right'

    }
    else
    {
      this.style.left = '50%'
      this.style.transform = 'translateX(-50%)'
    }
    if(this.toast.x === 'CENTER' && this.toast.y === 'CENTER') {
      this.style.top = '50%'
      this.style.left = '50%'
      this.style.transform = 'translate(-50%, -50%)'
      this.style.animationName = 'center_appear';
      this.style.animationDuration = '1s';
      this.animationtype = 'center'


    }
  }
  deleteToast() {
    this.toastService.closeToast(this.toast.index);
  }
}
