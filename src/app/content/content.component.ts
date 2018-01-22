import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  pageHeader = '';
  pageDesc = '';

  constructor(public router: Router) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      if (event.url === '/dashboard' || event.url === '/') {
        this.pageHeader = '首页';
        this.pageDesc = '';
      } else if (event.url.startsWith('/stock')) {
        this.pageHeader = '股票管理';
        this.pageDesc = '进行股票基本信息增删改查';
      }
    });
  }

  ngOnInit() {
  }

}
