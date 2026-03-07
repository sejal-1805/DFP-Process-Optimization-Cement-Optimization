import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemAnlysisComponent } from './pages/system-anlysis/system-anlysis.component';
import { GaugeGraphComponent } from './graphs/gauge-graph/gauge-graph.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DatetimepickerComponent } from './common/datetimepicker/datetimepicker.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecommendationsListComponent } from './pages/recommendations-list/recommendations-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChartModule } from 'angular-highcharts';
import { SidebrComponent } from './common/sidebr/sidebr.component';
import { HeaderComponent } from './common/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FiltersComponent } from './common/filters/filters.component';
import { CementMillModel } from './pages/system-anlysis/systemAnlysis.model';
import { filtersModel } from './common/filters/filtersModel.model';
import { MatRadioModule } from '@angular/material/radio';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatTableModule } from '@angular/material/table'
import { ToastrModule } from 'ngx-toastr';
import { ToasterService } from './services/toaster.service';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { LineChartComponent } from './graphs/gauge-graph/line-chart/line-chart.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxDatetimeComponent } from './common/ngx-datetime/ngx-datetime.component';
import { LoaderComponent } from './common/loader/loader.component';
import { SocketService } from './services/socket.service';
import { MatBadgeModule } from '@angular/material/badge';
import { DateStringPipe } from './date-string.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { AlertListComponent } from './pages/alert-list/alert-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EquipmentListComponent } from './pages/equipment-list/equipment-list.component';
import { ApploaderComponent } from './common/apploader/apploader.component';
import { ControlGaugeComponent } from './graphs/control-gauge/control-gauge.component';
import { ControlLineComponent } from './graphs/control-line/control-line.component';
import { RemovebracketsPipe } from './pipes/removebrackets.pipe';
import { Loader2Component } from './common/loader2/loader2.component';
import { AdminpageComponent } from './pages/adminpage/adminpage.component';
import { environment } from '../environments/environment';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LeftDrawerComponent } from './common/left-drawer/left-drawer.component';
import { FooterComponent } from './common/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    SystemAnlysisComponent,
    GaugeGraphComponent,
    LineChartComponent,
    LoginPageComponent,
    DatetimepickerComponent,
    RecommendationsListComponent,
    SidebrComponent,
    FiltersComponent,
    HeaderComponent,
    LoaderComponent,
    NgxDatetimeComponent,
    DateStringPipe,
    AlertListComponent,
    DashboardComponent,
    EquipmentListComponent,
    ApploaderComponent,
    ControlGaugeComponent,
    ControlLineComponent,
    RemovebracketsPipe,
    Loader2Component,
    AdminpageComponent,
    MainLayoutComponent,
    LeftDrawerComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxGaugeModule,
    ChartModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatRadioModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSidenavModule,
    MatToolbarModule,
    TextFieldModule,
    MatTableModule,
    MatSortModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatBadgeModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    }),
    ModalModule.forRoot(),
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: 'd99c09ff-0cf2-44fc-a605-6a769e0c0d6f',
          // redirectUri: "https://utcmfgiiotlinxui001-testing.azurewebsites.net",
          // redirectUri:'http://localhost:4200',
          // redirectUri: 'https://utcmfgiiotlinxui001-opt.azurewebsites.net/',
          // redirectUri:'https://dev.d24ohd8z0zwg7d.amplifyapp.com/', //dev
          //redirectUri: environment.redirectUri,
          // redirectUri:'https://uat.d2m46todvn5tvi.amplifyapp.com/', //uat
          authority: "https://login.microsoftonline.com/f87a5f5e-f97e-4aec-bab8-6e4187ef4f1c",
        },
        cache: {
          cacheLocation: "localStorage", // This configures where your cache will be stored
          storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
        },
      }),
      {
        interactionType: InteractionType.Popup,
        authRequest: {
          scopes: ["user.read"],
        },
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
        ]),
      }
    ),


  ],
  providers: [
    CementMillModel,
    filtersModel,
    MsalService,
    SocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    }, MsalGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
