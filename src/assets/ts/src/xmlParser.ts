export function parseTemplate(x: string): HTMLElement {
    let parser: DOMParser = new DOMParser();
    let result = parser.parseFromString(x, "text/xml");

    return <HTMLElement>parseElement(result.children[0]);
}

function parseElement(child: Element): HTMLElement | Text {
    if (child.tagName == "text") {
        return document.createTextNode(child.innerHTML);
    }

    let x = document.createElement(child.tagName);
    for (let i = 0; i < child.attributes.length; i++) {
        x.setAttribute(child.attributes.item(i).name, child.attributes.item(i).value);
    }

    if (child.children.length != 0) {
        let gen = parseElements(child.children)
        while (true) {
            let next: IteratorResult<HTMLElement | Text> = gen.next();

            if (next.done) {
                break;
            }

            x.appendChild(next.value);
        }
    }
    return x;
}

function* parseElements(children: HTMLCollection): Generator<HTMLElement | Text> {
    for (let i = 0; i < children.length; i++) {
        let child = children.item(i);
        let x = parseElement(child);
        yield x;
    }
}

