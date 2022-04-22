import BoardApi from '../api/BoardAPI.js';
import Item from './item.js';
import DropZone from './dropZone.js';

export default class Column {
    constructor(id, title) {
        const firstDropZone = DropZone.createDropZone();
        
        this.elements = [];
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".board__column-title");
        this.elements.items = this.elements.root.querySelector(".board__column-items");
        this.elements.button = this.elements.root.querySelector(".board__add-item");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(firstDropZone);
        this.elements.button.addEventListener("click", () => {
            const newItem = BoardApi.insertItem(id, "");
           
            this.renderItem(newItem);
        });

        

        BoardApi.getItems(id).forEach(item => {
            this.renderItem(item);
        });

    }


    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
        <div class="board__column">
            <div class="board__column-title"></div>
            <div class="board__column-items"></div>
            <button class="board__add-item">Add</button>
        </div>`).children[0];

    }

    renderItem(item) {
        const itemView = new Item(item.id, item.content);
  //      const dropZone = DropZone.createDropZone();
        this.elements.items.appendChild(itemView.elements.root);
    //    this.elements.items.appendChild(dropZone)
    }
}
