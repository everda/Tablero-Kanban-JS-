export default class BoardAPI {
    static getItems(colId) {
        const column = getStorage().find(column => column.id === colId);

        return column ? column.items : [];
    }
    static insertItem(colId, content) {
        let data = getStorage();

        let col = data.find(column => column.id === colId);
        let item = {
            id: Math.floor(Math.random() * 100000),
            content: content
        }
        if (!col) {
            throw new Error("column not found");
        }
        col.items.push(item);
        setStorage(data);
        return item;
    }

    static updateItem(itemId, newContent) {
        let data = getStorage();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                let item = column.items.find(item => item.id === itemId);
                if (item) {
                    return [item, column];
                }
            }
        }
        )();

        if (!item) {
            throw new Error("item not found");
        }
        
        item.content = newContent.content === "" ? item.content : newContent.content || item.content;
        
        

        if (newContent.columnId !== undefined && newContent.position !== undefined) {
           
            const newColumn = data.find(column => column.id === newContent.columnId);
            if (!newColumn) {
                throw new Error("target column not found");
            }
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);
            newColumn.items.splice(newContent.position, 0, item);
            setStorage(data);

        }
        
        setStorage(data);
    }


    static deleteItem(itemId) {
        let data = getStorage();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                let item = column.items.find(item => item.id === itemId);
                if (item) {
                    return [item, column];
                }
            }
        }
        )();
        if (item) {
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

        }
        setStorage(data);
    }

}

const getStorage = () => {
    const json = localStorage.getItem('board-data');

    return json ? JSON.parse(json) : [
        {
            id: 1,
            items: []
        },
        {
            id: 2,
            items: []

        },
        {
            id: 3,
            items: []
        }
    ];
}


const setStorage = (data) => {
    localStorage.setItem('board-data', JSON.stringify(data));
}   
