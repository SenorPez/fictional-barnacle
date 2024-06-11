import {LoggerService} from "../logger.service";
import {RollService} from "../roll.service";

type StellarMassTable = {
  roll: () => number,
  values: ({
    starCategory: string,
    values: ({
      rangeStart:number, rangeEnd: number, mass: number
    })[]
  })[]
};

class StellarMassLookupError extends RangeError {
  constructor(value: number | string, table: StellarMassTable, logger: LoggerService) {
    super();

    logger.error("Lookup Value Not Found");
    logger.error(`Lookup: ${value}`);
    logger.error(`Table: ${table}`);
    this.name = "StellarMassLookupError";
  }
}

export class StellarMass {
  constructor(
    private logger: LoggerService,
    private roller: RollService
  ) { }

  private readonly table: StellarMassTable = {
    roll: () => this.roller.d100(),
    values: [
      {
        starCategory: "Brown Dwarf", values: [
          {rangeStart: 1,  rangeEnd: 10,  mass: 0.015},
          {rangeStart: 11, rangeEnd: 29,  mass: 0.02},
          {rangeStart: 30, rangeEnd: 45,  mass: 0.03},
          {rangeStart: 46, rangeEnd: 60,  mass: 0.04},
          {rangeStart: 61, rangeEnd: 74,  mass: 0.05},
          {rangeStart: 75, rangeEnd: 87,  mass: 0.06},
          {rangeStart: 88, rangeEnd: 100, mass: 0.07}
        ]
      },
      {
        starCategory: "Low Mass Star", values: [
          {rangeStart: 0,   rangeEnd: 13,  mass: 0.08},
          {rangeStart: 14,  rangeEnd: 23,  mass: 0.10},
          {rangeStart: 24,  rangeEnd: 34,  mass: 0.12},
          {rangeStart: 35,  rangeEnd: 43,  mass: 0.15},
          {rangeStart: 44,  rangeEnd: 52,  mass: 0.18},
          {rangeStart: 53,  rangeEnd: 59,  mass: 0.22},
          {rangeStart: 60,  rangeEnd: 65,  mass: 0.26},
          {rangeStart: 66,  rangeEnd: 70,  mass: 0.30},
          {rangeStart: 71,  rangeEnd: 74,  mass: 0.34},
          {rangeStart: 75,  rangeEnd: 77,  mass: 0.38},
          {rangeStart: 78,  rangeEnd: 80,  mass: 0.42},
          {rangeStart: 81,  rangeEnd: 83,  mass: 0.46},
          {rangeStart: 84,  rangeEnd: 86,  mass: 0.50},
          {rangeStart: 87,  rangeEnd: 89,  mass: 0.53},
          {rangeStart: 90,  rangeEnd: 92,  mass: 0.56},
          {rangeStart: 93,  rangeEnd: 95,  mass: 0.59},
          {rangeStart: 96,  rangeEnd: 97,  mass: 0.62},
          {rangeStart: 98,  rangeEnd: 99,  mass: 0.65},
          {rangeStart: 100, rangeEnd: 100, mass: 0.68}
        ]
      },
      {
        starCategory: "Intermediate Mass Star", values: [
          {rangeStart: 1,  rangeEnd: 7,   mass: 0.70},
          {rangeStart: 8,  rangeEnd: 13,  mass: 0.72},
          {rangeStart: 14, rangeEnd: 19,  mass: 0.74},
          {rangeStart: 20, rangeEnd: 24,  mass: 0.76},
          {rangeStart: 25, rangeEnd: 29,  mass: 0.78},
          {rangeStart: 30, rangeEnd: 34,  mass: 0.80},
          {rangeStart: 35, rangeEnd: 39,  mass: 0.82},
          {rangeStart: 40, rangeEnd: 42,  mass: 0.84},
          {rangeStart: 44, rangeEnd: 47,  mass: 0.86},
          {rangeStart: 48, rangeEnd: 51,  mass: 0.88},
          {rangeStart: 52, rangeEnd: 55,  mass: 0.90},
          {rangeStart: 56, rangeEnd: 59,  mass: 0.92},
          {rangeStart: 60, rangeEnd: 62,  mass: 0.94},
          {rangeStart: 63, rangeEnd: 65,  mass: 0.96},
          {rangeStart: 66, rangeEnd: 68,  mass: 0.98},
          {rangeStart: 69, rangeEnd: 71,  mass: 1.00},
          {rangeStart: 72, rangeEnd: 74,  mass: 1.02},
          {rangeStart: 75, rangeEnd: 78,  mass: 1.04},
          {rangeStart: 79, rangeEnd: 82,  mass: 1.07},
          {rangeStart: 83, rangeEnd: 85,  mass: 1.10},
          {rangeStart: 86, rangeEnd: 89,  mass: 1.13},
          {rangeStart: 90, rangeEnd: 92,  mass: 1.16},
          {rangeStart: 93, rangeEnd: 95,  mass: 1.19},
          {rangeStart: 96, rangeEnd: 97,  mass: 1.22},
          {rangeStart: 98, rangeEnd: 100, mass: 1.25}
        ]
      },
      {
        starCategory: "High Mass Star", values: [
          {rangeStart: 1,  rangeEnd: 3,   mass: 1.28},
          {rangeStart: 4,  rangeEnd: 6,   mass: 1.31},
          {rangeStart: 7,  rangeEnd: 9,   mass: 1.34},
          {rangeStart: 10, rangeEnd: 12,  mass: 1.37},
          {rangeStart: 13, rangeEnd: 16,  mass: 1.40},
          {rangeStart: 17, rangeEnd: 19,  mass: 1.44},
          {rangeStart: 20, rangeEnd: 23,  mass: 1.48},
          {rangeStart: 24, rangeEnd: 27,  mass: 1.53},
          {rangeStart: 28, rangeEnd: 31,  mass: 1.58},
          {rangeStart: 32, rangeEnd: 35,  mass: 1.64},
          {rangeStart: 36, rangeEnd: 38,  mass: 1.70},
          {rangeStart: 39, rangeEnd: 41,  mass: 1.76},
          {rangeStart: 42, rangeEnd: 45,  mass: 1.82},
          {rangeStart: 46, rangeEnd: 49,  mass: 1.90},
          {rangeStart: 50, rangeEnd: 53,  mass: 2.00},
          {rangeStart: 54, rangeEnd: 56,  mass: 2.10},
          {rangeStart: 57, rangeEnd: 59,  mass: 2.20},
          {rangeStart: 60, rangeEnd: 62,  mass: 2.30},
          {rangeStart: 63, rangeEnd: 67,  mass: 2.40},
          {rangeStart: 68, rangeEnd: 71,  mass: 2.60},
          {rangeStart: 72, rangeEnd: 75,  mass: 2.80},
          {rangeStart: 76, rangeEnd: 78,  mass: 3.00},
          {rangeStart: 79, rangeEnd: 82,  mass: 3.20},
          {rangeStart: 83, rangeEnd: 87,  mass: 3.50},
          {rangeStart: 88, rangeEnd: 91,  mass: 4.00},
          {rangeStart: 92, rangeEnd: 94,  mass: 4.50},
          {rangeStart: 95, rangeEnd: 96,  mass: 5.00},
          {rangeStart: 97, rangeEnd: 98,  mass: 5.50},
          {rangeStart: 99, rangeEnd: 100, mass: 6.00}
        ]
      },
    ]
  };

  private getStellarMassTable(starCategory: string) {
    const result = this.table.values
      .filter(value => value.starCategory === starCategory)
      .pop();

    if (result === undefined) {
      throw new StellarMassLookupError(starCategory, this.table, this.logger);
    } else {
      return result;
    }
  }

  getStellarMassBounds(starCategory: string): [number, number] {
    return [
      Math.min(...this.getStellarMassTable(starCategory).values.map(val => val.mass)),
      Math.max(...this.getStellarMassTable(starCategory).values.map(val => val.mass))
    ];
  }

  lookupMass(category: string, roll: number): number {
    const table = this.getStellarMassTable(category);
    const result = table.values
      .filter(value => value.rangeStart <= roll && value.rangeEnd >= roll)
      .pop();

    if (result === undefined) {
      throw new StellarMassLookupError(category, this.table, this.logger);
    } else {
      this.logger.debug(`Lookup Category ${category}, Lookup Roll ${roll}, Result: ${result.mass}`);
      return result.mass;
    }
  }
}
