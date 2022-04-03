import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService, Ticket } from 'src/app/data.service';
import { State, TreeEditService } from 'src/app/tree/tree-edit/tree-edit.service';

@Component({
  selector: 'app-mapper-embed-popover',
  templateUrl: './mapper-embed-popover.component.html',
  styleUrls: ['./mapper-embed-popover.component.scss']
})
export class MapperEmbedPopoverComponent implements OnInit {
  yeet = 'yes';
  hasValidUrl = true;
  currentTicket: Ticket;

  posXOffset = 0;
  posYOffset = 0;

  constructor(
    private dataService: DataService,
    private treeEditService: TreeEditService,
    private changeDetector: ChangeDetectorRef) {
    const that = this;
    window['treeClick'] = function(nodeId) {
      treeEditService.handleTreeClick(nodeId);
    }
  }

  ngOnInit(): void {
    this.treeEditService.stateObserver.subscribe(
      x => {
        if (x == State.Menu) {
          this.currentTicket = this.dataService.getTicket(this.treeEditService.currentNodeId);
          if (!this.ticketHasURL) {
            this.treeEditService.closeMenu();
          }
          this.changeDetector.detectChanges();
        } else {
          this.changeDetector.detectChanges();
        }
      },
      err => console.error(err),
      () => console.warn('tree state observer done')
    );
  }

  closePopover() {
    this.hasValidUrl = true;
    this.treeEditService.closeMenu();
    this.posXOffset = 0;
    this.posYOffset = 0;
  }

  handlePosition(position: any): void {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    const popoverWidth = position.width;
    const popoverHeight = position.height;
    const mouseX = this.treeEditService.popoverPosX;
    const mouseY = this.treeEditService.popoverPosY;

    if (mouseX + popoverWidth > pageWidth) {
      this.posXOffset = 0 - popoverWidth;
    }

    if (mouseY + popoverHeight > pageHeight) {
      this.posYOffset = 0 - popoverHeight;
    }

    this.changeDetector.detectChanges();
  }

  get posX(): string {
    const positon = this.treeEditService.popoverPosX + this.posXOffset;
    return positon + 'px';
  }

  get posY(): string {
    const positon = this.treeEditService.popoverPosY + this.posYOffset;
    return positon + 'px';
  }

  get isPopoverOpen(): boolean {
    return this.treeEditService.menuIsOpen;
  }

  get UrlHostname(): string {
    return this.treeEditService.getURLHostname(this.currentTicket.url);
  }

  get formattedURL(): string {
    return this.treeEditService.formatUrl(this.currentTicket.url);
  }

  get ticketHasURL() {
    return this.currentTicket.url !== '';
  }

  get faviconURL() {
    return this.treeEditService.getUrlOrigin(this.currentTicket.url) + '/favicon.ico';
  }

  handleIconLoadError() {
    this.hasValidUrl = false;
    this.changeDetector.detectChanges();
  }
}
