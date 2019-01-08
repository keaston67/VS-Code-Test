import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
    // add a token property
    token: string;
    

    constructor( private router: Router,
                private route : ActivatedRoute
                ) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)
        );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            // response => console.log(response)
            // in response set the token value
            response => {
                this.router.navigate(['/'])
                firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => this.token = token
                      
                )
                // my play code:
                // .then(
                //     (token) => console.log('token issued:' + token))
                // .then(
                //     () => 
                //     this.router.navigate(['/'])
                // )
            }
        )
        .catch(
            error => console.log(error)
        );
    }

    
    getToken() {
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => this.token
        );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

}