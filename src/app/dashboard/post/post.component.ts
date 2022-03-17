import { Component, OnInit } from '@angular/core';
import { postInterface } from 'src/app/mock-post-interface';
import { postArray } from 'src/app/mock-post-array';
import { PostService } from 'src/app/dashboard-service/post.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { timeStamp } from 'console';
import { stringify } from 'querystring';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  profIdNumber: string;
  profName: string;
  profEmail: string;
  profTextPost: string;
  profMobile: string;
  profPostTime: string;
  faTimes = faTimes;
  faPen = faPen;
  faEraser = faEraser;
  updatePostText: string;
  updatePostTime: string;
  holder;
  postVariable: postInterface[] = [];
  constructor(private postObj: PostService) { }

  ngOnInit(): void {
    this.postObj
      .getPostFromPostService()
      .subscribe((p) => (this.postVariable = p));

    let pollConVar: HTMLDivElement = document.querySelector('.poll-con');
    pollConVar.style.display = 'none';
    let diagramConVar: HTMLDivElement = document.querySelector('.diagram-con');
    diagramConVar.style.display = 'none';
    this.closeUpdateForm();
  }

  closeTimes() {
    // this.postObj
    //   .getPostFromPostService()
    //   .subscribe((p) => (this.postVariable = p));
    const postContent: HTMLInputElement =
      document.querySelector('#post-content');
    const closeTimes: HTMLDivElement =
      document.querySelector('#post-main-modal');
    postContent.value = null;
    closeTimes.style.display = 'none';
  }

  //Open Option Tab
  OptionTab() {
    let optionTab: HTMLDivElement = document.querySelector('.post-option-tab');
    optionTab.style.display = 'block';
  }
  closeOptionTab() {
    let optionTab: HTMLDivElement = document.querySelector('.post-option-tab');
    optionTab.style.display = 'none';
  }

  //toggle post form
  makeTextPost() {
    const postModal: HTMLDivElement =
      document.querySelector('#post-main-modal');
    const postName: HTMLHeadingElement = document.querySelector('#profileName');
    const postEmail: HTMLHeadingElement =
      document.querySelector('#profileEmail');
    const postMobile: HTMLHeadingElement =
      document.querySelector('#profileMobile');
    this.profName = postName.textContent;
    this.profEmail = postEmail.textContent;
    this.profMobile = postMobile.textContent;
    postModal.style.display = 'flex';
    let optionTab: HTMLDivElement = document.querySelector('.post-option-tab');
    optionTab.style.display = 'none';
  }

  addPost() {
    var format = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    } as const;
    var date = new Date();
    const postName: HTMLHeadingElement = document.querySelector('#profileName');
    const postEmail: HTMLHeadingElement =
      document.querySelector('#profileEmail');
    const newPost = {
      profName: (this.profName = postName.textContent),
      profEmail: (this.profEmail = postEmail.textContent),
      profTextPost: this.profTextPost,
      profPostTime: (this.profPostTime = String(
        date.toLocaleTimeString('en-US', format)
      )),
    };
    // let postContent: HTMLTextAreaElement =
    //   document.querySelector('.post-content');
    if (!this.profTextPost) {
      return alert('Post cannot be void');
    } else {
      this.postObj
        .addPostFromPostService(newPost)
        .subscribe((p) => this.postVariable.push(newPost));
      this.profTextPost = null;
      // For Json Server. Although 4 get requests will still work with json server.
      // for (let json = 0; json < 2; json++) {
      //   this.postObj
      //     .getPostFromPostService()
      //     .subscribe((p) => (this.postVariable = p));
      // }
      // For Spring LOL
      for (let spring = 0; spring < 4; spring++) {
        this.postObj
          .getPostFromPostService()
          .subscribe((p) => (this.postVariable = p));
      }
      this.closeTimes();
    }
  }

  // For delete and update'
  deletePost(postToBeDeleted: postInterface) {
    const profileName: HTMLHeadingElement =
      document.querySelector('#profileName');
    const profileEmail: HTMLParagraphElement =
      document.querySelector('#profileEmail');
    // In order to refresh
    // this.postObj
    //   .getPostFromPostService()
    //   .subscribe((p) => (this.postVariable = p));
    if (
      profileName.textContent === postToBeDeleted.profName &&
      profileEmail.textContent === postToBeDeleted.profEmail
    ) {
      this.postObj
        .deletePostFromPostService(postToBeDeleted)
        .subscribe(
          () =>
          (this.postVariable = this.postVariable.filter(
            (p) => p.id !== postToBeDeleted.id
          ))
        );
      // this.postObj
      //   .getPostFromPostService()
      //   .subscribe((p) => (this.postVariable = p));
    } else {
      alert('This is not your post, bakit mo ide delete aber???');
    }
  }

  //toggle update form
  toggleUpdatePostForm(postTobeUpdated: postInterface) {
    // this.postObj
    //   .getPostFromPostService()
    //   .subscribe((p) => (this.postVariable = p));
    const profileName: HTMLHeadingElement =
      document.querySelector('#profileName');
    const profileEmail: HTMLParagraphElement =
      document.querySelector('#profileEmail');
    if (
      profileName.textContent === postTobeUpdated.profName &&
      profileEmail.textContent === postTobeUpdated.profEmail
    ) {
      // passes the post to be updated into the holder that 
      // we can access outside the function
      this.holder = postTobeUpdated
      // Opens the update form
      let mainUpdateCon: HTMLDivElement =
        document.querySelector('.main-update-con');
      mainUpdateCon.style.display = 'flex';
      let updateTextArea: HTMLTextAreaElement =
        document.querySelector('.update-textarea');
      updateTextArea.value = postTobeUpdated.profTextPost;
    } else {
      alert('This is not your post, bakit mo i a update, aber???');
    }
  }

  // Update the post, toggleUpdatePostForm
  updateThePost() {
    // this.postObj
    //   .getPostFromPostService()
    //   .subscribe((p) => (this.postVariable = p));
    let postContent: HTMLTextAreaElement = document.querySelector('#updatePostText')
    // alert(`${this.holder.id}`)
    this.holder.profTextPost = postContent.value;
    this.postObj.updatePostFromPostService(this.holder).subscribe();
    // this.postObj
    //   .getPostFromPostService()
    //   .subscribe((p) => (this.postVariable = p));
    this.closeUpdateForm()
  }

  closeUpdateForm() {
    // this.postObj
    //   .getPostFromPostService()
    //   .subscribe((p) => (this.postVariable = p));
    let mainUpdateCon: HTMLDivElement =
      document.querySelector('.main-update-con');
    mainUpdateCon.style.display = 'none';
  }

  //OPEN TABS [post, poll, and diagram]
  togglePostCon() {
    let postConVar: HTMLDivElement = document.querySelector('.post-con');
    postConVar.style.display = 'block';
    let pollConVar: HTMLDivElement = document.querySelector('.poll-con');
    pollConVar.style.display = 'none';
    let diagramConVar: HTMLDivElement = document.querySelector('.diagram-con');
    diagramConVar.style.display = 'none';
    ////////////////////////
    let postTabBottomLine: HTMLHeadingElement =
      document.querySelector('.post-tab');

    postTabBottomLine.style.borderBottom = '5px solid #2e89ff';
    let pollTabBottomLine: HTMLHeadingElement =
      document.querySelector('.poll-tab');

    pollTabBottomLine.style.borderBottom = '5px solid transparent';
    let diagramTabBottomLine: HTMLHeadingElement =
      document.querySelector('.diagram-tab');

    diagramTabBottomLine.style.borderBottom = '5px solid transparent';
  }
  togglePollCon() {
    let postConVar: HTMLDivElement = document.querySelector('.post-con');
    postConVar.style.display = 'none';
    let pollConVar: HTMLDivElement = document.querySelector('.poll-con');
    pollConVar.style.display = 'block';
    let diagramConVar: HTMLDivElement = document.querySelector('.diagram-con');
    diagramConVar.style.display = 'none';
    ////////////////////////
    let postTabBottomLine: HTMLHeadingElement =
      document.querySelector('.post-tab');

    postTabBottomLine.style.borderBottom = '5px solid transparent';
    let pollTabBottomLine: HTMLHeadingElement =
      document.querySelector('.poll-tab');

    pollTabBottomLine.style.borderBottom = '5px solid #2e89ff';
    let diagramTabBottomLine: HTMLHeadingElement =
      document.querySelector('.diagram-tab');

    diagramTabBottomLine.style.borderBottom = '5px solid transparent';
  }
  toggleDiagramCon() {
    let postConVar: HTMLDivElement = document.querySelector('.post-con');
    postConVar.style.display = 'none';
    let pollConVar: HTMLDivElement = document.querySelector('.poll-con');
    pollConVar.style.display = 'none';
    let diagramConVar: HTMLDivElement = document.querySelector('.diagram-con');
    diagramConVar.style.display = 'block';
    ////////////////////////
    let postTabBottomLine: HTMLHeadingElement =
      document.querySelector('.post-tab');

    postTabBottomLine.style.borderBottom = '5px solid transparent';
    let pollTabBottomLine: HTMLHeadingElement =
      document.querySelector('.poll-tab');

    pollTabBottomLine.style.borderBottom = '5px solid transparent';
    let diagramTabBottomLine: HTMLHeadingElement =
      document.querySelector('.diagram-tab');

    diagramTabBottomLine.style.borderBottom = '5px solid #2e89ff';
  }
}
