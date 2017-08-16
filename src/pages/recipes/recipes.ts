import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { Recipe } from "../../models/recipe";
import { RecipeService } from "../services/recipe.service";
import { RecipePage } from "../recipe/recipe";

@Component({
    selector: 'page-recipes',
    templateUrl: 'recipes.html'
})

export class RecipesPage {
    recipes : Recipe[];
    constructor(private navCtrl: NavController,
                private recipeServcie : RecipeService) {

    }

    ionViewWillEnter(){
        this.recipes = this.recipeServcie.getRecipes();
    }

    onNewRecipe() {
        this.navCtrl.push(EditRecipePage, { mode: 'New' });
    }

    onLoadRecipe(index: number){
        this.navCtrl.push(RecipePage,{index : index});
    }

}