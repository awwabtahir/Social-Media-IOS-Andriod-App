import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afs: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, cpassword} = this
    if(password != cpassword) {
      this.showAlert("Error!", "Passwords don't match.");
      return console.error("Passwords don't match.");
    }

    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(username + '@socialapp.com', password);
      console.log(res);

      this.afs.doc(`users/${res.user.uid}`).set({
        username
      })

      this.user.setUser({
        username,
        uid: res.user.uid
      })

      this.showAlert("Success", "You are registered.");
      this.router.navigate(["/tabs"]);
      
    } catch(err) {
      console.dir(err);
      this.showAlert("Error", err.message);
    }

  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    });

    await alert.present()
  }

}
