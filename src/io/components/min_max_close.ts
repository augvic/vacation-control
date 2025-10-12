class MinimizeButton {

    element!: HTMLButtonElement

    constructor() {
        this.createSelf();
        this.startListeners();
    }

    private createSelf() {
        this.element = document.createElement("button");
        this.element.className = "bg-gray-950 text-white h-full w-10 hover:bg-gray-700 app-region-no-drag cursor-default transition-colors duration-300";
    }

    private startListeners() {
        this.element.addEventListener("click", () => {

        });
    }

}
