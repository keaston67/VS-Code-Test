import { Component, OnInit } from '@angular/core';
//  recipe model not needed here
// import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  // , providers: [RecipeService]
})

export class RecipesComponent implements OnInit {
  // selectedRecipe not needed
  // selectedRecipe: Recipe;

  constructor() {}
  // injected service not needed
  // private recipeService : RecipeService) { }

  ngOnInit() {

    //  recipeSelected subscripton no longer needed
    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe
    //   }
    // );
  }

}
