import { StellarMass } from './stellar-mass';
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

  describe('getStellarMass', () => {
    it.each([
      [
        "Brown Dwarf", [
        0.015,
        0.02,
        0.03,
        0.04,
        0.05,
        0.06,
        0.07
      ],
        "Low Mass Star", [
        0.08,
        0.10,
        0.12,
        0.15,
        0.18,
        0.22,
        0.26,
        0.30,
        0.34,
        0.38,
        0.42,
        0.46,
        0.50,
        0.53,
        0.56,
        0.59,
        0.62,
        0.65,
        0.68
      ],
        "Intermediate Mass Star", [
        0.70,
        0.72,
        0.74,
        0.76,
        0.78,
        0.80,
        0.82,
        0.84,
        0.86,
        0.88,
        0.90,
        0.92,
        0.94,
        0.96,
        0.98,
        1.00,
        1.02,
        1.04,
        1.07,
        1.10,
        1.13,
        1.16,
        1.19,
        1.22,
        1.25
      ],
        "High Mass Star", [
        1.28,
        1.31,
        1.34,
        1.37,
        1.40,
        1.44,
        1.48,
        1.53,
        1.58,
        1.64,
        1.70,
        1.76,
        1.82,
        1.90,
        2.00,
        2.10,
        2.20,
        2.30,
        2.40,
        2.60,
        2.80,
        3.00,
        3.20,
        3.50,
        4.00,
        4.50,
        5.00,
        5.50,
        6.00
      ]
      ]
    ])('should return a %s mass', (category, allowedValues) => {
      const debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});

      const value: number = instance.GetRandomStellarMass(category);
      expect(allowedValues).toContainEqual(value);

      expect(debugSpy).toHaveBeenCalled();
      expect(debugSpy).toHaveBeenCalledTimes(2);
      expect(debugSpy.mock.calls).toContainEqual([expect.stringMatching(/^Category: .+, Roll: \d{1,3}, Stellar Mass: \d\.\d+$/)])

      debugSpy.mockRestore();
    });
  });
});
