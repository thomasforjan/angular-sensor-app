import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private backendService: BackendService
  ) {}

  confirmDeleteModal() {
    this.backendService.deleteSensorsDaten(this.data.id);
    this.dialogRef.close();
  }

  cancelDeleteModal() {
    this.dialogRef.close();
  }
}
