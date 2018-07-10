import { Component } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Observable } from 'rxjs/internal/Observable';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'Namma App';

  public user: SocialUser;
  public loggedIn: boolean;
  outputList : Observable<any []>;
  outputListEmail : Observable<any []>;
  outputLists : any [];

  constructor(private authService: AuthService, public af: AngularFireDatabase) { 
    
    let summa = this.af.list('items/emailIds');
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn){
        summa.push({'email':this.user.email, 'date': '12/11/19'+new Date(), isActive: true});
      }
    });
    
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }
  deleteIt(key){
    console.log(key);
    if(key == 'all'){
      this.af.list('/items/emailIds').remove();
    }
    else{
      this.af.list('/items/emailIds').remove(key);
    }
    
  }

  update(key,value){
    console.log(key);
    this.af.list('/items/emailIds').update(key,{isActive : value});
  }
   
  ngOnInit() {
    this.outputListEmail = this.af.list('/items/emailIds').snapshotChanges();

    let tempArray = [];
    this.outputListEmail.subscribe((block) => {
      tempArray = [];
      block.forEach(o =>{
        console.log(o.payload.key);
        tempArray.push({ key: o.payload.key, ...o.payload.val()});
      })
      this.outputLists = tempArray;
      console.log(this.outputLists);
    });
  }


}
