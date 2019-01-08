import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
// @Input() recipe: Recipe;
recipe: Recipe;
recipeIndex: number;
id: number;
subscription: Subscription;

constructor(private shoppingListService: ShoppingListService,
private recipeService: RecipeService,
private route: ActivatedRoute,
private router: Router ) { }

  ngOnInit() {
    // this.recipeIndex = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeIndex = +params['id'];
        console.log('index received = ' + this.recipeIndex)
        this.recipe = this.recipeService.getRecipe(this.recipeIndex)
        this.subscription = this.recipeService.recipesChanged.subscribe(
          (recipes: Recipe[]) => {
            this.recipe = recipes[this.recipeIndex];
          }
        );
      }
    );
    
  }

sendToShoppingList() {
  //  ---- Using Shopping Service -----
  // var i:number;
  //console.log('sendToShopping Clicked '+ [this.recipe.ingredients]);
  // for (i = 0; i <= this.recipe.ingredients.length-1; i++) {
  // console.log('Sending this to shopping list: ' + this.recipe.ingredients[i].amount + ' ' +this.recipe.ingredients[i].name);
  // this.shoppingListService.addIngredient(this.recipe.ingredients[i])

  // -- More Efficient method to loop through ingredients --
  // this.recipe.ingredients.forEach(ingredient => this.shoppingListService.addIngredient(ingredient));
  
  // ---- Using Recipe Service ----
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    console.log('sendToShopping Clicked '+ [this.recipe.ingredients]);
    }


onEditRecipe() {
// this.router.navigate(['edit'], {relativeTo: this.route});
//  alternative using id:
this.router.navigate(['../', this.recipeIndex ,'edit'], {relativeTo: this.route});
}

onDeleteRecipe() {
  this.recipeService.deleteRecipe(this.recipeIndex);
  // this.router.navigate(['../'], {relativeTo: this.route});
  // or navigate directly to recipes
  this.router.navigate(['/recipes']);

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
  
