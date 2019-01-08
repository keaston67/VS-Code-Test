import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
// import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { RecipeService } from './recipes/recipe.service';
// import { DataStorageService } from './shared/data-storage.service';
// import { AuthService } from './auth/auth.service';
// import { AuthGuard } from './auth/auth-guard.service';
// import { RecipesModule } from './recipes/recipe.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingRoutingModule } from './shopping-list/shopping-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
// import { RouterModule } from '../../node_modules/@angular/router';
// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent
    // HeaderComponent,
    // HomeComponent,
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    HttpModule,
    // RecipesModule,
    ShoppingListModule,
    AppRoutingModule,
    ShoppingRoutingModule,
    SharedModule,
    AuthModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
  
  
})
export class AppModule { }
