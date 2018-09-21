import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProtectedPage } from '../protected-page/protected-page';
import {Storage} from '@ionic/storage';
import { AuthService } from '../../services/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends ProtectedPage{

  constructor(
    public navCtrl: NavController,
    protected authService: AuthService,
    public storage: Storage, 
    public navParams: NavParams
  ){
    super(navCtrl, navParams, storage);
  }

  logout(){
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
