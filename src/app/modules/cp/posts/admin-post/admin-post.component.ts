import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AjaxService, url } from '../../../../services/ajax.service'
import { AuthService } from '../../../../services/auth.service'
import * as moment from 'moment';
import { FormBuilder, FormGroup   } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Base64Upload from '../../../../base64upload'

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.styl']
})




export class AdminPostComponent implements OnInit {


  public selectedPostStatus:boolean = false;
  public preloader:boolean = false;
  public posts:any = [];
  public moment:any = moment;
  public currentScroll:number = 6;
  public base_url:string = url;
  public uploadForm: FormGroup;
  public editorConfig = {extraPlugins: [Base64Upload]}

  public postAutoSave:any = {};

  public totalPages = 0;
  public currentPage = 1;
  public range = [];
  public Editor = ClassicEditor;
  public selectedPost:any = {
    title:'',
    description:'',
    image:'',
    id: ''
  }

  public newPost:any = {
    title:'',
    description:'',
    image: '',
    public_facebook: 0
  }

  public error: any = {
    field:'',
    message:''
  }

  constructor(private formBuilder: FormBuilder, private request: AjaxService, private auth: AuthService, private router: Router) {
  	var ng = this;

    ng.auth.user((user) => {
      if (!user || (user && user.role != 1)) {
        ng.goTo(['/login']);
      } 
    });

    if (localStorage.getItem('postAutoSave')) {
      ng.postAutoSave = JSON.parse(localStorage.getItem('postAutoSave'));
      ng.newPost.title = ng.postAutoSave.title;
      ng.newPost.description = ng.postAutoSave.description;
    }
  }

  ngOnInit() {
    this.getPosts(1)

    this.uploadForm = this.formBuilder.group({
      image: [''],
      id: '',
      title:'',
      description: '',
    });

    setInterval(() => {
      this.autoSaveData();
    }, 10000);
  }

  autoSaveData () {
    localStorage.setItem('postAutoSave', JSON.stringify(this.newPost));
  }

  getPosts(numberPage: number) {
  	var ng = this;
    ng.preloader = true;

    ng.request.get('posts?page='+numberPage, false, (response) => {
      this.posts = response.data
      this.totalPages    = response.last_page;
      this.currentPage   = response.current_page;

      // Pagination Range
      var pages = [];

      for(var i=1;i<=response.last_page;i++) {
        pages.push(i);
      }

      this.range = pages;

      ng.preloader = false;
    }, (errors) => {
      console.log(errors);
    });
  }

  selectedEditPost(post, $event){
    $event.preventDefault()
    this.selectedPost = post;
    this.selectedPostStatus = true;
  }

  saveEditPost($event){
    $event.preventDefault()
    var ng = this;
    const formData = new FormData();
    if (typeof this.selectedPost.image == "object") {
    	formData.append('image', this.selectedPost.image);
    }

    formData.append('id', this.selectedPost.id);
    formData.append('title', this.selectedPost.title);
    formData.append('description', this.selectedPost.description);
    ng.preloader = true;

    ng.request.post('posts/update/'+this.selectedPost.id, formData, (response) => {
      this.selectedPost.id = "";
      this.selectedPost.title = "";
      this.selectedPost.description = "";
      this.selectedPost.image = "";
      ng.getPosts(1)
    }, (errors) => {
      let field = Object.keys(errors)[0];
      ng.error.field = field;
      ng.error.message = errors[field][0];
      ng.preloader = false;
      ng.selectedPostStatus = false;
    });
  }

  saveNewPost($event){
    $event.preventDefault()
    var ng = this;
    ng.preloader = true;

    const formData = new FormData();

    localStorage.setItem('postAutoSave', JSON.stringify(this.newPost));
    ng.postAutoSave = this.newPost;

    formData.append('image', this.newPost.image);
    formData.append('id', this.newPost.id);
    formData.append('title', this.newPost.title);
    formData.append('description', this.newPost.description);
    formData.append('public_facebook', this.newPost.public_facebook);

    //ng.preloader = true;
    ng.request.post('posts/store', formData, (response) => {
    	ng.newPost.public_facebook = 0;
      ng.newPost.title = "";
      ng.newPost.description = "";
      ng.newPost.image = "";

      localStorage.removeItem('postAutoSave');
      ng.postAutoSave = ng.newPost;

      ng.getPosts(1)
    }, (errors) => {
      let field = Object.keys(errors)[0];
      ng.error.field = field;
      ng.error.message = errors[field][0];
      ng.preloader = false;
    });
  }

  deletePost(post, $event) {
    $event.preventDefault();
    let sure = confirm("Are you sure?");
    if (!sure) {
      return;
    }

    var ng = this;
    ng.preloader = true;
    ng.request.delete('posts/destroy/'+post.id, (response) => {
       this.getPosts(1)
    }, (errors) => {
      console.log(errors);
    });
  }

  onFileSelect($event,type) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];
      if (type == "update") {
      	this.selectedPost.image = $event.target.files[0]
      } else {
      	this.newPost.image = $event.target.files[0]
      }
    }
  }

  public goTo(route) {
    this.router.navigate(route);
  }
}