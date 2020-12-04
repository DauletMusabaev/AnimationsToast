import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from './../../services/toast.service';
import { Toast } from './../../models/toast';

@Component({
  selector: 'app-create-toast',
  templateUrl: './create-toast.component.html',
  styleUrls: ['./create-toast.component.scss']
})
export class CreateToastComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private toastService: ToastService) {}
  createForm: FormGroup;

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: [''],
      content: ['', [Validators.required]],
      type: ['', [Validators.required]],
      duration: [0, [Validators.required]],
      showtitle: [true],
      vertical: ['', [Validators.required]],
      horizontal: ['', [Validators.required]],
      close: [true],
      time: [true],
    });
  }
  onSubmit(form: FormGroup) {
    this.toastService.createNewToast(form.value as Toast, form.value.vertical, form.value.horizontal);
  }
}
