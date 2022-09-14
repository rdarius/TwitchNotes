import NoteContainers from "./NoteContainers";



export default class Mouse {

    static isMouseDown = false;
    static mousePosition = {x: 0, y: 0};
    static lastMousePosition = {x: 0, y: 0};
    static listenersSetUp = false;

    static setupListeners() {
        if (!Mouse.listenersSetUp) {
            document.addEventListener("mousemove", Mouse.handleMouseMove);
            document.addEventListener("mouseup", Mouse.handleMouseUp);
            Mouse.listenersSetUp = true;
        }
    }

    static handleMouseUp() {
        NoteContainers.activeContainer = '';
        Mouse.isMouseDown = false;
    }

    static updateMousePosition(x: number, y: number) {
        Mouse.lastMousePosition = {...this.mousePosition};
        Mouse.mousePosition = {x, y};
    }

    static handleMouseMove(event: MouseEvent) {
        if (Mouse.isMouseDown) {
            if (NoteContainers.activeContainer) {
                const dx = Mouse.mousePosition.x - Mouse.lastMousePosition.x;
                const dy = Mouse.mousePosition.y - Mouse.lastMousePosition.y;
                NoteContainers.containers[NoteContainers.activeContainer].setStyle({
                    top: parseInt(NoteContainers.containers[NoteContainers.activeContainer].getElement().style.top) + dy + "px",
                    left: parseInt(NoteContainers.containers[NoteContainers.activeContainer].getElement().style.left) + dx + "px",
                });
            }
        }
        Mouse.updateMousePosition(event.clientX, event.clientY);
    }
};