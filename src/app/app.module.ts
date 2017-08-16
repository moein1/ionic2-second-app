import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule }  from '@angular/http';

import { MyApp } from './app.component';
import { TabsPage } from "../pages/tabs/tabs";
import { ShoppingListPage } from "../pages/shopping-list/shopping-list";
import { RecipesPage } from "../pages/recipes/recipes";
import { RecipePage } from "../pages/recipe/recipe";
import { EditRecipePage } from "../pages/edit-recipe/edit-recipe";
import { ShoppingListService } from "../pages/services/shopping-list";
import { RecipeService } from "../pages/services/recipe.service";
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { AuthService } from "../pages/services/auth";
import { DatabaseOptionsPage } from "../pages/database-options/database-options";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipesPage,
    RecipePage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipeService,
    AuthService
  ]
})
export class AppModule {}
