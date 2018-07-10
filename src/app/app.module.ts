import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig,LoginOpt } from "angularx-social-login";
import { GoogleLoginProvider} from "angularx-social-login";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const config = {
  apiKey: "AIzaSyDTCLfG0LVXpaxausMnBHVcrQVExZgOfJ4",
  authDomain: "angularfirstapp-45ad4.firebaseapp.com",
  databaseURL: "https://angularfirstapp-45ad4.firebaseio.com",
  projectId: "angularfirstapp-45ad4",
  storageBucket: "angularfirstapp-45ad4.appspot.com",
  messagingSenderId: "260422990077"
};

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';


const googleLoginOptions: LoginOpt = {
  // auth_type?: string;
    return_scopes: true
};

let configs =  new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("260422990077-collpugunighnbvq3p01oagkobole2ip.apps.googleusercontent.com",googleLoginOptions)
  }
]);

export function provideConfig() {
  return configs;
}

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [
    {
    provide: AuthServiceConfig,
      useFactory: provideConfig
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
