export class TitleBar {
    element;
    minimizeButton;
    maximizeButton;
    closeButton;
    constructor(appendTo) {
        this.createSelf();
        this.createComponents();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("div");
        this.element.className = "h-[40px] w-full bg-gray-950 flex justify-end app-region-drag";
    }
    createComponents() {
        this.minimizeButton = new MinimizeButton(this.element);
        this.maximizeButton = new MaximizeButton(this.element);
        this.closeButton = new CloseButton(this.element);
    }
}
class MinimizeButton {
    element;
    constructor(appendTo) {
        this.createSelf();
        this.startListeners();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("button");
        this.element.className = "bg-gray-950 text-white h-full w-10 hover:bg-gray-700 app-region-no-drag cursor-default transition-colors duration-300";
        this.element.innerText = "_";
    }
    startListeners() {
        this.element.addEventListener("click", () => {
            window.api.minimize();
        });
    }
}
class MaximizeButton {
    element;
    constructor(appendTo) {
        this.createSelf();
        this.startListeners();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("button");
        this.element.className = "bg-gray-950 text-white h-full w-10 hover:bg-gray-700 app-region-no-drag cursor-default transition-colors duration-300";
        this.element.innerText = "□";
    }
    startListeners() {
        this.element.addEventListener("click", () => {
            window.api.maximize();
        });
    }
}
class CloseButton {
    element;
    constructor(appendTo) {
        this.createSelf();
        this.startListeners();
        appendTo.appendChild(this.element);
    }
    createSelf() {
        this.element = document.createElement("button");
        this.element.className = "bg-gray-950 text-white h-full w-10 hover:bg-red-500 app-region-no-drag cursor-default transition-colors duration-300";
        this.element.innerText = "×";
    }
    startListeners() {
        this.element.addEventListener("click", () => {
            window.api.close();
        });
    }
}
