import { BrowserModule }                            from '@angular/platform-browser';
import { ErrorHandler, NgModule }                   from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen }                             from '@ionic-native/splash-screen';
import { StatusBar }                                from '@ionic-native/status-bar';
import { AngularSocialAuthModule }                  from 'angular-social-auth';
import { MyApp }                                    from './app.component';
import { JoinPage }                                 from '../pages/join/join';
import { MePage }                                   from '../pages/me/me';

@NgModule({
  declarations: [
    MyApp,
    JoinPage,
    MePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularSocialAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    JoinPage,
    MePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
