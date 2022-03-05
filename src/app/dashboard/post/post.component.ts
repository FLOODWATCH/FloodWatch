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
  profName: string;
  profEmail: string;
  profTextPost: string;
  profMobile: string;
  profPostTime: string;
  faTimes = faTimes;
  postVariable: postInterface[] = [];
  constructor(private postObj: PostService) { }


  ngOnInit(): void {
    this.postObj
      .getPostFromPostService()
      .subscribe((p) => (this.postVariable = p));
  }

  closeTimes() {
    const postContent: HTMLInputElement = document.querySelector("#post-content")
    const closeTimes: HTMLDivElement = document.querySelector("#post-main-modal")
    postContent.value = null
    closeTimes.style.display = 'none'
  }

  addPost() {
    var format = {
      month: '2-digit', day: '2-digit', year: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    } as const;
    var date = new Date()
    const postName: HTMLHeadingElement = document.querySelector("#profileName")
    const postEmail: HTMLHeadingElement = document.querySelector("#profileEmail")
    const newPost = {
      profName: this.profName = postName.textContent,
      profEmail: this.profEmail = postEmail.textContent,
      profTextPost: this.profTextPost,
      profPostTime: this.profPostTime = String(date.toLocaleTimeString("en-US", format))
    }
    this.postObj.addPostFromPostService(newPost).subscribe((p) => this.postVariable.push(newPost));
    this.closeTimes()
  }

  makePost() {
    const postModal: HTMLDivElement = document.querySelector("#post-main-modal")
    const postName: HTMLHeadingElement = document.querySelector("#profileName")
    const postEmail: HTMLHeadingElement = document.querySelector("#profileEmail")
    const postMobile: HTMLHeadingElement = document.querySelector("#profileMobile")
    this.profName = postName.textContent;
    this.profEmail = postEmail.textContent;
    this.profMobile = postMobile.textContent;
    postModal.style.display = 'flex'

    // alert(
    //   'wala pa tong functionalities hahahaha but the data was already being fetched from the mock database to this post component'
    // );
  }
}
