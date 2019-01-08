import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
newIngredient: Ingredient;
subscription: Subscription;
editMode = false;
editedItemIndex: number;
editedIngredient: Ingredient;
buttonTitle = 'Add';
@ViewChild('f') slForm : NgForm;
// @ViewChild('nameInput') nameInputRef: ElementRef;
// @ViewChild('amountInput') amountInputRef: ElementRef;;
  
constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;   
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        console.log(this.editedIngredient);
        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
  });
  
}

  // --- pass local references into method ---
  // onAddIngredient(nameInput, amountInput) {
  //   this.newIngredient = new Ingredient(nameInput.value, amountInput.value);
  //   console.log('Add ingredient button clicked! adding: '  + this.newIngredient.amount +' ' + this.newIngredient.name +' ');
  //   this.ingredientAdded.emit(this.newIngredient);
  // }
  
  // --- using @ViewChild with elementRef ---
  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    console.log('Add ingredient button clicked! adding: '  + newIngredient.amount +' ' + newIngredient.name +' ');
    if(this.editMode) {
      this.shoppingListService.updateIngredients(this.editedItemIndex, newIngredient);
    } else {
    this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode =  false;
    this.slForm.reset();
}
 
onClear(){
  this.editMode = false;
  this.slForm.reset();
}

onDelete(){
  this.shoppingListService.deleteIngredient(this.editedItemIndex);
  this.onClear();
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
