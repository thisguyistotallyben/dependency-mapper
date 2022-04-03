import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-mapper-embed',
  templateUrl: './mapper-embed.component.html',
  styleUrls: ['./mapper-embed.component.scss']
})
export class MapperEmbedComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if (params.mapId) {
        this.firebaseService.loadMap(params.mapId);
      }
    });
  }

}
