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

  constructor(private treeService: TreeService, private dataService: DataService) {
    this.treeService.component = this;
  }

  public ngAfterViewInit(): void {
    console.log('jfklajsflkjdslkfd');
    mermaid.initialize({
      flowchart:{
        useMaxWidth:false,
        curve:'basis',
      },
      securityLevel: 'loose'
    });
    mermaid.init();

    this.dataService.ticketObserver.subscribe(
      x => this.renderTree(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('tree rendering subscription for tickets finished')
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
    console.log('wow i am here');
    const element: any = this.mermaidDiv.nativeElement;
    const graphDefinition = this.treeService.generateSyntax();
    // const graphDefinition = 'graph TD\nA';
    mermaid.render('graphDiv', graphDefinition, (svgCode, bindFunctions) => {
        element.innerHTML = svgCode;
        bindFunctions(element);
    });
  }

}
