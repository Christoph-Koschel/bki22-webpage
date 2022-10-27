

export declare abstract class CostumeElements extends HTMLElement {
    protected constructor(name: string, self: typeof CostumeElements);
    abstract connectedCallback(): any;
    abstract disconnectedCallback(): any;
    abstract attributeChangedCallback(name: string, oldValue: string, newValue: string): any;
    abstract adoptedCallback(): any;
}


