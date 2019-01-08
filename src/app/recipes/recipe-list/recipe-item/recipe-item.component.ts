import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

export class RecipeItemComponent implements OnInit {
@Input() recipe: Recipe;
// add the index for the recipe
@Input() index: number;

// @Output() recipeSelected = new EventEmitter<void>();

  constructor(private recipeService: RecipeService){ }

  onSelected() {
    // log the index of the 
    console.log('recipe clicked to display detail - index: ' + this.index);
    
    // 

    // use the recipe service to emit the recipe so it can be displayed in recipe-detail
    // this.recipeService.recipeSelected.emit(this.recipe);

    // old recipe emitter / moved to RecipeService
    // this.recipeSelected.emit();

  }
  
  ngOnInit() {
  
  }

}