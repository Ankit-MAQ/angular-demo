import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { ApproveStudent } from './pages/approve-student/approve-student';
import { LegacyHost } from './pages/legacy-host/legacy-host';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // default route
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: 'approve-student', component: ApproveStudent },
    { path: 'legacy/student', component: LegacyHost },
    { path: '**', redirectTo: 'home' } // fallback route
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
