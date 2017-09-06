import { Component, OnInit } from '@angular/core';
import { Favorite } from "../../models/favorite";
import { NgForm } from "@angular/forms";
import { FavoriteService } from "../services/favorite";
import { NavController } from 'ionic-angular';
import { EditFavoritePage } from "../edit-favorite/edit-favorite";

@Component({
    templateUrl: 'favorite.html',
    selector: 'page-favorite'
})

export class FavoritePage implements OnInit {

    favorites: Favorite[] = [];
    constructor(private favoriteService: FavoriteService, private navCtrl: NavController) {

    }

    ionViewWillEnter() {
       
    }

    ngOnInit() {       
        this.loadItem();
    }

    onAddItem(form: NgForm) {
        this.favoriteService.addItem(new Favorite(form.value.name, form.value.description));
        form.reset();
        this.loadItem();
    }

    loadItem() {
        this.favorites = this.favoriteService.getItems();
    }

    onDelete(index: number) {
        this.favoriteService.removeItem(index);
        this.loadItem();
    }

    editFavorite(favorite: Favorite, index: number) {
        this.navCtrl.push(EditFavoritePage, { favorite: favorite, index: index },
            // add animtion to it
        {
            direction:'back',
            duration:500,
            easing:'ease-in'
        });
    }


}