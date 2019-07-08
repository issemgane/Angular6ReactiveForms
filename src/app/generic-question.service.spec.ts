import { TestBed } from '@angular/core/testing';

import { GenericQuestionService } from './generic-question.service';

describe('GenericQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericQuestionService = TestBed.get(GenericQuestionService);
    expect(service).toBeTruthy();
  });
});
