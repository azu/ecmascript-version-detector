// LICENSE : MIT
"use strict";
// dependency css
require("codemirror/lib/codemirror.css");
require("codemirror/addon/lint/lint.css");
const CodeMirror = require("codemirror");
require("codemirror/addon/mode/overlay.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/css/css.js");

const defaultText = `
// object spread operator example
export function friends(state = initialState, action) {  
  switch (action.type) {
    case types.ADD_FRIEND:
      return {
        friendsById: {
          ...state.friendsById,
          [newId]: {
            name: action.name
          }
        }
      }
    default:
      return state;
  }
}
// Async/Await
async function countUp() {
  await delay(1000);
}
// Decorator example
class MyClass extends Component {
  state = {isLoading: true}
  
  @autobind
  onChange() {}
  
  @autobind
  handleSubmit() {}
}
`;
export default class Editor {
    constructor({selector, selectMark}) {
        this.editor = undefined;
        this.selector = selector;
        this.marks = [];
        this.currentCmMarks = [];
        this.selectMark = selectMark;
    }

    edit() {
        this.editor = CodeMirror.fromTextArea(document.getElementById("js-editor"), {
            lineNumbers: true,
            mode: "javascript"
        });
        this.editor.on("cursorActivity", (cm) => {
            const pos = cm.getCursor();
            const cmMarks = cm.findMarksAt(pos);
            if (cmMarks.length === 0) {
                return;
            }
            // insert order by line,column
            // pick up last is nearest
            const nearestCmMark = cmMarks.pop();
            this.selectMark(this.getMarkWithCmMark(nearestCmMark));
        });
        this.editor.setValue(defaultText);
        return this;
    }

    getMarkWithCmMark(cmMark) {
        const matchCmMarks = this.currentCmMarks.filter(targetMark => {
            return targetMark.id === cmMark.id;
        });
        if (matchCmMarks.length === 0) {
            return;
        }
        const matchCmMark = matchCmMarks[0];
        return this.marks[this.currentCmMarks.indexOf(matchCmMark)];
    }

    /**
     * @returns {string}
     */
    getText() {
        return this.editor.getValue();
    }

    updateMarker(marks) {
        this.marks = marks;
        this.clearMarkers();
        this.currentCmMarks = marks.map(mark => {
            const node = mark.node;
            const loc = node.loc;
            return this.editor.markText(
                {line: loc.start.line - 1, ch: loc.start.column},
                {line: loc.end.line - 1, ch: loc.end.column}
            );
        })
    }

    highlightMark(mark) {
        if (!mark) {
            return;
        }
        const node = mark.node;
        const loc = node.loc;
        if (this.highlighText) {
            this.highlighText.clear();
        }
        this.highlighText = this.editor.markText(
            {line: loc.start.line - 1, ch: loc.start.column},
            {line: loc.end.line - 1, ch: loc.end.column},
            {
                title: mark.en.name,
                className: "highlight",
            }
        );
    }

    clearMarkers() {
        this.currentCmMarks.forEach(mark => {
            mark.clear();
        });
    }

    onChange(changeHandler) {
        this.editor.on("change", changeHandler);
    }
}
