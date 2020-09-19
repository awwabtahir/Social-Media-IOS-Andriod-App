import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  posts
  postsRef
  sub

  heartType: string = "heart-outline"

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
    
   }

  ngOnInit() {
    const getFeed = this.afs.collection("posts")
    this.postsRef = getFeed.valueChanges()
    this.sub = this.postsRef.subscribe(val => {
      this.posts = val
    })
  }

  ngOnDestory() {
    this.sub.unsubscribe()
  }

  goTo(postId: string) {
    this.router.navigate(["/tabs/post/" + postId])
  }

}
