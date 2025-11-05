import { CreateUser } from "../../tasks/create_user.js";
import { Notification } from "./notification.js";
import { Body } from "./users_table.js";

export class EditModal {
    
    element!: HTMLDivElement
    container!: Container
    
    constructor(id: string, user: string, admission: string, status: string, daysLeft: string) {
        this.createSelf();
        this.createComponents(id, user, admission, status, daysLeft);
        document.getElementById("app-body")!.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.id = "add-modal";
        this.element.className = "w-full h-full bg-black/70 flex justify-center items-center fixed z-50";
    }
    
    private createComponents(id: string, user: string, admission: string, status: string, daysLeft: string) {
        this.container = new Container(this.element, id, user, admission, status, daysLeft);
    }
    
}

class Container {
    
    element!: HTMLDivElement
    titleBar!: TitleBar
    body!: ContainerBody
    
    constructor(appendTo: HTMLElement, id: string, user: string, admission: string, status: string, daysLeft: string) {
        this.createSelf();
        this.createComponents(id, user, admission, status, daysLeft);
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-auto h-auto bg-white rounded-lg p-3 flex flex-col gap-y-2";
    }
    
    private createComponents(id: string, user: string, admission: string, status: string, daysLeft: string) {
        this.titleBar = new TitleBar(this.element);
        this.body = new ContainerBody(this.element, id, user, admission, status, daysLeft);
    }
    
}

class TitleBar {
    
    element!: HTMLDivElement
    button!: CloseButton
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-full h-auto flex justify-end items-center";
    }
    
    private createComponents() {
        this.button = new CloseButton(this.element);
    }
    
}

class CloseButton {
    
    element!: HTMLButtonElement
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        this.startListeners();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("button");
        this.element.innerText = "×";
        this.element.className = "w-auto h-auto bg-red-700 hover:bg-red-900 rounded-full text-white px-2 cursor-pointer transition-colors duration-300";
    }
    
    private startListeners() {
        this.element.addEventListener("click", () => {
            document.getElementById("add-modal")!.remove();
        })
    }
    
}

class ContainerBody {
    
    element!: HTMLDivElement
    
    constructor(appendTo: HTMLElement, id: string, user: string, admission: string, status: string, daysLeft: string) {
        this.createSelf();
        this.createComponents(id, user, admission, status, daysLeft);
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-full h-auto flex flex-col justify-center items-center gap-y-2";
    }
    
    private createComponents(id: string, user: string, admission: string, status: string, daysLeft: string) {
        new Info(this.element, id, "id", true, "ID");
        new Info(this.element, user, "name", false, "Nome");
        new Info(this.element, admission, "admission", false, "Admissão");
        new Info(this.element, status, "status", false, "Status");
        new Info(this.element, daysLeft, "days-left", false, "Dias Restantes");
    }
    
}

class Info {
    
    element!: HTMLDivElement
    
    constructor(appendTo: HTMLElement, value: string, id: string, hidden: boolean, prefix: string) {
        this.createSelf(value, id, hidden, prefix);
        appendTo.appendChild(this.element);
    }
    
    private createSelf(value: string, id: string, hidden: boolean, prefix: string) {
        this.element = document.createElement("div");
        this.element.innerText = `${prefix}: ${value}`;
        this.element.id = `edit-modal-${id}`;
        this.element.className = "w-auto h-auto cursor-default";
        this.element.contentEditable = "false";
        if (hidden) {
            this.element.style.display = "none";
        }
    }
    
}
