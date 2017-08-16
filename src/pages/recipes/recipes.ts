import { Component } from '@angular/core';
import { NavController, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { Recipe } from "../../models/recipe";
import { RecipeService } from "../services/recipe.service";
import { RecipePage } from "../recipe/recipe";
import { AuthService } from "../services/auth";
import { DatabaseOptionsPage } from "../database-options/database-options";

@Component({
    selector: 'page-recipes',
    templateUrl: 'recipes.html'
})

export class RecipesPage {
    recipes: Recipe[];
    constructor(private navCtrl: NavController,
        private recipeServcie: RecipeService,
        private popCtrl: PopoverController,
        private loadingCtrl: LoadingController,
        private alerCtrl: AlertController,
        private authService: AuthService) {

    }

    ionViewWillEnter() {
        this.recipes = this.recipeServcie.getRecipes();
    }

    onNewRecipe() {
        this.navCtrl.push(EditRecipePage, { mode: 'New' });
    }

    onLoadRecipe(index: number) {
        this.navCtrl.push(RecipePage, { index: index });
    }

    private handleError(error) {
        const alert = this.alerCtrl.create({
            title: 'Loading Error',
            message: error
        });
        alert.present();
    }

    onShowOptions(event) {
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        const popover = this.popCtrl.create(DatabaseOptionsPage);
        popover.present({ ev: event });
        popover.onDidDismiss(
            data => {
                if(!data)
                    return;
                if (data.action == 'load') {
                    loading.present();
                    this.authService.getActiveUser().getToken().
                        then((token: string) => {
                            this.recipeServcie.fetchList(token).subscribe(
                                (recipes: Recipe[]) => {
                                    loading.dismiss();
                                    if (recipes) {
                                        this.recipes = recipes;
                                    } else {
                                        this.recipes = [];
                                    }
                                },
                                error => {
                                    loading.dismiss();
                                    this.handleError(error.message);
                                }
                            )
                        })
                } else if (data.action == 'store') {
                    loading.present();
                    this.authService.getActiveUser().getToken().
                    then((token:string)=>{
                        this.recipeServcie.storeList(token).subscribe(
                            ()=>{
                                loading.dismiss();
                                console.log('Store data successfully');
                            },
                            error=>{
                                loading.dismiss();
                                this.handleError(error.message);
                            }
                        )
                    }).catch(error=>{
                        this.handleError(error);
                    })
                }
            }
        )
        console.log(event);
    }

}