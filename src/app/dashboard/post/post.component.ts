import { Component, OnInit } from '@angular/core';
import { postInterface } from 'src/app/mock-post-interface';
import { postArray } from 'src/app/mock-post-array';
import { PostService } from 'src/app/dashboard-service/post.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  name: string;
  mobileNumber: string;
  email: string;
  faTimes = faTimes;
  postVariable: postInterface[] = [];
  constructor(private postObj: PostService) { }

  ngOnInit(): void {
    this.name = 'Jannel';
    this.mobileNumber = '12345678901';
    this.email = 'jannelrevilla@gmail.com';
    this.postObj
      .getPostFromPostService()
      .subscribe((p) => (this.postVariable = p));
  }

  closeTimes() {
    const closeTimes: HTMLDivElement = document.querySelector("#post-main-modal")
    closeTimes.style.display = 'none'
  }

  makePost() {
    const postModal: HTMLDivElement = document.querySelector("#post-main-modal")
    postModal.style.display = 'flex'

    // alert(
    //   'wala pa tong functionalities hahahaha but the data was already being fetched from the mock database to this post component'
    // );
  }
}
