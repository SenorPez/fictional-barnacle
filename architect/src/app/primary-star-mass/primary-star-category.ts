import {LoggerService} from "../logger.service";
import {RollService} from "../roll.service";

type PrimaryStarCategoryTable = {
  roll: () => number,
  values: ({ rangeStart: number, rangeEnd: number, category: string })[]
};

class PrimaryStarLookupError extends RangeError {
  constructor(value: string | number, table: PrimaryStarCategoryTable, logger: LoggerService) {
    super();

    logger.error("Lookup Value Not Found");
    logger.error(`Lookup: ${value}`);
    logger.error(`Table: ${table}`);
    this.name = "PrimaryStarLookupError";
  }
}

export class PrimaryStarCategory {
  constructor(
    private logger: LoggerService,
    private roller: RollService
  ) { }

  private readonly table: PrimaryStarCategoryTable = {
    roll: () => this.roller.d100(),
    values: [
      {rangeStart: 1, rangeEnd: 3, category: "Brown Dwarf"},
      {rangeStart: 4, rangeEnd: 77, category: "Low Mass Star"},
      {rangeStart: 78, rangeEnd: 90, category: "Intermediate Mass Star"},
      {rangeStart: 91, rangeEnd: 100, category: "High Mass Star"}
    ]
  };

  get starCategories(): string[] {
    return this.table.values.map(value => value.category);
  }

  roll(): number {
    return this.table.roll();
  }

  lookupRoll(category: string): number {
    let result = this.table.values
      .filter(value => value.category === category)
      .pop();

    if (result === undefined) {
      throw new PrimaryStarLookupError(category, this.table, this.logger);
    } else {
      this.logger.debug(`Lookup Category ${category}, Result: ${result.rangeStart}`);
      return result.rangeStart;
    }
  }

  lookupCategory(roll: number): string {
    let result = this.table.values
      .filter(value => value.rangeStart <= roll && value.rangeEnd >= roll)
      .pop();

    if (result === undefined) {
      throw new PrimaryStarLookupError(roll, this.table, this.logger);
    } else {
      this.logger.debug(`Lookup Roll ${roll}, Result: ${result.category}`)
      return result.category;
    }
  }
}
