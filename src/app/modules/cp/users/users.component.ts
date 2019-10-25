import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AjaxService, url } from '../../../services/ajax.service'
import { AuthService } from '../../../services/auth.service'
import * as moment from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.styl'],
})
export class UsersComponent implements OnInit {

  public preloader:boolean = false;
  public users:any = [];
  public moment:any = moment;
  public currentScroll:number = 6;
  public base_url:string = url;

  public selectedUserStatus:boolean = false;
  public selectedUser:any = {
    name:'',
    email:'',
    id: ''
  }

  public newUser:any = {
    name:'',
    password: '',
    email:'',
  }

  public error: any = {
    field:'',
    message:''
  }

  constructor(private request: AjaxService, private auth: AuthService, private router: Router) {
  	var ng = this;

    ng.auth.user((user) => {
      if (!user || (user && user.role != 1)) {
        ng.goTo(['/login']);
      } 
    });
  }

 ngOnInit() {
    this.getUsers()
  }

  getUsers() {
  	var ng = this;
        ng.preloader = true;

    ng.request.get('users', false, (response) => {
      this.users = response.data
      ng.preloader = false;
    }, (errors) => {
      console.log(errors);
    });
  }

  saveEditUser($event){
    $event.preventDefault()
    var ng = this;
    ng.preloader = true;
    ng.request.post('users/update/'+this.selectedUser.id, this.selectedUser, (response) => {
      ng.getUsers()
    }, (errors) => {
      let field = Object.keys(errors)[0];
      ng.error.field = field;
      ng.error.message = errors[field][0];
      ng.preloader = false;
      ng.selectedUserStatus = false;
    });
  }

  selectedEditUser(user, $event){
    $event.preventDefault()
    this.selectedUser = user;
    this.selectedUserStatus = true;
  }

  deleteUser(user, $event) {
    $event.preventDefault();
    let sure = confirm("Are you sure?");
    console.log('test', sure);
    if (!sure) {
      return;
    }

    var ng = this;
    ng.preloader = true;
    ng.request.delete('users/destroy/'+user.id, (response) => {
       this.getUsers()
    }, (errors) => {
      console.log(errors);
    });
  }

  public goTo(route) {
    this.router.navigate(route);
  }
}
