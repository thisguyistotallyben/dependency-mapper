import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FirebaseService } from './firebase.service';
import { TreeEditService } from './tree/tree-edit/tree-edit.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private dataService: DataService,
    private treeEditService: TreeEditService,
    private firebaseService: FirebaseService) { }
}
