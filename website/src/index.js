"use strict";
const EventEmitter = require("events");
const ObjectAssign = require("object.assign");
import Editor from "./editor/editor";
import Marker from "./marker/marker";
import Output from "./output/output";
const editor = new Editor({
    selector: "js-editor",
    selectMark(mark){
        app.setState({
            selected: mark
        });
    }
});
const marker = new Marker();
const output = new Output({
    selector: "#js-output",
    onClickNode(mark){
        app.setState({
            selected: mark
        });
    }
});
class App extends EventEmitter {
    constructor() {
        super();
        this.state = {
            code: undefined,
            marks: [],
            selected: undefined
        }
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        if (this.state === newState) {
            return;
        }
        this.state = ObjectAssign({}, this.state, newState);
        this.emit("CHANGE");
    }

    onChange(handler) {
        this.on("CHANGE", handler);
    }

}
const app = new App();
app.onChange(() => {
    const state = app.getState();
    console.info("newState", state);
    editor.updateMarker(state.marks);
    editor.highlightMark(state.selected);
    output.selectMark(state.selected);
    output.output(state.marks);
});

const updateState = () => {
    const code = editor.getText();
    const marks = marker.createMarks(code);
    app.setState({
        code,
        marks
    });
};
editor.edit().onChange(updateState);
updateState();