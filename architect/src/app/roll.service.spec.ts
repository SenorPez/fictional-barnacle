import { TestBed } from '@angular/core/testing';

import { RollService } from './roll.service';

describe('RollService', () => {
  let service: RollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Roll d100', () => {
    it('should return a number between 1 and 100, inclusive', () => {
      const roll: number = service.d100();
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(100);
    });

    it('should send debug information', () => {
      const debugSpy = jest.spyOn(console, 'debug');

      const roll: number = service.d100();

      expect(debugSpy).toHaveBeenCalled();
      expect(debugSpy).toHaveBeenCalledTimes(1);
      expect(debugSpy).toHaveBeenCalledWith(`Min Bound: 1, Max Bound: 100, Roll: ${roll}`);
    });
  });
});
