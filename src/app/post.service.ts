import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class PostService {

    userPosts

    constructor(
        private afs: AngularFirestore
    ) {
    }

    createNewId() {

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let autoId = ''
        for (let i = 0; i < 20; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length))
        }

        return autoId;

    }
}