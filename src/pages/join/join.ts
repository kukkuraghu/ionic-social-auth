import { Component }                          from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LoadingController }                  from 'ionic-angular';
import { AuthServices }                       from 'angular-social-auth';
import { MePage }                             from '../me/me';

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
  async fbLogin() {
    //console.log('fb login button clicked');
    let spinner = this.loadctrl.create({});
    spinner.present();
    try {
      let result = await this.authServices.fbLogin();
      console.log(result);
      this.navCtrl.push(MePage, {data: result});
    }
    catch (error) {
        console.log('Error in logging with facebook');
        console.log(error);
    }
    finally {
      spinner.dismiss()
    }
  }
  async googleLogin() {
    //console.log('google login button clicked');
    this.authServices.googleRegister('213323357854-60qaf77oc7smlb0aog2kmsqmv0shp27f.apps.googleusercontent.com');
    let spinner = this.loadctrl.create({});
    spinner.present();
    try {
      let result = await this.authServices.googleLogin();
      console.log('google login successful');
      console.log(result);
      this.navCtrl.push(MePage, {data: result});
    }
    catch (error) {
      console.log('google login failed');
      console.log(error);
    }
    finally {
      spinner.dismiss();
    }
  }
}
