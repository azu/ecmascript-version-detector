// LICENSE : MIT
"use strict";
const yo = require('yo-yo');
const groupBy = require("lodash.groupby");
const decamelize = require('decamelize');
export default class Editor {
    constructor({selector, onClickNode}) {
        this.selector = selector;
        this.el = this.render([]);
        this.onClickNode = onClickNode;
        this.selectedMark = undefined;
        document.querySelector(selector).appendChild(this.el)
    }

    selectMark(mark) {
        this.selectedMark = mark;
    }

    output(marks) {
        const newList = this.render(marks);
        yo.update(this.el, newList);
        this.didUpdate()
    }

    render(marks) {
        const createMDNLink = (mark) => {
            if(mark.en.link) {
                return yo`<a href=${mark.en.link} target="mdn">\u{1F4D6}</a>`;
            }
            const keywords = decamelize(mark.en.name, " ") + ' Glossary -"Parser API"';
            return yo`<a href="http://mdn.io/${keywords}" target="mdn">\u{1F4D6}</a>`;
        };
        const listItem = (mark) => {
            const onClick = () => {
                this.onClickNode(mark);
            };
            const isSelected = this.selectedMark === mark;
            const className = isSelected ? "node-link is-selected" : "node-link";
            return yo`<li>
<a role="button" onclick=${onClick} class=${className} title=${mark.node.type}>
    ${mark.en.name}:${mark.node.start + 1}:${mark.node.end + 1}
</a>
${createMDNLink(mark)}
</li>`
        };
        const groups = groupBy(marks, (mark) => {
            return mark.version;
        });
        const list = [];
        Object.keys(groups).forEach(version => {
            const marksAtVersion = groups[version];
            list.push(yo`<div>
    <h2 class="output-versionTitle">Version: ${version}</h2>
    <ul>
    ${marksAtVersion.map(listItem)}
    </ul>
</div>`);
        });
        return yo`<div>
    ${list}
  </div>`
    }

    didUpdate() {
        const selected = document.querySelector(".is-selected");
        if (!selected) {
            return;
        }
        selected.scrollIntoView();
    }
}
