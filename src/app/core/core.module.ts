import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { RouterModule } from '@angular/router';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';


@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        //  Can use RouterModule, but need to import AppRoutingModule 
        //  in appModule as app.component needs to render root routes
        // always have root Routes in app.module.
        RouterModule
        // or custom AppRoutingModule:
        // AppRoutingModule
    ],
    exports: [
        // AppRoutingModule,
        HeaderComponent
    ],
    providers: 
    [ShoppingListService, 
    RecipeService, 
    DataStorageService, 
    AuthService
    ,AuthGuard
],

})

export class CoreModule {}