import {StellarMass} from './stellar-mass';
import {LoggerService} from "../logger.service";
import {RollService} from "../roll.service";

describe('StellarMass', () => {
  const logger: LoggerService = new LoggerService();
  const roller: RollService = new RollService(logger);
  let instance: StellarMass;

  beforeEach(() => {
    instance = new StellarMass(logger, roller);
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});
