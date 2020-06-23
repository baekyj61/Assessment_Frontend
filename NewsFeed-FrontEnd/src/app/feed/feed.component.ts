import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpclientService } from '../services/httpclient.service';
import { PostModel } from '../model/postmodel';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private httpclientService: HttpclientService) { }
  
  postInput = new FormControl('', [Validators.required]);
  topForm = new FormGroup({
    postInput: this.postInput,
  });
  loading = false;
  posts = [];

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.loading = true;
    this.httpclientService.getPostModels().subscribe(posts => {
      console.log(posts);
      this.posts = posts;
      this.loading = false;
    });
  }

  like(thePost) {
    
    this.httpclientService.updatePostModel(thePost).subscribe(data => {
      if (data.message == "Success") {
        this.getPosts();
      } else {
        alert("Liking This Post Failed!");
      }
    });
  }

  delete(thePost) {
    this.httpclientService.deletePostModel(thePost).subscribe(data => {
      if (data.message == "Success") {
        this.getPosts();
      } else {
        alert("Deleting This Post Failed!");
      }
    });
  }

  submit() {
    let pm = new PostModel();
    pm.textField = this.postInput.value;
    pm.likes = 0;
    this.httpclientService.addPostModel(pm).subscribe(data => {
      if (data.message == "Success") {
        this.getPosts();
        this.postInput.reset();
      } else {
        alert("New Post Submission Failed");
      }
    });
  }

  getErrorMessage(err) {
    if (err == "Post") {
      return this.postInput.hasError('required') ? err + 'Field is Mandatory' : '';
    }
  }

}
