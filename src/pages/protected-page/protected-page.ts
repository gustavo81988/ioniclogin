import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { LoginPage } from '../login/login';

export class ProtectedPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage) {
  }

  ionViewCanEnter() {
    this.storage.get('id_token').then(id_token => {
      if (id_token === null) {
        this.navCtrl.setRoot(LoginPage);
        return false;
      }
    });

    return true;
  }
}
