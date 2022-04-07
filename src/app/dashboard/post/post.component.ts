import { Component, OnInit } from '@angular/core';
import { postInterface } from 'src/app/mock-post-interface';
import { postArray } from 'src/app/mock-post-array';
import { PostService } from 'src/app/dashboard-service/post.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faFileImage } from '@fortawesome/free-regular-svg-icons';
import { faFileVideo } from '@fortawesome/free-regular-svg-icons';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { profile, timeStamp } from 'console';
import { stringify } from 'querystring';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { FileService } from 'src/app/dashboard-service/file.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  // for file
  images = [];
  url: any;
  base64Data: any;
  retrieveResponse: any;
  selectedFile: File;
  retrievedImage: any;

  profIdNumber: string;
  profName: string;
  profEmail: string;
  profTextPost: string;
  profMobile: string;
  profPostTime: string;
  profFile = [];
  faTimes = faTimes;
  faPen = faPen;
  faEraser = faEraser;
  faExclamation = faExclamation;
  faCheck = faCheck;
  faFileUpload = faFileUpload;
  faFileImage = faFileImage;
  faFileVideo = faFileVideo;
  updatePostText: string;
  updatePostTime: string;
  holder;
  postVariable: postInterface[] = [];
  constructor(private postObj: PostService, private httpClient: HttpClient,
    private fileService: FileService) { }

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
  thisUrl = "./assets/yaeWP.jpg";

  closeTimes() {
    // this.postObj
    //   .getPostFromPostService()
    //   .subscribe((p) => (this.postVariable = p));
    const postContent: HTMLInputElement =
      document.querySelector('#post-content');
    const closeTimes: HTMLDivElement =
      document.querySelector('#post-main-modal');
    const postFileContent: HTMLInputElement = document.querySelector("#post-file-content")
    const closeFileTimes: HTMLDivElement = document.querySelector("#post-file-main-modal")
    postContent.value = null;
    closeTimes.style.display = 'none';
    postFileContent.value = null;
    closeFileTimes.style.display = 'none';
    const text: HTMLTextAreaElement = document.querySelector("#post-content")
    const imageContainer: HTMLDivElement = document.querySelector("#img-container")
    text.style.height = '200px'
    imageContainer.style.display = 'none'
    // if (postContent.value != null ) {
    //   this.errorModal("Notice", "Discard Post?")
    // }
  }
  closeFile() {
    const closeModal: HTMLDivElement = document.querySelector("#post-file-main-modal")
    closeModal.style.display = 'none'
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
    let textForm: HTMLDivElement = document.querySelector("#post-content")
    // textForm.style.height = 'auto';
  }
  makeTextFilePost() {
    const postName: HTMLHeadingElement = document.querySelector('#profileName');
    const postEmail: HTMLHeadingElement =
      document.querySelector('#profileEmail');
    const postMobile: HTMLHeadingElement =
      document.querySelector('#profileMobile');
    this.profName = postName.textContent;
    this.profEmail = postEmail.textContent;
    this.profMobile = postMobile.textContent;
    const posttModal: HTMLDivElement = document.querySelector('#post-file-main-modal')
    posttModal.style.display = 'flex'
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
    const formData = new FormData()
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
      profFile: this.profFile
      // profFile: (this.profFile = formData.append('file',
      //   this.myForm.get('fileSource').value))
    };
    // let postContent: HTMLTextAreaElement =
    //   document.querySelector('.post-content');
    if (!this.profTextPost) {
      this.errorModal('Error', 'Post cannot be void')
      // return alert('Post cannot be void');
    } else {
      this.postObj
        .addPostFromPostService(newPost)
        .subscribe((p) => this.postVariable.push(newPost));
      this.profTextPost = null;
      // Just change the value into 2 for json server. Although 4 get requests will still work for json
      for (let x = 0; x < 4; x++) {
        this.postObj
          .getPostFromPostService()
          .subscribe((p) => (this.postVariable = p));
      }
      this.successModdal("Success", "Post Uploaded")
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
      this.successModdal("Success", "Post Deleted")
      // this.postObj
      //   .getPostFromPostService()
      //   .subscribe((p) => (this.postVariable = p));
    } else {
      this.errorModal("Error", "Not Your Account!")
      // alert('This is not your post, bakit mo ide delete aber???');
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
    let optionTab: HTMLDivElement = document.querySelector('.post-option-tab');
    optionTab.style.display = 'none';
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
      this.errorModal("Error", "Not Your Account!")
      // alert('This is not your post, bakit mo i a update, aber???');
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
    // this.closeUpdateForm()
    this.successModdal("Success", "Post Updated")
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
  closeModalDashboard() {
    const closeModal: HTMLDivElement = document.querySelector("#dashboard-modal")
    closeModal.style.display = 'flex'
    this.successModdal("Success", "Post Uploaded")
    // this.errorModal("Error", "Not Your Account")
    // let messageType = document.getElementById("dashboard-message-type");
    // messageType.innerHTML = "Success"
    // let modalMessage = document.getElementById("dashboard-modal-message");
    // modalMessage.innerHTML = "Post Uploaded"
    // dashboard-modal-message
  }


  // Modal Message
  successModdal(messageType, modalMessage) {
    const closeModal: HTMLDivElement = document.querySelector("#dashboard-modal")
    closeModal.style.display = 'flex'
    const checkIcon = document.getElementById("checkIcon")
    const exclamationIcon = document.getElementById("exclamationIcon")
    const typeMessage: HTMLSpanElement = document.querySelector("#dashboard-message-type")
    const messageModal: HTMLParagraphElement = document.querySelector("#dashboard-modal-message")
    const redIcon = document.getElementById("dashboard-red-icon")
    const greenIcon = document.getElementById("dashboard-green-icon")
    const modalContent: HTMLDivElement = document.querySelector("#dashboard-modal-content")
    const alertType = document.getElementById("dashboard-icon-modal")
    typeMessage.innerHTML = messageType
    messageModal.innerHTML = modalMessage
    checkIcon.style.display = 'block'
    exclamationIcon.style.display = 'none'
    greenIcon.style.display = 'block'
    redIcon.style.display = 'none'
    modalContent.style.color = 'rgb(39, 165, 87)';
    modalContent.style.borderColor = 'rgb(4, 107, 4)';
    modalContent.style.backgroundColor = 'rgb(191, 238, 201)';
    messageModal.style.color = 'rgb(97, 177, 127)';
    alertType.style.backgroundColor = 'rgb(39, 165, 87)';
    typeMessage.style.color = 'rgb(39, 165, 87)'
    // messageModal.style.color = 'rgb(214, 111, 111)'
  }
  errorModal(messageType, modalMessage) {
    const closeModal: HTMLDivElement = document.querySelector("#dashboard-modal")
    closeModal.style.display = 'flex'
    const checkIcon = document.getElementById("checkIcon")
    const exclamationIcon = document.getElementById("exclamationIcon")
    const typeMessage: HTMLSpanElement = document.querySelector("#dashboard-message-type")
    const messageModal: HTMLParagraphElement = document.querySelector("#dashboard-modal-message")
    const redIcon = document.getElementById("dashboard-red-icon")
    const greenIcon = document.getElementById("dashboard-green-icon")
    const modalContent: HTMLDivElement = document.querySelector("#dashboard-modal-content")
    const alertType = document.getElementById("dashboard-icon-modal")
    typeMessage.innerHTML = messageType
    messageModal.innerHTML = modalMessage
    checkIcon.style.display = 'none'
    exclamationIcon.style.display = 'block'
    greenIcon.style.display = 'none'
    redIcon.style.display = 'flex'
    modalContent.style.backgroundColor = 'rgb(255, 217, 211)'
    modalContent.style.color = 'rgb(214, 111, 111)'
    modalContent.style.borderColor = 'red'
    alertType.style.backgroundColor = 'rgb(221, 82, 48)'
    typeMessage.style.color = '#ad3939'
    messageModal.style.color = 'rgb(214, 111, 111)'
  }
  uploadImg() {
    const text: HTMLTextAreaElement = document.querySelector("#post-content")
    const postForm: HTMLFormElement = document.querySelector("#post-create-form")
    const imageContainer: HTMLDivElement = document.querySelector("#img-container")
    const fileContainer: HTMLDivElement = document.querySelector("#img-file-container")
    const imgClose = document.getElementById("img-close")
    text.style.height = '120px'
    fileContainer.style.display = 'flex'

    imageContainer.style.display = 'flex'
    // postForm.style.height = '700px'
  }

  deleteImage(i) {
    console.log(i)
    this.images.splice(i, 1);
    // i = i.filter((a) => a !== i);
  }
  // Upload Image
  selectFile(event) {
    const imageContainer: HTMLDivElement = document.querySelector("#img-container")
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader()
        reader.onload = (event) => {
          this.images.push(event.target.result);

        }
        this.profFile = event.target.files[i];
        reader.readAsDataURL(event.target.files[i]);
        console.log('Profile: ' + this.profFile);
      }
      this.selectedFile = event.target.files[0];
    }
    // var reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (event) => {
    //   this.profFile = event.target.result;
    //   console.log('Profile: ' + this.profFile)
    // }
    // this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    console.log(this.selectedFile);
    console.log(this.selectedFile.name)
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, this.selectedFile.name)

    this.httpClient.post('http://localhost:8080/flfile/upload',
      uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          console.log("Uploaded Successfully")
          console.log(this.selectedFile.name)
        } else {
          console.log("Image not Uploaded")
        }
      });
  }
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  getImage() {
    this.httpClient.get(`http://localhost:8080/flfile/upload/49`)
      .subscribe(
        res => {
          console.log(res);
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.data;
          console.log(this.base64Data);
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
    console.log(this.retrievedImage);
    this.thisUrl = this.retrievedImage;
  }
}
