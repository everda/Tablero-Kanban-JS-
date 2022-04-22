import BoardAPI from '/js/api/BoardAPI.js';
import DropZone from './dropZone.js';

export default class Item {
    constructor(id, content) {
        const dropZone = DropZone.createDropZone()
        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".board__item-input");
        this.elements.close = this.elements.root.querySelector(".board__item-close");
        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;
        this.elements.root.appendChild(dropZone);

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id);
        });

        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        });



        const onEdit = () => {

            const newContent = this.elements.input.textContent.trim();


            if (newContent !== this.content) {
                console.log(id, newContent)
                BoardAPI.updateItem(id, {
                    content: newContent,
                });
                this.content = newContent;
            }
        };

        this.elements.input.addEventListener("blur", onEdit);
        this.elements.close.addEventListener("click", (e) => {
            let alert = confirm("esta seguro que quiere borrar el item?")
          
            if (alert) {
                BoardAPI.deleteItem(id);
                //this.elements.root.remove();

                this.elements.input.removeEventListener("blur", onEdit);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }


        })



    }

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
        <div class="board__item" draggable="true">
            <div class ="d-flex board__item-container">
                <div class="board__item-input" contenteditable></div>
                <span class = "board__item-close">x</span>
            </div>
		</div>
            `).children[0];
    }
}

