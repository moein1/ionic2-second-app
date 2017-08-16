import {Component} from '@angular/core';
import { ShoppingListPage } from "../shopping-list/shopping-list";
import { RecipesPage } from "../recipes/recipes";

@Component({
    selector:'page-tab',
    template:`    
         <ion-tabs>
            <ion-tab [root]="slPage" tabTitle = "Shopping List" tabIcon="list-box" ></ion-tab>
            <ion-tab [root] ="recipesPage" tabTitle="Recipes" tabIcon="book" ></ion-tab>
         </ion-tabs>
    `
})

export class TabsPage{
    slPage = ShoppingListPage;
    recipesPage = RecipesPage;
}