import {CanDeactivate} from "@angular/router";
import {StockFormComponent} from "./stock-form.component";
import {Observable} from "rxjs";
import {NzModalService} from "ng-zorro-antd";
import {Injectable} from "@angular/core";
import {StockService} from "../stock.service";
/**
 * Created by ethan on 2018/1/16.
 */

@Injectable()
export class ConfirmGuard implements CanDeactivate<StockFormComponent> {
  constructor(private modalService: NzModalService, private stockService: StockService) {
  }

  canDeactivate(component: StockFormComponent): boolean | Observable<boolean> | Promise<boolean> {
    let _title, _content, _okText, _cancelText, service;
    if (component.action == 'save') {
      if (component.stockID == 0) {
        [_title, _content, _okText, _cancelText] = ['确定要新建吗？', '你已经填写了新的股票信息，确认会创建这支新股票。', '确认', '取消'];
        service = this.stockService.createStock(component.formModel.value);
      } else {
        [_title, _content, _okText, _cancelText] = ['确定要保存吗？', '你已经修改了这支股票的信息，确认会保存这些修改。', '确认', '取消'];
        service = this.stockService.updateStock(component.stockID, component.formModel.value);
      }
    } else {
      [_title, _content, _okText, _cancelText] = ['确定要离开吗？', '你已经填写了表单离开会放弃已经填写的内容。', '确认', '取消'];
    }
    return new Observable((observer) => {
      this.modalService.confirm({
        title: _title,
        content: _content,
        okText: _okText,
        cancelText: _cancelText,
        closable: false,
        showConfirmLoading: true,
        onOk: () => {
          if (component.action == 'save') {
            return new Promise((resolve) => {
              service.subscribe(data => {
                if (data.result) {
                  resolve(true);
                  observer.next(true);
                  observer.complete();
                } else {
                  observer.error();
                }
              });
            });
          }
          observer.next(true);
          observer.complete();
        },
        onCancel: () => {
          observer.next(false);
          observer.complete();
        }
      });
    })
      ;
  }
}
