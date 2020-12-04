import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { location, Toast } from './../models/toast';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  private toastsSource = new BehaviorSubject<location[]>([]);
  toasts$ = this.toastsSource.asObservable();
  vertical = "RIGHT";
  horizontal = "BOTTOM";
  index = 0;
  createNewToast(toast: Toast, vertical: string, horizontal: string){
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.index = this.index + 1;
    const toasts = [...this.toastsSource.value, { ...toast, y: vertical, x: horizontal, index: this.index }];
    console.log(toasts, vertical, horizontal);
    this.calcPos(toasts);
  }
  closeToast(index: number) {
    const toasts = this.toastsSource.value.filter(item => item.index !== index);
    this.calcPos(toasts);
  }

  calcPos(toasts: location[]) {
    this.toastsSource.next(toasts);
  }
}
