import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-mapper-embed-header',
  templateUrl: './mapper-embed-header.component.html',
  styleUrls: ['./mapper-embed-header.component.scss']
})
export class MapperEmbedHeaderComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataService.titleObserver.subscribe(
      x => this.changeDetector.detectChanges(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  editMap(): void {
    let url = '/' + this.dataService.mapId;

    window.open(url, "_blank");
  }

  get title(): string {
    return this.dataService.title;
  }
}
