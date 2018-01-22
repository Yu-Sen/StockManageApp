import {Component, OnInit} from '@angular/core';
import {Stock, StockService} from "../stock.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup;

  stock: Stock = new Stock(0, '', 0, 0, '', []);

  categories = ['IT', '互联网', '金融'];

  stockID = this.routerInfo.snapshot.params['id'];

  action: string;

  constructor(private routerInfo: ActivatedRoute, private stockService: StockService, private router: Router, private modalService: NzModalService) {
  }

  ngOnInit() {
    let fb = new FormBuilder();
    this.formModel = fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', Validators.required],
        rating: [''],
        desc: [''],
        categories: fb.array([
          [false],
          [false],
          [false]
        ], this.categoriesSelectValidator)
      }
    );
    if (this.stockID != 0) {
      this.stockService.getStock(this.stockID).subscribe(
        data => {
          this.stock = data;
          this.formModel.reset(
            {
              name: data.name,
              price: data.price,
              rating: data.rating,
              desc: data.desc,
              categories: [
                data.categories.indexOf(this.categories[0]) != -1,
                data.categories.indexOf(this.categories[1]) != -1,
                data.categories.indexOf(this.categories[2]) != -1,
              ]
            }
          );
        }
      );
    }

  }

  cancel() {
    this.action = 'cancel';
    this.router.navigateByUrl('/stock');
  }

  save() {
    this.action = 'save';
    this.formModel.value.rating = this.stock.rating;
    for (let i = 0; i < 3; i++) {
      if (this.formModel.value.categories[i]) {
        this.formModel.value.categories[i] = this.categories[i];
      }
    }
    this.router.navigateByUrl('/stock');
  }

  categoriesSelectValidator(control: FormArray) {
    let valid = false;
    control.controls.forEach(e => {
      if (e.value) {
        valid = true;
      }
    });

    if (valid) {
      return null;
    } else {
      return {categories: true};
    }
  }
}
