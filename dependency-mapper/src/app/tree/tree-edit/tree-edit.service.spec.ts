import { TestBed } from '@angular/core/testing';

import { TreeEditService } from './tree-edit.service';

describe('TreeEditService', () => {
  let service: TreeEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
