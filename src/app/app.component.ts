import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    const vm = this;
    vm.loadedFeature = feature;
  }

  ngOnInit() {
    firebase.initializeApp ({
      apiKey: 'AIzaSyDwWWOZmJvWOlGLZwT0bQMM0jBBYnjYTTU',
      authDomain: 'ng-recipe-book-2dfef.firebaseapp.com'
    })
  }
}
