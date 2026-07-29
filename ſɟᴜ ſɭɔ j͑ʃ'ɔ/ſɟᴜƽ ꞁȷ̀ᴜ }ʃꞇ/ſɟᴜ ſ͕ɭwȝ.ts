// ≺⧼ DOM-Utilajoj ⧽≻

declare const CONSTANTS: any;
declare const APPS: any;
declare const kjesaiGawe: any;
declare const skakefani: any;
declare const FenestraAdministranto: any;

interface TaskbretoInfo {
    pos: string;
    isVertical: boolean;
}

/**
 * Akiri la taskobretan elementon
 * @returns {HTMLElement|null}
 */
function akiriTaskobreton(): HTMLElement | null {
    return document.getElementById( "taskbar" );
}

// Alkroĉi al fenestro por tutmonda aliro
( window as any ).getTaskbar = akiriTaskobreton;

/**
 * Akiri la komencan menuon
 * @returns {HTMLElement|null}
 */
function akiriKomencanMenuon(): HTMLElement | null {
    return document.getElementById( "start-menu" );
}

/**
 * Akiri la hejman areon
 * @returns {HTMLElement|null}
 */
function akiriHejmanAreon(): HTMLElement | null {
    return document.getElementById( "home-area" );
}

/**
 * Akiri la fenestran ujon
 * @returns {HTMLElement|null}
 */
function akiriFenestranUjon(): HTMLElement | null {
    return document.getElementById( "window-container" );
}

/**
 * Akiri ĉiujn malfermajn fenestrojn
 * @returns {NodeList}
 */
function akiriMalfermajnFenestrojn(): NodeListOf<HTMLElement> {
    return document.querySelectorAll( ".window" );
}

/**
 * Akiri taskobretan pozicion kaj orientiĝan informon
 * @returns {{pos: string, isVertical: boolean}}
 */
function akiriTaskbretonInfo(): TaskbretoInfo {
    const taskbar = akiriTaskobreton();
    const pos = taskbar?.dataset.position || "left";
    return { pos, isVertical: pos === "left" || pos === "right" };
}

/**
 * Kontroli ĉu taskobreto estas en granda reĝimo
 * @returns {boolean}
 */
function cxuTaskbretoGranda(): boolean {
    const isVertical = window.innerWidth <= window.innerHeight;
    return isVertical ? window.innerWidth >= CONSTANTS.BREAKPOINTS.MOBILE : window.innerHeight >= CONSTANTS.BREAKPOINTS.MOBILE;
}

/**
 * Akiri fenestran titolon el fenestra elemento
 * @param {HTMLElement} win
 * @returns {string}
 */
function akiriFenestranTitolon( win: HTMLElement ): string {
    return ( win.querySelector( ".title-bar-title" ) as HTMLElement )?.innerText || "App";
}

/**
 * Akiri aplikaĵan piktogramon el APPS-datumaro
 * @param {string} title
 * @returns {string}
 */
function akiriAplikoPiktogramon( title: string ): string {
    if ( typeof APPS === "undefined" ) return "🖥️";
    const app = ( APPS as any[] ).find( ( a: any ) => a.app === title );
    return app?.icon || "🖥️";
}

/**
 * Akiri lingvajn ĉenojn
 * @returns {object}
 */
function akiriTextojn(): { [key: string]: string } {
    const lang = ( typeof kjesaiGawe !== "undefined" ? kjesaiGawe : "aih" );
    return ( typeof skakefani !== "undefined" && ( skakefani as any )[ lang ] )
        ? ( skakefani as any )[ lang ]
        : ( skakefani ? ( skakefani as any ).en : {} );
}

/**
 * Akiri FenestranAdministranton kun rezervo
 * @returns {any|null}
 */
function akiriFenestranAdministranton(): any {
    return ( window as any ).FenestraAdministranto || ( typeof FenestraAdministranto !== "undefined" ? FenestraAdministranto : null );
}

// Alkroĉi ĉiujn utilaĵojn al fenestro por tutmonda aliro
( window as any ).getStartMenu = akiriKomencanMenuon;
( window as any ).getHomeArea = akiriHejmanAreon;
( window as any ).getWindowContainer = akiriFenestranUjon;
( window as any ).getOpenWindows = akiriMalfermajnFenestrojn;
( window as any ).getTaskbarInfo = akiriTaskbretonInfo;
( window as any ).isTaskbarLarge = cxuTaskbretoGranda;
( window as any ).getWindowTitle = akiriFenestranTitolon;
( window as any ).getAppIcon = akiriAplikoPiktogramon;
( window as any ).getStrings = akiriTextojn;
( window as any ).getWindowManager = akiriFenestranAdministranton;
