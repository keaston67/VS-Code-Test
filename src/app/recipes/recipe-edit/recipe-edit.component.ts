import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id: number;
editMode = false;
recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    );    
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    // const newRecipe = new Recipe (
    // this.recipeForm.value['name'], 
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'], 
    // this.recipeForm.value['ingredients']
    // );
    if (this.editMode) { 
    this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    console.log(this.recipeForm);
  } else {
    this.recipeService.addRecipe(this.recipeForm.value);
  }
  // navigate away 
  // this.router.navigate(['../../'], {relativeTo: this.route})
  // or call onCancel()
  this.onCancel();
}

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, 
          [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)]
          )
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  
  onXIngredient(index: number) {
    // My practice - removing individual recipe from array using a service
  console.log(
    'Recipe index: ' + this.id + '\n' 
  + 'Recipe name: ' + this.recipeForm.value.name + '\n' 
  + 'Ingredient index: ' + index +'\n'
  + 'Ingredient name: ' + this.recipeForm.value.ingredients[index].name 
   );
   this.recipeService.deleteRecipeIngredient(this.id, index);
  //  if want to navigate away - but may want to do more than one edit 
  //  this.router.navigate(['../']);
  
  //  Max's method 
  // He removes the component - then because we are using save button it updates the 
  // recipes array there - much easier. But good practice on my part going into data and 
  // splicing out the individual ingredient. 

  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }

  private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients = new FormArray([]);

      if (this.editMode) {
        const recipe = this.recipeService.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
              [Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

      this.recipeForm = new FormGroup( {
      'name': new FormControl((recipeName), Validators.required),
      'imagePath': new FormControl((recipeImagePath),Validators.required),
      'description': new FormControl ((recipeDescription),Validators.required),
      'ingredients': recipeIngredients   
    });
  }

 

}
