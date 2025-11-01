export class AddModal {
    
    element!: HTMLDivElement
    container!: Container
    
    constructor() {
        this.createSelf();
        this.createComponents();
        document.getElementById("app-body")!.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.id = "add-modal";
        this.element.className = "w-full h-full bg-black/70 flex justify-center items-center fixed z-50";
    }
    
    private createComponents() {
        this.container = new Container(this.element);
    }
    
}

class Container {
    
    element!: HTMLDivElement
    titleBar!: TitleBar
    body!: ContainerBody
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-auto h-auto bg-white rounded-lg p-3 flex flex-col gap-y-2";
    }
    
    private createComponents() {
        this.titleBar = new TitleBar(this.element);
        this.body = new ContainerBody(this.element);
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
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-full h-auto flex flex-col justify-center items-center gap-y-2";
    }
    
    private createComponents() {
        new Input(this.element, "Nome", "name", "text");
        new Input(this.element, "Admissão", "admission", "date");
        new AddButton(this.element);
    }
    
}

class Input {
    
    element!: HTMLInputElement
    
    constructor(appendTo: HTMLElement, placeholder: string, id: string, type: string) {
        this.createSelf(placeholder, id, type);
        appendTo.appendChild(this.element);
    }
    
    private createSelf(placeholder: string, id: string, type: string) {
        this.element = document.createElement("input");
        this.element.placeholder = placeholder;
        this.element.id = `add-modal-${id}`;
        this.element.type = type;
        this.element.className = "w-[300px] h-[30px] bg-white outline-none border border-gray-300 rounded-md p-2";
    }
    
}

class AddButton {
    
    element!: HTMLButtonElement
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("button");
        this.element.innerText = "Adicionar";
        this.element.className = "w-auto h-auto bg-green-700 hover:bg-green-900 cursor-pointer text-white p-2 rounded-md transition-colors duration-300";
    }
    
}