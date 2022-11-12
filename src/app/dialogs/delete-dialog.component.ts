import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backendService: BackendService,
    private _snackBar: MatSnackBar
  ) {}

  confirmDeleteModal() {
    this.backendService.deleteSensorsDaten(this.data.id);
    this.dialogRef.close();
    this._snackBar.open('Messerwert wird gelöscht', 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }

  cancelDeleteModal() {
    this.dialogRef.close();
  }
}
