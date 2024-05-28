import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BaseComponent } from './components/base/base.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard, profileGuard } from './services/auth.guard';
import { profileResolver } from './services/profile.resolver';
import { CarsComponent } from './components/cars/cars.component';
import { DialogOverviewExampleComponent } from './components/dialog-overview-example/dialog-overview-example.component';
import { dialogResolver } from './services/dialog.resolver';
import { CartComponent } from './components/cart/cart.component';
import { TestDriveRequestsComponent } from './components/test-drive-requests/test-drive-requests.component';
import { MytestdrivesComponent } from './components/mytestdrives/mytestdrives.component';
import { UserPurchaseHistoryComponent } from './components/user-purchase-history/user-purchase-history.component';
import { AdminUserPurchasesComponent } from './components/admin-user-purchases/admin-user-purchases.component';
import { adminGuard } from './services/admin.guard';
import { testdriverequestsResolver } from './services/testdriverequests.resolver';
import { NewsComponent } from './components/news/news.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
const itemRoutes: Routes = [
    {path: 'cart', component: CartComponent}
];
export const routes: Routes = [
    {
        path: "", component: BaseComponent
    },
    {
        path: "cars", component: CarsComponent
    },
    {
        path: 'login', component: LoginComponent, canActivate: [authGuard]
    },
    {
        path: 'register', component: RegisterComponent, canActivate: [authGuard]
    },
    {
        path: 'profile', component: ProfileComponent, canActivate: [profileGuard], resolve: {data: profileResolver}
    },
    {
        path: 'news', component: NewsComponent
    },
    {
        path: 'feedbacks', component: FeedbacksComponent
    },
    {
        path: 'profile/cart', component: CartComponent
    },
    {
        path: 'test-drive-requests', component: TestDriveRequestsComponent, canActivate:[adminGuard], resolve: {requests: testdriverequestsResolver}
    },
    {
        path: 'profile/my-test-drives', component: MytestdrivesComponent
    },
    {
        path: 'profile/purchase-history', component: UserPurchaseHistoryComponent
    },
    {
        path: 'profile/admin-user-purchases', component: AdminUserPurchasesComponent, canActivate:[adminGuard]
    },
    {
        path: 'about_us', component: AboutUsComponent
    },
    {
        path: "**", redirectTo: "", pathMatch: "full"
    }
];
