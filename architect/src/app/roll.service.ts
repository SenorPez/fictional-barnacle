import { Injectable } from '@angular/core';
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: 'root'
})
export class RollService {
  constructor(private logger: LoggerService) { }

  d100(): number {
    return this.getRandomIntInclusive(1, 100);
  }

  private getRandomIntInclusive(min: number, max: number): number {
    const minBound: number = Math.ceil(min);
    const maxBound: number = Math.floor(max);
    const roll: number = Math.floor(Math.random() * (maxBound - minBound + 1) + minBound);

    this.logger.debug(`Min Bound: ${minBound}, Max Bound: ${maxBound}, Roll: ${roll}`);

    return roll;
  }
}
