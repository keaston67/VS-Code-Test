import {Ingredient} from '../shared/ingredient.model';
// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
ingredientsChanged= new Subject<Ingredient[]>();
startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
        ];

getIngredients() {
            return this.ingredients.slice();
        }   
        
        
getIngredient(index: number) {
            return this.ingredients.slice()[index];
        }   


// method to add a single ingredient via shopping-edit component
addIngredient(ingredient: Ingredient) {
            console.log('shopping list service received: '+ ingredient.amount +' ' + ingredient.name);
            this.ingredients.push(ingredient);
            console.log('updated shopping list now contains: ' + this.ingredients.length +' items.')
            // using subject so change /emit to .next
            // this.ingredientsChanged.emit(this.ingredients.slice());
            this.ingredientsChanged.next(this.ingredients.slice());
                }

// method to add multiple ingredients via recipe detail components send to shopping list
addIngredients(ingredients: Ingredient[]) {
    //   loop methods
    // 1. for let loop - only downside it emits a lot of events
    // for (let ingredient of ingredients) {
    //     this.addIngredient(ingredient);
    //                 }
    //             }
    // 2. Add all ingredients in one go then emit 1 event with a ES6 spread operator
    // to turn array of elements into a list of elements.
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
            }     

            
updateIngredients(index:number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
    }

deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}