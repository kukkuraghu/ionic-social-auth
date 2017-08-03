import { Component }                from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController }        from 'ionic-angular';
import { UserInfo }                 from 'angular-social-auth';
import { AuthServices }             from 'angular-social-auth';
import { SocialTypes }              from 'angular-social-auth';
import { JoinPage }                 from '../../pages/join/join';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  myDetail: UserInfo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authServices: AuthServices, private loadingCtrl: LoadingController) {
    console.log('MePage constructor called');
    this.myDetail = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }
  async logout() {
    let spinner = this.loadingCtrl.create({});
    spinner.present();
    try {
      switch(this.myDetail.socialType) {
        case SocialTypes.facebook : await this.authServices.fbLogout();
                                    break;
        case SocialTypes.google   : await this.authServices.googleLogout();
                                    break;
      }
    }
    catch(e) {
      console.log('error while logging out', e);
    }
    finally {
      spinner.dismiss();
      this.navCtrl.push(JoinPage);
    }
  }
}
