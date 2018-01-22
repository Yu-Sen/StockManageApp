import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";
import {NgZorroAntdModule} from "ng-zorro-antd";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ContentComponent} from './content/content.component';
import {FooterComponent} from './footer/footer.component';
import {StockManageComponent} from './stock/stock-manage/stock-manage.component';
import {StarsComponent} from './stars/stars.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StockFormComponent} from './stock/stock-form/stock-form.component';
import {StockService} from "./stock/stock.service";
import {StockFilterPipe} from './stock/stock-filter.pipe';
import {SocketService} from "./header/socket.service";
import {ConfirmGuard} from "./stock/stock-form/confirm.guard";


const routeConfig: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'stock', component: StockManageComponent},
  {path: 'stock/:id', component: StockFormComponent, canDeactivate: [ConfirmGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    StockManageComponent,
    StarsComponent,
    DashboardComponent,
    StockFormComponent,
    StockFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routeConfig),
    NgZorroAntdModule.forRoot()
  ],
  providers: [StockService, SocketService, ConfirmGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
