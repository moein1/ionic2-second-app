import { Component } from '@angular/core';
import { NgForm } from "@angular/forms/forms";
import { ShoppingListService } from '../services/shopping-list';
import { Ingredient } from "../../models/ingredient";
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { SLOptionsPage } from "./sl-options/sl-options";
import { AuthService } from "../services/auth";

@Component({
    selector: 'page-shopping-list',
    templateUrl: 'shopping-list.html'
})

export class ShoppingListPage {
    listItems: Ingredient[] = [];
    constructor(private shoppingListService: ShoppingListService,
        private popCtrl: PopoverController,
        private authService: AuthService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) {

    }

    ionViewWillEnter() {
        this.loadItems();
    }

    onAddItem(form: NgForm) {
        this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
        form.reset();
        this.loadItems();

    }

    private loadItems() {
        this.listItems = this.shoppingListService.getItems();
    }

    private handleError(error: string) {
        const alert = this.alertCtrl.create({
            title: 'An error occured',
            message: error,
            buttons: ['Ok']
        });
        alert.present();
    }

    onCheckItem(index: number) {
        this.shoppingListService.removeItem(index);
        this.loadItems();
    }

    onShowOptions(event) {
        var loading = this.loadingCtrl.create({
            content: 'Please wait ...'
        });
        const popover = this.popCtrl.create(SLOptionsPage);
        popover.present({ ev: event });
        popover.onDidDismiss(
            data => {
                if (data.action == 'load') {
                    loading.present();
                    this.authService.getActiveUser().getToken().
                        then((totken: string) => {
                            this.shoppingListService.fetchList(totken).subscribe(
                                (list: Ingredient[]) => {
                                    loading.dismiss();
                                    if (list) {
                                        this.listItems = list;
                                    } else {
                                        this.listItems = [];
                                    }
                                },
                                error => {
                                    loading.dismiss();
                                    console.log(error);
                                    this.handleError(error.message);
                                }
                            )
                        })
                } else if (data.action == 'store') {
                    loading.present();
                    this.authService.getActiveUser().getToken().
                        then((token: string) => {
                            this.shoppingListService.storeList(token).subscribe(
                                () => {
                                    console.log('successfully store data');
                                    loading.dismiss();
                                },
                                error => {
                                    console.log(error);
                                    loading.dismiss();
                                    this.handleError(error.message);
                                }
                            )
                        }).catch(error => {

                        })
                }
            }
        )
    }

}