import { Routes, RouterModule } from "@angular/router";
import { MatComponent } from './homengb/mat.component';




const arr: Routes=[
{path:'mat',component:MatComponent}
];

export const routing=RouterModule.forRoot(arr);
