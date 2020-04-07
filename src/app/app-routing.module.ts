import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/posts-create/post-create.component";
import { CanDeactivateGuard } from './posts/posts-create/can-deactivate.service';


const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canDeactivate: [CanDeactivateGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
