import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Recipe } from "../../models/recipe";
import { RecipeService } from "../services/recipe.service";
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { ShoppingListService } from "../services/shopping-list";

@Component({
    selector: 'page-recipe',
    templateUrl: 'recipe.html'
})

export class RecipePage implements OnInit {
    recipe: Recipe;
    index: number;
    constructor(private navParams: NavParams,
        private recipeService: RecipeService,
        private navCtrl: NavController,
        private slService : ShoppingListService) { }

    ngOnInit() {
        this.index = this.navParams.get('index');
        this.recipe = this.recipeService.getRecipe(this.index);
    }

    onAddIngredient() {
        this.slService.addItems(this.recipe.ingredients);
    }

    onEditRecipe() {
        this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index });
    }
    
    onDeleteRecipe(){
        this.recipeService.removeRecipe(this.index);
        this.navCtrl.popToRoot();
    }
}

