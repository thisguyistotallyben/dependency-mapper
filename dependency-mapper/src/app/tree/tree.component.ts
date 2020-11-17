import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mermaid from 'mermaid';
import { TreeService } from './tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements AfterViewInit {
  @ViewChild('mermaidDiv') mermaidDiv: ElementRef;

  constructor(private treeService: TreeService) {
    this.treeService.component = this;
  }

  public ngAfterViewInit(): void {
    mermaid.initialize({
      flowchart:{
        useMaxWidth:false,
        curve:'basis',
      },
      theme: 'forest',
      securityLevel: 'loose'
    });
    mermaid.init();
  }

  renderTree(): void {
    const element: any = this.mermaidDiv.nativeElement;
    const graphDefinition = this.treeService.generateSyntax();
    // const graphDefinition = 'graph TD\nA';
    mermaid.render('graphDiv', graphDefinition, (svgCode, bindFunctions) => {
        element.innerHTML = svgCode;
        bindFunctions(element);
    });
  }

}
