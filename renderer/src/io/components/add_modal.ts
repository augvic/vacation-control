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
    
    constructor(appendTo: HTMLElement) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    
    private createSelf() {
        this.element = document.createElement("div");
        this.element.className = "w-[70%] h-[70%] bg-white rounded-lg p-3";
    }
    
    private createComponents() {
        this.titleBar = new TitleBar(this.element);
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
        this.element.className = "w-auto h-auto bg-red-700 rounded-full text-white px-2";
    }
    
    private startListeners() {
        this.element.addEventListener("click", () => {
            document.getElementById("add-modal")!.remove();
        })
    }
    
}
