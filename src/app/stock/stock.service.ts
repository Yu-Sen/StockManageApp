import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from 'rxjs';

@Injectable()
export class StockService {

  constructor(public http: Http) {
  }

  getStocks(): Observable<Stock[]> {
    return this.http.get('/api/stock').map(res => res.json());
  }

  getStock(id: number): Observable<Stock> {
    return this.http.get('/api/stock/' + id).map(res => res.json());
  }

  updateStock(id: number, updateInfo: Stock): Observable<any> {
    updateInfo['id'] = id;
    return this.http.post('/api/updateStock/', updateInfo).map(res => res.json()).delay(3000);
  }

  deleteStock(id: number): Observable<any> {
    return this.http.post('/api/deleteStock',
      {
        functionName: 'deleteStock',
        stockID: id
      }).map(res => res.json());
  }

  createStock(newStockInfo: Stock): Observable<any> {
    return this.http.post('/api/createStock',
      {
        functionName: 'createStock',
        stockInfo: newStockInfo
      }).map(res => res.json()).delay(2000);
  }

}

export class Stock {
  constructor(public id: number,
              public name: string,
              public price: number,
              public rating: number,
              public desc: string,
              public categories: Array<string>) {

  }
}
;
