import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { RecipeService } from '../../recipes/recipe.service';
import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {  

  // event emitter removed with implementation of Router links
  // @Output() headerOption = new EventEmitter<string>();

  constructor( private recipeService:  RecipeService,
              private dataStorageService: DataStorageService,
              private authService: AuthService) {}

  @Input() fromApp :string;
  message: string = "Hi from the Head!";
  newMessage: string = "Hi from the NEW Head!";

  ngOnInit() {
  }

  onSave() {
    this.recipeService.saveRecipes().subscribe(
      (response: Response) => console.log(response),
      (error) => console.log(error)
    );
  }

  // My method:
    // onFetch() {
    //   this.dataStorageService.fetchRecipes().subscribe(
    //     (recipes: any []) => 
    //     // console.log(recipes),
    //     this.recipeService.loadRecipes(recipes),
    //     (error) => console.log(error)
    //   );
    // }

    //  Max's Method simply calls the datadtorage service method - no need to subscribe as above
    //   as already subscribed in data service.
    onFetch() {
      this.dataStorageService.fetchRecipes();
    }
    
    onLogout() {
      this.authService.logout();
    }

    isAuthenticated(){
      return this.authService.isAuthenticated();
    }

  }

  // -------- My old practice code - toggling, and old navigation event emitter code -------- 
  // B. strings used to update button descriptions
  // label: string = ">goto Shopping list";
  // featureLabel: string = 'Recipes';

  // B. Booleans: 
  // displayRecipe = true;
  // displayShopping = false;

  // A. Use string passed in on button click

// on click and event emitter removed with implementation of Router links
  // goto(option: string) {
  // this.headerOption.emit(option);
  // C. 3 lines of misc Toggle stuff
  //   this.label = "toggle";
  // this.selection=option;
  //   console.log('header navigation bar selection = ' + option);  
  // }

  // B. individual button methods using boolean - can be used for a toggle button
  // gotoRec() {
  // this.displayRecipe = !this.displayRecipe;
  // B. for toggle
  // this.displayShopping = !this.displayShopping;
  // if(this.displayRecipe)  {this.label = "> goto Shopping list"; this.featureLabel="Recipes"} ;
  // if(this.displayShopping) {this.label = "> goto Recipes" ; this.featureLabel="Shopping list"};
  // }

  // gotoShop() {
    // this.displayShopping = !this.displayShopping;
    // for toggle
    // this.displayRecipe = !this.displayRecipe;
      //  this.label = "Shopping";
    // }
// B. Ends


  


