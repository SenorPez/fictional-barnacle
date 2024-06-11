import {PrimaryStarCategory} from './primary-star-category';
import {RollService} from "../roll.service";
import {LoggerService} from "../logger.service";

describe('PrimaryStarCategory', () => {
  const logger: LoggerService = new LoggerService();
  const roller: RollService = new RollService(logger);
  let instance: PrimaryStarCategory;

  beforeEach(() => {
    instance = new PrimaryStarCategory(logger, roller);
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});
