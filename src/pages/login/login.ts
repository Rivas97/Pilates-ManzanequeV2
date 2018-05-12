import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public nombre;
  public apellido;
  public user;
  public password;
  public passval

  constructor(public navCtrl: NavController, public proveedor: Proveedor1Provider, private storage: Storage) {}

  ionViewDidEnter(){
    this.storage.get('user').then((val) => {
      this.user = val;
    });

    this.storage.get('password').then((val) => {
      this.password = val;
    });

    if(this.user){
      this.navCtrl.setRoot(TabsPage, {
        user: this.user,
        password: this.password,
      });
    }

    }

  login(user, password){
    this.user = user;
    this.password = password
    this.proveedor.login(this.user,this.password)
    .subscribe(
      (data)=>{ this.cargar(data);},
      (error)=>{console.log(error);}
    )
  }

  cargar(data) {
    this.nombre = data.nombre;
      this.apellido = data.apellido;

      if(!this.nombre) {
        alert('Usuario o contraseña incorrectos');
        this.passval = "";
      } else {
        this.storage.set('user',this.user);
        this.storage.set('password',this.password);
        this.navCtrl.setRoot(TabsPage, {
          user: this.user,
          password: this.password,
        });
      }
  }

}
