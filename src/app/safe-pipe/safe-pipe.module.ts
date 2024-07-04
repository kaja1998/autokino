import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';  // Importieren Sie die SafePipe

@NgModule({
  declarations: [SafePipe],  // Deklarieren Sie die SafePipe
  imports: [CommonModule],
  exports: [SafePipe]  // Exportieren Sie die SafePipe
})
export class SafePipeModule {}
