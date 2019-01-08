import { Recipe} from './recipe.model';
import {Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { AuthService } from '../auth/auth.service';
// import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class RecipeService {
    // Add a subject to emit a Recipe array with .next method
    recipesChanged= new Subject<Recipe[]>();
    // delete emitter - no longer needed, removed from import
    // recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe('A tasty Burrito', 'This is a simple, tasty recipe','https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?cs=srgb&dl=burrito-chicken-close-up-461198.jpg&fm=jpg', 
    [
        new Ingredient('chicken', 1),
        new Ingredient('wraps', 10)
    ]),
        new Recipe('Hamburger', 'A delicious Burger!','https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?cs=srgb&dl=burger-chips-dinner-70497.jpg&fm=jpg',  
    [
        new Ingredient('Buns', 4),
        new Ingredient('Patties', 6),
        new Ingredient('Cheese', 1)
    ])
      ];

      constructor(private slService: ShoppingListService,
                // private dataStorageService: DataStorageService,
                private http: Http,
                private authService: AuthService ){}

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index) {
          return this.recipes.slice()[index];
      }

    // method to add Ingredients to shopping list using injected shopping service
      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
          this.recipes[index] = newRecipe;
          this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }

    //   Not an official Max method, this slices out an individual ingredient in a nested array
    deleteRecipeIngredient(recipeIndex: number, ingredientIndex: number) {
        console.log('You have deleted: ' +this.recipes[recipeIndex].ingredients[ingredientIndex].name 
        + ' ' + this.recipes[recipeIndex].ingredients[ingredientIndex].amount);
        this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    saveRecipes(){
        const token = this.authService.getToken()

        return this.http.put('https://ng-recipe-book-67e9a.firebaseio.com/recipes.json?auth=' + token, this.recipes);
    }

    loadRecipes(recipeLoad: Recipe[]) {
        console.log('recipes received from server: ' + recipeLoad);
        this.recipes = recipeLoad;
        this.recipesChanged.next(this.recipes.slice());
    }

    // storeServers(servers: any[]) {
    //     const headers = new Headers({'Content-Type': 'application/json'});
    //     // return this.http.post('https://udemy-ng-http-619d7.firebaseio.com/data.json',
    //     //  servers,
    //     // {headers: headers});
    //     return this.http.put('https://udemy-ng-http-619d7.firebaseio.com/data.json',
    //      servers,
    //     {headers: headers});
    //     }
    



}