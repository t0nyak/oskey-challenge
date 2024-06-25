import { Component, inject } from '@angular/core';
import {
  MatSnackBarRef,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor() {}
}
