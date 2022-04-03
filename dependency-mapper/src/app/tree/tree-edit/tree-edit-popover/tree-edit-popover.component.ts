import { AfterContentInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

/*
  TODO: Move actual popover stuff to here to make the tree-edit component smaller
*/

@Component({
  selector: 'app-tree-edit-popover',
  templateUrl: './tree-edit-popover.component.html',
  styleUrls: ['./tree-edit-popover.component.scss']
})
export class TreeEditPopoverComponent implements AfterContentInit {
  @ViewChild("popover") popoverField: ElementRef;
  @Output() size = new EventEmitter<any>();

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterContentInit() {
    this.changeDetector.detectChanges();
    this.size.emit({
      width: this.popoverField.nativeElement.offsetWidth,
      height: this.popoverField.nativeElement.offsetHeight
    });
  }

}
