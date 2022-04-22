import Column from './column.js';

export default class boardView {
    constructor(root) {
        this.root = root
        boardView.columns().forEach(column => {
            const columnView = new Column(column.id, column.title);
            this.root.appendChild(columnView.elements.root);
        })
    }
    static columns() {
        return [
            {
                id: 1,
                title: "Pendientes"
            },
            {
                id: 2,
                title: "En Proceso"
            },
            {
                id: 3,
                title: "Finalizados"
            }]
    }
}