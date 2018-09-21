import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth-service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loginData: FormGroup;
  public user: UserModel;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public storage: Storage,
    public formBuilder: FormBuilder,
    public authService: AuthService) {

    this.loginData = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ionViewDidLoad() {
    //hide menu when on the login page, regardless of the screen resolution
    this.menuCtrl.enable(false);
  }

  login() {
    const loading = this.loadingCtrl.create({
      content: 'Iniciando Sesi&oacute;n...'
    });
    loading.present();
    //use this.loginData.value to authenticate the user
    this.authService.login(this.loginData.value)
      .then(
        (data) =>{
          if(data == false){
            loading.dismiss();
            const alert = this.alertCtrl.create({
              title: 'Hubo un problema al iniciar sesi&oacute;n',
              buttons: ['Ok']
            });
            alert.present();
          }else{
            loading.dismiss();
            this.redirectToHome();
          }
        }
      )
      .catch(e => console.log("login error", e));
  }

  logout(){
    this.authService.logout();
  }

  redirectToHome() {
    this.navCtrl.setRoot(HomePage);
    this.menuCtrl.enable(true);
  }

  /**
   * Opens a paage
   * 
   * @param page string Page name
   */
  openPage(page: string) {
    this.navCtrl.push(page);
  }
}
