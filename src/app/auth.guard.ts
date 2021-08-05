import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public currentUser: any;
  public perm: string[] = [];

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (localStorage.getItem('currentUser')) {
        this.currentUser = JSON.parse(<any>localStorage.getItem('currentUser'));
        JSON.parse(<any>localStorage.getItem('permissions'));
        if(localStorage.getItem('permissions')){
          this.perm = [];
          let arrayPermisos = JSON.parse(<any>localStorage.getItem('permissions'));
          for (let index = 0; index < arrayPermisos.length; index++) {
            let element = arrayPermisos[index];
            this.perm.push(element['perm']);
          }
        }
        return true;
      }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
  
}
