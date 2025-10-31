export class UsersTableWrapper {
    
    element!: HTMLDivElement
    table!: UsersTable
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-full h-full flex overflow-auto";
    }
    
    private createComponents() {
        this.table = new UsersTable(this.element);
    }
    
}

class UsersTable {
    
    element!: HTMLDivElement
    header!: Header
    body!: Body
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-auto h-auto flex flex-col text-black";
    }
    
    private createComponents() {
        this.header = new Header(this.element);
        this.body = new Body(this.element);
    }
    
}

class Header {
    
    element!: HTMLDivElement
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-auto h-auto flex bg-gray-300 rounded-t-lg sticky top-0";
    }
    
    private createComponents() {
        new HeaderCell(this.element, "Nome", 1);
        new HeaderCell(this.element, "Admissão", 2);
        new HeaderCell(this.element, "Status", 3);
        new HeaderCell(this.element, "Dias restantes", 4);
    }
    
}

class HeaderCell {
    
    element!: HTMLDivElement
    
    constructor(appendTo: HTMLElement, text: string, position: number) {
        this.createSelf(text, position);
        appendTo.appendChild(this.element);
    }
    
    private createSelf(text: string, position: number) {
        this.element = document.createElement("div");
        this.element.className = "h-auto w-auto p-2 flex items-center justify-center";
        this.element.innerText = text;
        this.element.id = `header-${position}`;
    }
    
}

class Body {
    
    element!: HTMLDivElement
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-auto h-auto flex flex-col";
    }
    
    private createComponents() {
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
        new BodyRow(this.element);
    }
    
}

class BodyRow {
    
    element!: HTMLDivElement
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "h-auto w-auto flex";
    }
    
    private createComponents() {
        setTimeout(() => {
            new BodyRowCell(this.element, "Augusto", 1);
            new BodyRowCell(this.element, "17/02", 2);
            new BodyRowCell(this.element, "Marcado parcial", 3);
            new BodyRowCell(this.element, "15", 4);
        }, 500);
    }
    
}

class BodyRowCell {
    
    element!: HTMLDivElement
    
    constructor(appendTo: HTMLElement, text: string, position: number) {
        this.createSelf(text);
        appendTo.appendChild(this.element);
        let headerElement = document.getElementById(`header-${position}`)!;
        if (headerElement.offsetWidth < this.element.offsetWidth) {
            headerElement.style.width = this.element.offsetWidth + "px";
        } else {
            this.element.style.width = headerElement.offsetWidth + "px";
        }
    }
    
    private createSelf(text: string) {
        this.element = document.createElement("div");
        this.element.className = "h-auto w-auto p-2 flex items-center justify-center";
        this.element.innerText = text;
    }
    
}
