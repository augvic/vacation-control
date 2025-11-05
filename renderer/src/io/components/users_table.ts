import { GetUsers } from "../../tasks/get_users.js";
import { Notification } from "./notification.js";

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
        this.element.className = "h-auto w-auto p-2 flex items-center justify-center whitespace-nowrap";
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
    
    private async createComponents() {
        try {
            const getUsersTask = new GetUsers();
            const response = await getUsersTask.execute();
            if (!response.success) {
                new Notification(response.message, "red");
            }
            const users = response.data;
            let userCells: HTMLElement[] = [];
            let admissionCells: HTMLElement[] = [];
            let statusCells: HTMLElement[] = [];
            let daysLeftCells: HTMLElement[] = [];
            users.forEach(user => {
                new BodyRow(this.element, userCells, admissionCells, statusCells, daysLeftCells, user.user, user.admission, user.status, user.daysLeft);
            });
        } catch(error) {
            new Notification(`${error}`, "red");
        }
    }
    
}

class BodyRow {
    
    element!: HTMLDivElement
    
    constructor(appendTo: HTMLElement, userCells: HTMLElement[], admissionCells: HTMLElement[], statusCells: HTMLElement[], daysLeftCells: HTMLElement[], user: string, admission: string, status: string, daysLeft: string) {
        this.createSelf();
        this.createComponents(userCells, admissionCells, statusCells, daysLeftCells, user, admission, status, daysLeft);
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "h-auto w-auto flex";
    }
    
    private createComponents(userCells: HTMLElement[], admissionCells: HTMLElement[], statusCells: HTMLElement[], daysLeftCells: HTMLElement[], user: string, admission: string, status: string, daysLeft: string) {
        setTimeout(() => {
            new BodyRowCell(this.element, userCells, user, 1);
            new BodyRowCell(this.element, admissionCells, admission, 2);
            new BodyRowCell(this.element, statusCells, status, 3);
            new BodyRowCell(this.element, daysLeftCells, daysLeft, 4);
        }, 500);
    }
    
}

class BodyRowCell {
    
    element!: HTMLDivElement
    
    constructor(appendTo: HTMLElement, cells: HTMLElement[], text: string, position: number) {
        this.createSelf(text);
        appendTo.appendChild(this.element);
        cells.push(this.element);
        let headerElement = document.getElementById(`header-${position}`)!;
        let width = headerElement.offsetWidth;
        cells.forEach(cell => {
            if (cell.offsetWidth > width) {
                width = cell.offsetWidth;
            }
        });
        cells.forEach(cell => {
            cell.style.width = width + "px";
        });
        headerElement.style.width = width + "px";
    }
    
    private createSelf(text: string) {
        this.element = document.createElement("div");
        this.element.className = "h-auto w-auto p-2 flex items-center justify-center whitespace-nowrap";
        this.element.innerText = text;
    }
    
}
