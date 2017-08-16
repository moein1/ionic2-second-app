import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth";
import { LoadingController, AlertController } from "ionic-angular";

@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SigninPage {
    constructor(private authService: AuthService,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController) { }
    onSignin(f: NgForm) {
        const loading = this.loadingCtrl.create({
              content:'Sign In .....'
          });
            loading.present();
      this.authService.signin(f.value.email, f.value.password).
      then((data)=>{
          loading.dismiss();
      }).catch((error)=>{
          loading.dismiss();
          const alert = this.alertCtrl.create({
              title:'Signin Error',
              message:error.message,
              buttons:['Ok']
          });
            alert.present();
      })
      
    }
}