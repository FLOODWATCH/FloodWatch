import { Component, OnInit } from '@angular/core';
import { postInterface } from 'src/app/mock-post-interface';
import { postArray } from 'src/app/mock-post-array';
import { PostService } from 'src/app/dashboard-service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  postVariable: postInterface[] = [];
  constructor(private postObj: PostService) {}

  ngOnInit(): void {
    this.postObj
      .getPostFromPostService()
      .subscribe((p) => (this.postVariable = p));
  }

  makePost() {
    alert(
      'wala pa tong functionalities hahahaha but the data was already being fetched from the mock database to this post component'
    );
  }
}
