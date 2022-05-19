import { Component, OnInit } from '@angular/core';
import { postInterface } from 'src/app/mock-post-interface';
import { imageInterface } from 'src/app/mock-image-interface';
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
import { decode, stringify } from 'querystring';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, NgForm } from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { FileService } from 'src/app/dashboard-service/file.service';
import { url } from 'inspector';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { type } from 'os';
import { deepStrictEqual } from 'assert';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  // for file
  images = [];
  thisImages: any;
  base64Data: any;
  retrieveResponse: any;
  selectedFile: File;
  retrievedImage: any;
  thisArray = ["Hello", "Hi", "YO"];
  imageSrc = 'assets/yaeWP.jpg'
  // imageArray = ['assets/yaeWP.jpg', 'assets/bg.jpg', 'assets/register-bg.jpg']
  imageArray = [];

  cnt: number;
  private count = 0;
  nameContainer = [];
  folderName = "first";
  imagename: string;
  sampleImage: any;

  profIdNumber: string;
  profName: string;
  profEmail: string;
  profTextPost: string;
  profMobile: string;
  profPostTime: string;
  profFile: any;
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
  imageTracker: imageInterface[] = [];
  constructor(private postObj: PostService, private httpClient: HttpClient,
    private fileService: FileService) { }

  ngOnInit(): void {
    this.postObj
      .getPostFromPostService()
      .subscribe((p) => {
        this.postVariable = p;
      });
    this.postObj
      .getImagesFromService()
      .subscribe((i) => {
        this.imageTracker = i;
      })

    let flupdatesConVar: HTMLDivElement =
      document.querySelector('.flupdates-con');
    flupdatesConVar.style.display = 'none';
    let pollConVar: HTMLDivElement = document.querySelector('.poll-con');
    pollConVar.style.display = 'none';
    let diagramConVar: HTMLDivElement = document.querySelector('.diagram-con');
    diagramConVar.style.display = 'none';
    this.closeUpdateForm();
  }

  // After ngOnInit
  thisUrl = "./assets/yaeWP.jpg";

  closeTimes() {
    const postContent: HTMLInputElement =
      document.querySelector('#post-content');
    const closeTimes: HTMLDivElement =
      document.querySelector('#post-main-modal');
    const postFileContent: HTMLInputElement =
      document.querySelector('#post-file-content');
    const closeFileTimes: HTMLDivElement = document.querySelector(
      '#post-file-main-modal'
    );
    postContent.value = null;
    postContent.style.height = '200px'
    closeTimes.style.display = 'none';
    const text: HTMLTextAreaElement = document.querySelector("#post-content")

    // Image related
    const imageContainer: HTMLDivElement = document.querySelector("#img-container")
    text.style.height = '200px'
    imageContainer.style.display = 'none'
    this.images.splice(0, this.images.length)
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
    const posttModal: HTMLDivElement = document.querySelector(
      '#post-file-main-modal'
    );
    posttModal.style.display = 'flex';
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
    this.thisArray.push(this.profTextPost);
    // FormData
    const newPost = {
      profName: (this.profName = postName.textContent),
      profEmail: (this.profEmail = postEmail.textContent),
      profTextPost: this.profTextPost,
      profPostTime: (this.profPostTime = String(
        date.toLocaleTimeString('en-US', format)
      )),
      // profFile: (!this.imagename ? null : this.imagename)
      profFile: (this.images.length == 0 ? null : this.imagename)

    };
    if (!this.profTextPost) {
      this.errorModal('Error', 'Post cannot be void');
      // return alert('Post cannot be void');
    } else {
      // Post Upload
      this.postObj
        .addPostFromPostService(newPost)
        .subscribe((p) => this.postVariable.push(newPost));
      this.profTextPost = null;
      if (this.images.length != 0) {
        // Image Upload
        const uploadImageData = new FormData();
        uploadImageData.append('file', this.selectedFile, this.selectedFile.name)
        this.postObj.uploadImageFromService(uploadImageData)
          .subscribe((i) => (console.log(i)));
      }
      for (let x = 0; x < 4; x++) {
        this.postObj
          .getPostFromPostService()
          .subscribe((p) => (this.postVariable = p));
      }
      for (let x = 0; x < 4; x++) {
        this.postObj
          .getImagesFromService()
          .subscribe((i) => {
            this.imageTracker = i;
          })
      }
      this.successModdal('Success', 'Post Uploaded');
      this.closeTimes();
    }
  }

  // For delete and update'
  deletePost(postToBeDeleted: postInterface) {
    const profileName: HTMLHeadingElement =
      document.querySelector('#profileName');
    const profileEmail: HTMLParagraphElement =
      document.querySelector('#profileEmail');
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
      for (let img of this.imageTracker) {
        if (postToBeDeleted.profFile === img.filename) {
          console.log(img)
          this.postObj.deleteImageFromService(img)
            .subscribe(() => (this.postVariable = this.postVariable.filter(
              (d) => d.id !== img.id
            )))
        }
      }
      this.successModdal('Success', 'Post Deleted');
    } else {
      this.errorModal('Error', 'Not Your Account!');
    }
  }

  //toggle update form
  toggleUpdatePostForm(postTobeUpdated: postInterface) {
    const profileName: HTMLHeadingElement =
      document.querySelector('#profileName');
    const profileEmail: HTMLParagraphElement =
      document.querySelector('#profileEmail');
    const updateImg: HTMLInputElement = document.querySelector('#post-update-files')
    const adjustJustify: HTMLDivElement = document.querySelector('.update-post-container')
    const updateImage: HTMLDivElement = document.querySelector("#img-update-container")
    const text: HTMLTextAreaElement = document.querySelector("#updatePostText")
    if (
      profileName.textContent === postTobeUpdated.profName &&
      profileEmail.textContent === postTobeUpdated.profEmail
    ) {
      this.holder = postTobeUpdated;
      // Opens the update form
      let mainUpdateCon: HTMLDivElement =
        document.querySelector('.main-update-con');
      mainUpdateCon.style.display = 'flex';
      let updateTextArea: HTMLTextAreaElement =
        document.querySelector('.update-textarea');
      updateTextArea.value = postTobeUpdated.profTextPost;
      // If it contains image
      if (postTobeUpdated.profFile) {
        updateImage.style.display = 'flex'
        text.style.height = '120px'
        for (let img of this.imageTracker) {
          if (postTobeUpdated.profFile === img.filename) {
            console.log(typeof img.filename)
            const imageUpdate = document.getElementById("img-update-file") as HTMLImageElement;
            imageUpdate.src = 'data:image/jpeg;base64,' + img.data
          }
        }
        updateImg.style.display = 'none'
        adjustJustify.style.justifyContent = 'flex-end'
      } else {
        text.style.height = ''
        adjustJustify.style.justifyContent = 'flex-end'
      }

    } else {
      this.errorModal('Error', 'Not Your Account!');
    }
  }

  // Update the post, toggleUpdatePostForm
  updateThePost() {
    let postContent: HTMLTextAreaElement =
      document.querySelector('#updatePostText');
    this.holder.profTextPost = postContent.value;
    this.postObj.updatePostFromPostService(this.holder).subscribe();
    this.successModdal('Success', 'Post Updated');
    this.closeUpdateForm();
  }

  closeUpdateForm() {
    const updateImage: HTMLDivElement = document.querySelector("#img-update-container")
    const text: HTMLTextAreaElement = document.querySelector("#updatePostText")
    updateImage.style.display = 'none'
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
    let flupdatesConVar: HTMLDivElement =
      document.querySelector('.flupdates-con');
    flupdatesConVar.style.display = 'none';
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

    let flupdatesTabBottomLine: HTMLDivElement =
      document.querySelector('.flupdates-tab');
    flupdatesTabBottomLine.style.borderBottom = '5px solid transparent';
  }
  toggleFlUpdatesCon() {
    let postConVar: HTMLDivElement = document.querySelector('.post-con');
    postConVar.style.display = 'none';
    let pollConVar: HTMLDivElement = document.querySelector('.poll-con');
    pollConVar.style.display = 'none';
    let diagramConVar: HTMLDivElement = document.querySelector('.diagram-con');
    diagramConVar.style.display = 'none';
    let flupdatesConVar: HTMLDivElement =
      document.querySelector('.flupdates-con');
    flupdatesConVar.style.display = 'block';
    ////////////////////////
    let postTabBottomLine: HTMLHeadingElement =
      document.querySelector('.post-tab');
    postTabBottomLine.style.borderBottom = '5px solid transparent';

    let pollTabBottomLine: HTMLHeadingElement =
      document.querySelector('.poll-tab');
    pollTabBottomLine.style.borderBottom = '5px solid transparent';

    let diagramTabBottomLine: HTMLHeadingElement =
      document.querySelector('.diagram-tab');
    diagramTabBottomLine.style.borderBottom = '5px solid transparent';

    let flupdatesTabBottomLine: HTMLDivElement =
      document.querySelector('.flupdates-tab');
    flupdatesTabBottomLine.style.borderBottom = '5px solid #2e89ff';
  }
  togglePollCon() {
    let postConVar: HTMLDivElement = document.querySelector('.post-con');
    postConVar.style.display = 'none';
    let pollConVar: HTMLDivElement = document.querySelector('.poll-con');
    pollConVar.style.display = 'block';
    let diagramConVar: HTMLDivElement = document.querySelector('.diagram-con');
    diagramConVar.style.display = 'none';
    let flupdatesConVar: HTMLDivElement =
      document.querySelector('.flupdates-con');
    flupdatesConVar.style.display = 'none';
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

    let flupdatesTabBottomLine: HTMLDivElement =
      document.querySelector('.flupdates-tab');
    flupdatesTabBottomLine.style.borderBottom = '5px solid transparent';
  }
  toggleDiagramCon() {
    let postConVar: HTMLDivElement = document.querySelector('.post-con');
    postConVar.style.display = 'none';
    let pollConVar: HTMLDivElement = document.querySelector('.poll-con');
    pollConVar.style.display = 'none';
    let diagramConVar: HTMLDivElement = document.querySelector('.diagram-con');
    diagramConVar.style.display = 'block';
    let flupdatesConVar: HTMLDivElement =
      document.querySelector('.flupdates-con');
    flupdatesConVar.style.display = 'none';
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

    let flupdatesTabBottomLine: HTMLDivElement =
      document.querySelector('.flupdates-tab');
    flupdatesTabBottomLine.style.borderBottom = '5px solid transparent';
  }

  closeModalDashboard() {
    const closeModal: HTMLDivElement =
      document.querySelector('#dashboard-modal');
    closeModal.style.display = 'flex';
    this.successModdal('Success', 'Post Uploaded');
  }

  // Modal Message
  successModdal(messageType, modalMessage) {
    const closeModal: HTMLDivElement =
      document.querySelector('#dashboard-modal');
    closeModal.style.display = 'flex';
    const checkIcon = document.getElementById('checkIcon');
    const exclamationIcon = document.getElementById('exclamationIcon');
    const typeMessage: HTMLSpanElement = document.querySelector(
      '#dashboard-message-type'
    );
    const messageModal: HTMLParagraphElement = document.querySelector(
      '#dashboard-modal-message'
    );
    const redIcon = document.getElementById('dashboard-red-icon');
    const greenIcon = document.getElementById('dashboard-green-icon');
    const modalContent: HTMLDivElement = document.querySelector(
      '#dashboard-modal-content'
    );
    const alertType = document.getElementById('dashboard-icon-modal');
    typeMessage.innerHTML = messageType;
    messageModal.innerHTML = modalMessage;
    checkIcon.style.display = 'block';
    exclamationIcon.style.display = 'none';
    greenIcon.style.display = 'block';
    redIcon.style.display = 'none';
    modalContent.style.color = 'rgb(39, 165, 87)';
    modalContent.style.borderColor = 'rgb(4, 107, 4)';
    modalContent.style.backgroundColor = 'rgb(191, 238, 201)';
    messageModal.style.color = 'rgb(97, 177, 127)';
    alertType.style.backgroundColor = 'rgb(39, 165, 87)';
    typeMessage.style.color = 'rgb(39, 165, 87)';
  }
  errorModal(messageType, modalMessage) {
    const closeModal: HTMLDivElement =
      document.querySelector('#dashboard-modal');
    closeModal.style.display = 'flex';
    const checkIcon = document.getElementById('checkIcon');
    const exclamationIcon = document.getElementById('exclamationIcon');
    const typeMessage: HTMLSpanElement = document.querySelector(
      '#dashboard-message-type'
    );
    const messageModal: HTMLParagraphElement = document.querySelector(
      '#dashboard-modal-message'
    );
    const redIcon = document.getElementById('dashboard-red-icon');
    const greenIcon = document.getElementById('dashboard-green-icon');
    const modalContent: HTMLDivElement = document.querySelector(
      '#dashboard-modal-content'
    );
    const alertType = document.getElementById('dashboard-icon-modal');
    typeMessage.innerHTML = messageType;
    messageModal.innerHTML = modalMessage;
    checkIcon.style.display = 'none';
    exclamationIcon.style.display = 'block';
    greenIcon.style.display = 'none';
    redIcon.style.display = 'flex';
    modalContent.style.backgroundColor = 'rgb(255, 217, 211)';
    modalContent.style.color = 'rgb(214, 111, 111)';
    modalContent.style.borderColor = 'red';
    alertType.style.backgroundColor = 'rgb(221, 82, 48)';
    typeMessage.style.color = '#ad3939';
    messageModal.style.color = 'rgb(214, 111, 111)';
  }
  uploadImg() {
    const text: HTMLTextAreaElement = document.querySelector("#post-content")
    const imageContainer: HTMLDivElement = document.querySelector("#img-container")
    text.style.height = '120px'
    imageContainer.style.display = 'flex'
  }

  deleteImage(i) {

    console.log(i)
    this.images.splice(i, 1);
    this.images = this.images.filter((a) => a !== i);
    const elem: HTMLImageElement = document.querySelector('#img-file');
    elem.style.opacity = '1'
  }
  // Upload Image
  selectFile(event) {
    this.selectedFile = event.target.files[0];
    this.count = event.target.files.length;
    if (event.target.files.length <= 1 && this.images.length < 1) {
      var changeName = 0;
      var filesAmount = event.target.files.length;
      const formData = new FormData()
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader()
        reader.onload = (event) => {
          this.images.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i])
        var fileName = event.target.files[i].name;
        console.log(fileName);
        this.imagename = fileName;
        // reader.onload = this.handleReader.bind(this);
        // reader.readAsBinaryString(event.target.files[i])
      }
    } else {
      this.errorModal('Error', 'Max of 4 images only')
    }
  }
  handleReader(e) {
    this.images.push('data:image/png;base64,' + btoa(e.target.result));
    console.log(typeof this.thisArray)
    // var decoder = this.toUTF8Array(this.images[0]);
    // console.log(btoa(e.target.result))
    this.thisImages = ('data:image/png;base64,' + btoa(e.target.result));
    console.log(this.thisImages)
    console.log(this.images.toString())
  }

  uploadImage() {
    console.log(this.selectedFile);
    console.log(this.selectedFile.name)
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, this.selectedFile.name)
    // localhost:8080//flfile/upload
    this.httpClient.post('http://localhost:5000/post',
      uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          alert('Success!')
          console.log(this.selectedFile.name)
        } else {
          console.log(response.status)
          console.log("Image not Uploaded")
        }
      });
  }
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  getImage() {
    this.httpClient.get(`http://localhost:5000/post/53`)
      .subscribe(
        res => {
          console.log("RES:")
          console.log(res);
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.profFile;
          console.log("IMAGE:")
          console.log(this.base64Data);
          this.retrievedImage = this.base64Data;

        }
      );
  }
}
