import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app';
import { UserService } from '../user.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  postId: string
  post

  postRef: AngularFirestoreDocument
  sub

  heartType: string = "heart-outline"

  constructor(
    private route: ActivatedRoute, 
    private afs: AngularFirestore,
    private user: UserService
  ) { 
      
  }

  ngOnInit() {
     this.postId = this.route.snapshot.paramMap.get("id")
     this.postRef = this.afs.doc(`posts/${this.postId}`)
     this.sub = this.postRef.valueChanges().subscribe(val => {
      this.post = val
      this.heartType = val.likes.includes(this.user.getUID()) ? "heart" : "heart-outline"
    })
  }

  ngOnDestory() {
    this.sub.unsubscribe()
  }

  toggleHeart() {
    if(this.heartType == "heart-outline") {
      this.postRef.update({
        likes: firestore.FieldValue.arrayUnion(this.user.getUID())
      })
    } else {
      this.postRef.update({
        likes: firestore.FieldValue.arrayRemove(this.user.getUID())
      })
    }
  }

}
