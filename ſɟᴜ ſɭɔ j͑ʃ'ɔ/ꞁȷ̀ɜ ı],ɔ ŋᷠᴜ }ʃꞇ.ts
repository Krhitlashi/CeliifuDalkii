// ≺⧼ Type Definitions ⧽≻

export interface CustomHTMLElement extends HTMLElement {
    _isResizing?: boolean;
}

export interface AppData {
    name: string;
    icon: string;
    app: string;
}

export interface IconGridConfig {
    rows?: number;
    cols?: number;
    centered?: boolean;
    bottomUp?: boolean;
    width?: number;
    height?: number;
    labelMode?: string;
}
