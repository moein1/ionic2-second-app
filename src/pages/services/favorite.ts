import { Favorite } from '../../models/favorite';


export class FavoriteService {
    private favorites: Favorite[] = [];


    addItem(favorite: Favorite) {
        this.favorites.push(favorite);
    }

    removeItem(index: number) {
        this.favorites.splice(index, 1);
    }

    getItems() {
        return this.favorites;
    }

    editItem(item, index) {
        this.favorites[index] = new Favorite(item.name, item.description);
    }

}