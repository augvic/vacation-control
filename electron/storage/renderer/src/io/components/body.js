export class Body {
    element;
    container;
    constructor(appendTo) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-full h-auto flex flex-1 bg-gray-300 p-3";
    }
    createComponents() {
        this.container = new Container(this.element);
    }
}
class Container {
    element;
    titleBar;
    table;
    constructor(appendTo) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-full h-full flex flex-col bg-white rounded-lg p-3 gap-y-2";
    }
    createComponents() {
        this.titleBar = new ContainerTitleBar(this.element);
        this.table = new ContainerTable(this.element);
    }
}
class ContainerTitleBar {
    element;
    searchInput;
    searchButton;
    addButton;
    constructor(appendTo) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-full h-auto flex gap-x-2";
    }
    createComponents() {
        this.searchInput = new ContainerTitleBarSearchInput(this.element);
        this.searchButton = new ContainerTitleBarSearchButton(this.element);
        this.addButton = new ContainerTitleBarAddButton(this.element);
    }
}
class ContainerTitleBarSearchInput {
    element;
    constructor(appendTo) {
        this.createSelf();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("input");
        this.element.className = "w-[400px] h-full p-1 bg-white border border-gray-300 rounded-md outline-none";
        this.element.placeholder = "Pesquisar";
    }
}
class ContainerTitleBarSearchButton {
    element;
    icon;
    constructor(appendTo) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("button");
        this.element.className = "w-auto h-auto p-1 bg-blue-700 hover:bg-blue-900 cursor-pointer rounded-md";
    }
    createComponents() {
        this.icon = new Icon("../../../storage/icons/magnifying_glass.png", this.element);
    }
}
class ContainerTitleBarAddButton {
    element;
    icon;
    constructor(appendTo) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("button");
        this.element.className = "w-auto h-auto p-1 bg-green-700 hover:bg-green-900 cursor-pointer rounded-md";
    }
    createComponents() {
        this.icon = new Icon("../../../storage/icons/plus.png", this.element);
    }
}
class ContainerTable {
    element;
    header;
    body;
    constructor(appendTo) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-full h-auto flex flex-1 text-black";
    }
    createComponents() {
        this.header = new ContainerTableHeader(this.element);
        this.body = new ContainerTableBody(this.element);
    }
}
class ContainerTableHeader {
    element;
    constructor(appendTo) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-full h-[10%] flex bg-gray-300 rounded-t-lg";
    }
    createComponents() {
        new ContainerTableHeaderCell(this.element, "Nome", 1);
        new ContainerTableHeaderCell(this.element, "Admissão", 2);
        new ContainerTableHeaderCell(this.element, "Programado para", 3);
        new ContainerTableHeaderCell(this.element, "Dias restantes", 4);
    }
}
class ContainerTableHeaderCell {
    element;
    constructor(appendTo, text, position) {
        this.createSelf(text, position);
        appendTo.appendChild(this.element);
    }
    createSelf(text, position) {
        this.element = document.createElement("div");
        this.element.className = "h-auto w-auto px-2 flex items-center justify-center";
        this.element.innerText = text;
        this.element.id = `header-${position}`;
    }
}
class ContainerTableBody {
    element;
    constructor(appendTo) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-full h-[95%] flex flex-col";
    }
    createComponents() {
    }
}
class ContainerTableBodyRow {
    element;
    constructor(appendTo, text) {
        this.createSelf(text);
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    createSelf(text) {
        this.element = document.createElement("div");
        this.element.className = "h-[5%] w-auto flex";
        this.element.innerText = text;
    }
    createComponents() {
    }
}
class ContainerTableBodyRowCell {
    element;
    constructor(appendTo, text) {
        this.createSelf(text);
        appendTo.appendChild(this.element);
    }
    createSelf(text) {
        this.element = document.createElement("div");
        this.element.className = "h-auto w-auto px-2 flex items-center justify-center";
        this.element.innerText = text;
    }
}
class Icon {
    element;
    constructor(src, appendTo) {
        this.createSelf(src);
        appendTo.appendChild(this.element);
    }
    createSelf(src) {
        this.element = document.createElement("img");
        this.element.src = src;
        this.element.className = "size-5";
    }
}
