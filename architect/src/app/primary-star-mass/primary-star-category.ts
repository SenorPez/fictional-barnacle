import {LoggerService} from "../logger.service";
import {RollService} from "../roll.service";

type PrimaryStarCategoryTable = {
  roll: () => number,
  values: ({ rangeStart: number, rangeEnd: number, category: string })[]
};

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

  GetPrimaryStarCategory(roll: number): string {
    let result = this.table.values
      .filter(value => value.rangeStart <= roll && value.rangeEnd >= roll)
      .pop();

    if (result === undefined) {
      this.logger.error("Invalid Table Result");
      this.logger.error(`Roll: ${roll}`);
      this.logger.error(`Table: ${this.table}`);
      throw new Error("Invalid Table Result");
    } else {
      this.logger.debug(`Roll: ${roll}, Primary Star Category: ${result.category}`);
      return result.category;
    }
  }

  GetRandomPrimaryStarCategory(): string {
    return this.GetPrimaryStarCategory(this.table.roll());
  }
}
