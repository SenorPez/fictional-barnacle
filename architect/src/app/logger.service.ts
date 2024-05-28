import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  debug(msg: any) { console.debug(msg); }
  log(msg: any) { console.log(msg); }
  warn(msg: any) { console.warn(msg); }
  error(msg: any) { console.error(msg); }
}
