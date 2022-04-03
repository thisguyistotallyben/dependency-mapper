import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mermaid from 'mermaid';
import { DataService } from '../data.service';
import { TreeService } from './tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements AfterViewInit {
  @ViewChild('mermaidDiv') mermaidDiv: ElementRef;
  color = 'blue';

  constructor(private treeService: TreeService, private dataService: DataService) { }

  public ngAfterViewInit(): void {
    mermaid.initialize({
      flowchart:{
        useMaxWidth:false,
        curve:'basis',
      },
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: "Varela Round",
        borderRadius: "2px"
      }
    });
    mermaid.init();

    this.dataService.genericObserver.subscribe(
      x => this.renderTree(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('generic tree rendering subscription finished')
    );

    this.dataService.ticketObserver.subscribe(
      x => this.renderTree(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('tree rendering subscription for tickets finished')
    );

    this.dataService.groupObserver.subscribe(
      x => this.renderTree(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('tree rendering subscription for dependencies finished')
    );

    this.dataService.dependencyObserver.subscribe(
      x => this.renderTree(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('tree rendering subscription for dependencies finished')
    );

    this.dataService.tagObserver.subscribe(
      x => this.renderTree(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('tree rendering subscription for dependencies finished')
    );
  }

  renderTree(): void {
    const element: any = this.mermaidDiv.nativeElement;
    const graphDefinition = this.treeService.generateSyntax();
    // console.log(graphDefinition);
    mermaid.render('graphDiv', graphDefinition, (svgCode, bindFunctions) => {
      element.innerHTML = svgCode;
      bindFunctions(element);
    });
  }

}
