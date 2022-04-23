import BoardAPI from '../api/BoardAPI.js';

export default class DropZone {
    static createDropZone() {
        const range = document.createRange();
        range.selectNode(document.body);
        const dropzone = range.createContextualFragment(`
                                                        <div class="board__dropzone"></div>
                                                        `).children[0];
        dropzone.addEventListener("dragover", e => {
            e.preventDefault();
            dropzone.classList.add("board__dropzone-active");
        });
        dropzone.addEventListener("dragleave", e => {
            e.preventDefault();

            dropzone.classList.remove("board__dropzone-active");
        });
        dropzone.addEventListener("drop", e => {
            e.preventDefault();

            dropzone.classList.remove("board__dropzone-active");
            const id = Number(e.dataTransfer.getData("text/plain"));
            const column = e.target.closest(".board__column");
            const columnId = Number(column.dataset.id);
            const dropZonesInColumn = Array.from(column.querySelectorAll(".board__dropzone"));
            const droppedIndex = dropZonesInColumn.indexOf(dropzone);
            const droppedItemElement = document.querySelector(`[data-id="${id}"]`);
            const insertAfter = dropzone.parentElement.classList.contains("board__item") ? dropzone.parentElement : dropzone;

            if (droppedItemElement.contains(dropzone)) {
                return;
            }
            insertAfter.after(droppedItemElement);


            BoardAPI.updateItem(id, {
                columnId: columnId,
                position: droppedIndex
            });
        });

        return dropzone;


    }
}
