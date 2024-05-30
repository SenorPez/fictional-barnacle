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

  it('should pick a random primary star category', () => {
    const debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});

    const value: string = instance.GetRandomPrimaryStarCategory();
    const allowedValues: string[] = [
      "Brown Dwarf",
      "Low Mass Star",
      "Intermediate Mass Star",
      "High Mass Star"
    ];

    expect(allowedValues).toContainEqual(value);

    expect(debugSpy).toHaveBeenCalled();
    expect(debugSpy).toHaveBeenCalledTimes(2);
    expect(debugSpy.mock.calls).toContainEqual([expect.stringMatching(/^Roll: \d{1,3}, Primary Star Category: .*$/)]);

    debugSpy.mockRestore();
  });
});
