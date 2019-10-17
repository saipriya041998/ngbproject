import { TestBed } from '@angular/core/testing';

import { ArtserService } from './artser.service';

describe('ArtserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtserService = TestBed.get(ArtserService);
    expect(service).toBeTruthy();
  });
});
