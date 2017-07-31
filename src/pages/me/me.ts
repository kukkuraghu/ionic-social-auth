import { Component }                from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController }        from 'ionic-angular';
import { UserInfo }                 from 'angular-social-auth';
import { AuthServices }             from 'angular-social-auth';
import { JoinPage }                 from '../../pages/join/join';

const enum SocialTypes {facebook, google};
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  myDetail: UserInfo;
  socialType: SocialTypes;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authServices: AuthServices, private loadingCtrl: LoadingController) {
    console.log('MePage constructor called');
    this.myDetail = this.navParams.get('data');
    this.socialType = this.myDetail.facebook? SocialTypes.facebook : SocialTypes.google;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }
  logout() {
    let spinner = this.loadingCtrl.create({});
    spinner.present();
    var finallyLogout = () => {
      spinner.dismiss();
      this.navCtrl.push(JoinPage);
    };
    switch(this.socialType) {
      case SocialTypes.facebook : this.authServices.fbLogout().finally(finallyLogout);
                                  break;
      case SocialTypes.google   : this.authServices.googleLogout().finally(finallyLogout);
                                  break;
    }
  }
}
