import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  title: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  createMap() {
    this.dataService.generateNewMap(this.title);
  }

}
