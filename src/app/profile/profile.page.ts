import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  userPosts

  constructor(
    public router: Router,
    private afs: AngularFirestore,
    private user: UserService
  ) {

    const posts = this.afs.collection("posts", ref => ref.where( 'author','==', user.getUsername()))
    posts.valueChanges().subscribe(post => {
      this.userPosts = post;
    })

    // this.afAuth.authState.subscribe(authState => {
    //   if (authState) {
    //     const posts = this.afs.collection("posts", ref => ref.where( 'author','==', authState.email.split("@")[0]))
    //     posts.valueChanges().subscribe(post => {
    //       this.userPosts = post;
    //     })
    //   }
    // });

  }

  goTo(postId: string) {
    this.router.navigate(["/tabs/post/" + postId])
  }

  ngOnInit() {
  }

}
