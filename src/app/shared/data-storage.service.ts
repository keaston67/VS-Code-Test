import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {

constructor(private http: Http,
    // inject recipeService for Max method
            private recipeService: RecipeService,
            private authService: AuthService ){}

//  My Method:
// fetchRecipes(){
// return this.http.get('https://ng-recipe-book-67e9a.firebaseio.com/recipes.json')
// .map(
//     (response: Response ) => {
//         const recipes = response.json();
//         return recipes;
//                 }
//             );
//         }

// 
// Max's getRecipes() method - he subscribes to Observable here and fires off the recipeService method
// here rather than in the header. 
fetchRecipes(){
const token = this.authService.getToken()

this.http.get('https://ng-recipe-book-67e9a.firebaseio.com/recipes.json?auth='+ token)

.map(
    (response: Response ) => {
     const recipes: Recipe[] = response.json();
    //    add a for loop to check each recipe has an ingredient array:
    for (let recipe of recipes ) {
        // Max uses square bracket syntax, 
        // I use dot, It still works.
        // if ( !recipe.ingredients) { 
            // Max
        if ( !recipe['ingredients']) { 
            // log to check recipe has no ingredients   
            console.log('This recipe has no Ingredients: ' + recipe.name)
            recipe.ingredients = [];
            // my play code:
            // const ing = {name: "No ingredients listed", amount: 0};
            // recipe.ingredients.push(ing);
            // console.log('We have now updated ' + recipe.name +' with an empty ingredient array:' + recipe.ingredients[0].name)
        }
    }
    return recipes;
    }
)
// instead of map to transform subscribes here 
.subscribe(
    (recipes: Recipe[]) => { 
//  doesn't have recipeService method so sets it up same as mine - called setRecipes()
 this.recipeService.loadRecipes(recipes);

                }
            );
        }



}