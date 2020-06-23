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
    this.getPosts(); // Get the list of existing posts in the DB
  }

  // Get All posts in the DB
  getPosts() {
    this.loading = true;
    this.httpclientService.getPostModels().subscribe(posts => {
      this.posts = posts;
      this.loading = false;
    });
  }

  // Increment Like number for requested post.
  like(thePost) {
    this.httpclientService.updatePostModel(thePost).subscribe(data => {
      if (data.message == "Success") {
        this.getPosts();
      } else {
        alert("Liking This Post Failed!");
      }
    });
  }

  // Remove the requested post.
  delete(thePost) {
    this.httpclientService.deletePostModel(thePost).subscribe(data => {
      if (data.message == "Success") {
        this.getPosts();
      } else {
        alert("Deleting This Post Failed!");
      }
    });
  }

  // Create a new post with requested details
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

  // Create an error message when the input field is not entered.
  getErrorMessage(err) {
    if (err == "Post") {
      return this.postInput.hasError('required') ? err + 'Field is Mandatory' : '';
    }
  }

}
