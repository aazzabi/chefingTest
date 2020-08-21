import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

  constructor() {
  }

  /**
   * Get data from localStorage
   *
   * @param {string} key
   * @returns {any}
   */
  static get(key: string): any {
    let item: any = localStorage.getItem(key);
    if (item) {
      item = JSON.parse(item);
      if (item.time > Date.now()) {
        StorageService.set(key, item.data, item.expiryTime);
        return item.data;
      } else {
        StorageService.clear(key);
      }
    }
  }

  /**
   * Save dat to localStorage
   * @param {string} key
   * @param {any}    value
   * @param {number} expiryTime
   */
  static set(key: string, value: any, expiryTime?: number) {
    value = StorageService.generateData(value, expiryTime);
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Clear data from localStorage
   *
   * @param {string} key
   */
  static clear(key: string) {
    if (localStorage) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Generate data
   * @param value
   * @param {number} expiryTime
   * @returns {Object}
   */
  static generateData(value: any, expiryTime: number = 1000 * 60 * 60 * 24 * 14) {
    return {
      time: Date.now() + expiryTime,
      expiryTime: expiryTime,
      data: value
    };
  }
}
