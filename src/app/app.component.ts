import { Component } from '@angular/core';
import { Toast } from './models/toast';
import { ToastService } from './services/toast.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toast';
  toasts: Toast[] = [];
  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe((data) => {
      this.toasts = data;
    });
  }
}