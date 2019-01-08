import { Component, ViewChild, OnInit,} from '@angular/core';
import { HeaderComponent } from "./core/header/header.component";
import * as firebase from 'firebase';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
feature: string = "recipes";
// @Input() dataOut;

// constructor(private router: Router){};

ngOnInit() {
  firebase.initializeApp({
    apiKey: "AIzaSyCdbMDl1ljw0cFXTeefUVTFoQpnXevj3Dc",
    authDomain: "ng-recipe-book-67e9a.firebaseapp.com"
  });
}

@ViewChild(HeaderComponent) header;

// messageFrHead; 
messageFrApp = "Hi from the App!";

onGoto(option: string) {
    this.feature = option;
    console.log('app-component has received : ' + this.feature);
  }

  // ngAfterViewInit() {
  //   // this.messageFrHead = this.header.message;
  //   console.log('message from head = ' + this.header.message);
  // }

}
