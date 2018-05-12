import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proveedor1Provider } from '../../providers/proveedor1/proveedor1';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nombre;
  public apellido;
  public user;
  public password;
  public horarios;

  constructor(public navCtrl: NavController, public proveedor: Proveedor1Provider, public navParams: NavParams) {  }

  ionViewDidEnter(){
    this.user= this.navParams.get("user");
    this.password = this.navParams.get('password');

    this.proveedor.login(this.user,this.password)
    .subscribe(
      (data)=>{this.cargar(data);},
      (error)=>{console.log(error);}
    )
  }

  cargar(data){
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.horarios = [data.diahora1, data.diahora2, data.diahora3, data.diahora4];
  }


}
