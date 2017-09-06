import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Favorite } from "../../models/favorite";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { FavoriteService } from "../services/favorite";


@Component({
    templateUrl: 'edit-favorite.html',
    selector: 'page-edit-favorite'
})

export class EditFavoritePage implements OnInit {
    favorite: Favorite;
    favoriteForm: FormGroup;
    index: number;
    constructor(private navParam: NavParams, private navCtrl: NavController, private favoriteService: FavoriteService) {

    }

    ngOnInit() {
        this.favorite = this.navParam.get('favorite');
        this.index = this.navParam.get('index');
        this.initialForm();
    }

    initialForm() {
        let name = this.favorite.name;
        let description = this.favorite.description;
        this.favoriteForm = new FormGroup({
            'name': new FormControl(name, Validators.required),
            'description': new FormControl(description, Validators.required)
        });
    }

    onSubmit() {
        this.favoriteService.editItem(this.favoriteForm.value, this.index)
        this.favoriteForm.reset();        
        this.navCtrl.popToRoot();
    }
}