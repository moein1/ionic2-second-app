import { Recipe } from "../../models/recipe";
import { Ingredient } from "../../models/ingredient";
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { AuthService } from "./auth";

//We need this beacause we want to inject http service here
@Injectable()

export class RecipeService {
    private recipes: Recipe[] = [];

    constructor(private http: Http,
        private authService: AuthService) { }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        console.log(this.recipes);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    updateRecipe(index: number,
        title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    storeList(token: string) {
        var userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic2-recipe-book-5c56c.firebaseio.com/' +
            userId + '/recipes.json?auth=' + token, this.recipes).
            map(response => {
                return response.json();
            })
    }
    fetchList(token: string) {
        var userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic2-recipe-book-5c56c.firebaseio.com/' +
            userId + '/recipes.json?auth=' + token).
            map(response => {
                const recipes :Recipe[]=response.json()? response.json() : [];
                for (var recipe of recipes) {
                    if (!recipe.hasOwnProperty('ingredients')) {
                        recipe.ingredients = [];                        
                    }
                }
                return recipes;
            }).do((recipes: Recipe[]) => {
                if (recipes) {
                    // for (var i = 0; i < recipes.length; i++) {
                    //     if (!recipes[i].ingredients)
                    //         recipes[i].ingredients = [];
                    // }
                    this.recipes = recipes;
                }
                else
                    this.recipes = [];
            });
    }
}