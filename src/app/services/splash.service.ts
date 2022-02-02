import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SplashService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  flashMessage(msg: string) {
    this._snackBar.open(msg, 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
