import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/app.state';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any
  constructor(private store: Store<AppState>, private _apiService: ApiService,  private toastr: ToastrService,) {

  }

  ngOnInit() {
    this.getUserList()
  }

  getUserList(){
    this._apiService.getService().subscribe((res) => {
      this.users = res
    }, (err) => {
      console.log(err);
    })
  }

  delete(id) {
    this._apiService.deleteUser(id).subscribe((res) => {
      if (res) {
        this.toastr.success("Successfully Deleted");
        this.getUserList();
      } else {
        this.toastr.error("Failed to Delete");
      }
    });
  }
}
