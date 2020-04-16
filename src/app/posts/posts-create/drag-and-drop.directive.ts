import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @Output() onFileDropped = new EventEmitter<FileList>();
  @Output() onFileHovered = new EventEmitter<boolean>();

  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'


  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    this.onFileHovered.emit(true);
  }
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    this.onFileHovered.emit(false);
  }
  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
    this.onFileHovered.emit(false);
  }

}
