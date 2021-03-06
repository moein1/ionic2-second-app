import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth";
import { LoadingController, AlertController } from 'ionic-angular';
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})

export class SignupPage {
    constructor(private authService: AuthService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) { }
    onSignup(f: NgForm) {
        const loading = this.loadingCtrl.create({
            content: 'Signing you in...'
        });
        loading.present();
        this.authService.signup(f.value.email, f.value.password).
            then((data) => {
                loading.dismiss();
            }
            ).catch((error) => {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                    title: 'Signup Failed',
                    message: error.message,
                    buttons: ['Ok']
                });
                alert.present();
            })
    }
}