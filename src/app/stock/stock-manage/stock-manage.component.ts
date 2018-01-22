import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Stock, StockService} from "../stock.service";
import {FormControl} from "@angular/forms";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.css']
})
export class StockManageComponent implements OnInit {
  private dataSource: Observable<any>;
  private stocks: Stock[];

  private nameFilter: FormControl = new FormControl();

  private keyWord: string;

  constructor(private router: Router, private stockService: StockService, private message: NzMessageService) {
    this.dataSource = this.stockService.getStocks();
  }

  ngOnInit() {
    this.dataSource.subscribe(
      data => this.stocks = data
    )
    this.nameFilter.valueChanges.debounceTime(500).subscribe(value => this.keyWord = value);
  }

  create() {
    this.router.navigateByUrl('/stock/0');
  }

  update(stock: Stock) {
    this.router.navigateByUrl('/stock/' + stock.id);
  }

  delete(stock: Stock) {
    this.stockService.deleteStock(stock.id).subscribe(
      data => {
        console.log(data);
        if (data.result) {
          this.stockService.getStocks().subscribe(
            data => {
              this.stocks = data;
              this.message.info('删除成功');
            }
          );
        }
      }
    );
  }

  cancel() {

  }

}

