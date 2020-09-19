import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { UserService } from './user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { PostService } from './post.service';
import { ShareModule } from './share.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [  
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    ShareModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    AuthService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
