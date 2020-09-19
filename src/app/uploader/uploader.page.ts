import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { PostService } from '../post.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  uploadPercent: Observable<number>;

  downUrl: string;
  desc: string;

  busy: boolean = false

  @ViewChild("fileButton") fileButton

  constructor(
    private storage: AngularFireStorage,
    public afs: AngularFirestore,
    public user: UserService,
    public post: PostService,
    private alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  async createPost() {
    this.busy = true;
    const image = this.downUrl
    const desc = this.desc

    const postId = this.post.createNewId();

    this.afs.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(postId)
    })

    this.afs.doc(`posts/${postId}`).set({
      postId: postId,
      image,
      desc,
      author: this.user.getUsername(),
      likes: []
    })

    this.busy = false
    this.downUrl = ""
    this.desc = ""

    const alert = await this.alertController.create({
      header: "Done!",
      message: "Your post is created successfully.",
      buttons: ['Ok']
    })

    await alert.present()

    this.router.navigate(['/tabs/profile']);

  }

  uploadFile() {
    this.fileButton.nativeElement.click()
  }

  fileChanged(event) {
    this.busy = true;
    const file = event.target.files[0];
    const filePath = event.target.files[0].name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            value => {
              this.downUrl = value
              this.busy = false
            }
          );
        } )
     )
    .subscribe()
  }

}
