import { Component }                          from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LoadingController }                  from 'ionic-angular';
import { AuthServices }                       from 'angular-social-auth';
import { MePage }                             from '../me/me';

//To add the method finally to Promise
import { shim } from 'promise.prototype.finally';
shim();

@Component({
  selector: 'page-join',
  templateUrl: 'join.html',
})
export class JoinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authServices: AuthServices, private loadctrl: LoadingController, platform: Platform) {
    console.log("JoinPage constructor called");
    //register the action when the device back button is pressed.
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        console.log('back button pressed');
        //if the device back button is pressed on 'JoinPage', exit the app.
        //any other page, go to the previous page.
        if (this.navCtrl.getActive().name ===  'JoinPage') {
          platform.exitApp();
        }
        else {
          this.navCtrl.pop();
        }
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinPage');
  }
  fbLogin() {
    //console.log('fb login button clicked');
    let spinner = this.loadctrl.create({});
    spinner.present();
    this.authServices.fbLogin().then(
      result => {
        console.log('promise resolved');
        console.log(result);
        this.navCtrl.push(MePage, {data: result});
      }
    ).
    catch(
      error => {
        console.log('promise rejected');
        console.log(error);
      }
    ).
    finally(
      () => spinner.dismiss()
    )
  }
  fbLogout() {
    this.authServices.fbLogout().then(
      data => console.log(data), error => console.log(error)
    );
  }
  googleLogin() {
    //console.log('google login button clicked');
    this.authServices.googleRegister('213323357854-60qaf77oc7smlb0aog2kmsqmv0shp27f.apps.googleusercontent.com');
    let spinner = this.loadctrl.create({});
    spinner.present();
    this.authServices.googleLogin().then(
      result => {
        console.log('promise resolved');
        console.log(result);
        this.navCtrl.push(MePage, {data: result});
      }
    ).
    catch(
      error => {
        console.log('googleLogin promise rejected');
        console.log(error);
      }
    ).
    finally(
      () => spinner.dismiss()
    );
  }
  googleLogout() {
    //console.log('google login button clicked');
    this.authServices.googleLogout().then(
      data => console.log(data), error => console.log(error)
    );
  }
}
