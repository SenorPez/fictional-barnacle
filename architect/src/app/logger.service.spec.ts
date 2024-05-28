import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should create the logger service', () => {
    expect(service).toBeTruthy();
  });

  it('should send a debug message', () => {
    const debugSpy = jest.spyOn(console, 'debug');

    service.debug('This is a debug message.');

    expect(debugSpy).toHaveBeenCalled();
    expect(debugSpy).toHaveBeenCalledTimes(1);
    expect(debugSpy).toHaveBeenCalledWith('This is a debug message.');

    debugSpy.mockRestore();
  });

  it('should send a log message', () => {
    const logSpy = jest.spyOn(console, 'log');

    service.log('This is a log message.');

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('This is a log message.');

    logSpy.mockRestore();
  });

  it('should send a warn message', () => {
    const warnSpy = jest.spyOn(console, 'warn');

    service.warn('This is a warn message.');

    expect(warnSpy).toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('This is a warn message.');

    warnSpy.mockRestore();
  });

  it('should send an error message', () => {
    const errorSpy = jest.spyOn(console, 'error');

    service.error('This is an error message.');

    expect(errorSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith('This is an error message.');

    errorSpy.mockRestore();
  });
});
