import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[DragAndDrop]'
})
export class DndDirective {
    @Output() private filesChangeEmiter: EventEmitter<FileList> = new EventEmitter();

    @HostListener('dragover', ['$event']) onDragOver(event) {
        event.preventDefault();
    }

    @HostListener('drop', ['$event']) public onDrop(evt) {
        console.log('onDrop', evt);
        evt.preventDefault();
        evt.stopPropagation();

        let files = evt.dataTransfer.files;

        if (files.length > 0) {
            this.filesChangeEmiter.emit(files);
        }
    }
}