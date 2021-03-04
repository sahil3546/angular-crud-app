import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as UserActions from '../../actions/user.action';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  showToast: boolean = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private _apiService: ApiService,
    private SpinnerService: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      budget: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }


  onSubmit() {
    this.SpinnerService.show();
    if (this.form.invalid) {
      this.SpinnerService.hide();
      return;
    }
    console.log(this.form.value);
    this.store.dispatch(new UserActions.AddUser({
      id: this.form.value.id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      budget: this.form.value.budget,
      phone: this.form.value.phone
    }));
    this._apiService.postService(this.form.value).subscribe((res) => {
      this.toastr.success("User Added Succesfully");
      this.SpinnerService.hide();
      this.onReset();
    }, (err) => {
      console.log(err);
      this.SpinnerService.hide();
    })

  }
  onReset() {
    this.form.reset();
    this.router.navigate(['dashboard']);
  }

}

