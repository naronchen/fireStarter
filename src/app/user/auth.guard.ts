import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private snack: SnackService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    //user object or Null(not logged in)
    const user = await this.afAuth.currentUser;
    const isLoggedIn = !!user; // convert to boolean
    console.log(isLoggedIn)
    if (!isLoggedIn) {
      this.snack.authError();
    }
    return isLoggedIn;
  }
}