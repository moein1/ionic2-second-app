import { Ingredient } from "../../models/ingredient";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthService } from "./auth";
import "rxjs/Rx";

@Injectable()

export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    constructor(private http: Http,
        private authService: AuthService) { }

    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount))
    }

    addItems(items: Ingredient[]) {
        // this is a new feature of typescript for adding array of item in 
        //existing array without using the loop through the items
        this.ingredients.push(...items);
    }

    getItems() {
        //this syntax will return a copy of the array and if you change
        //it it will be safe beacuse the original array will keep without change
        return this.ingredients.slice();
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic2-recipe-book-5c56c.firebaseio.com/' +
            userId + '/shopping-list.json?auth=' + token, this.ingredients).
            map((response) => {
                return response.json();
            })
    };

    fetchList(token : string){
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic2-recipe-book-5c56c.firebaseio.com/' +
            userId + '/shopping-list.json?auth=' + token).
            map((response)=>{
                return response.json();
            }).do((data)=>{
                this.ingredients = data;
            })
    }
}