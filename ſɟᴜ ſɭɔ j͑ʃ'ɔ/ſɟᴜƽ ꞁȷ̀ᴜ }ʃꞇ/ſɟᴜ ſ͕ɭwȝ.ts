// ≺⧼ DOM-Utilajoj ⧽≻

declare const CONSTANTS: any;
declare const APPS: any;
declare const kjesaiGawe: any;
declare const skakefani: any;
declare const FenestraAdministranto: any;

interface TaskobretaInformo {
    pos: string;
    estasVertikala: boolean;
}

/**
 * Akiri la taskobretan elementon
 * @returns {HTMLElement|null}
 */
function akiriTaskobreton(): HTMLElement | null {
    return document.getElementById( "taskbar" );
}

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
 * @returns {{pos: string, estasVertikala: boolean}}
 */
function akiriTaskbretonInfo(): TaskobretaInformo {
    const taskbar = akiriTaskobreton();
    const pos = taskbar?.dataset.position || "left";
    return { pos, estasVertikala: pos === "left" || pos === "right" };
}

/**
 * Kontroli ĉu taskobreto estas en granda reĝimo
 * @returns {boolean}
 */
function cxuTaskbretoGranda(): boolean {
    const estasVertikala = window.innerWidth <= window.innerHeight;
    return estasVertikala ? window.innerWidth >= CONSTANTS.BREAKPOINTS.MOBILE : window.innerHeight >= CONSTANTS.BREAKPOINTS.MOBILE;
}

/**
 * Akiri fenestran titolon el fenestra elemento
 * @param {HTMLElement} fenestro
 * @returns {string}
 */
function akiriFenestranTitolon( fenestro: HTMLElement ): string {
    return ( fenestro.querySelector( ".title-bar-title" ) as HTMLElement )?.innerText || "App";
}

/**
 * Akiri aplikaĵan piktogramon el APPS-datumaro
 * @param {string} titolo
 * @returns {string}
 */
function akiriAplikoPiktogramon( titolo: string ): string {
    if ( typeof APPS === "undefined" ) return "🖥️";
    const app = ( APPS as any[] ).find( ( a: any ) => a.app === titolo );
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

// ⟪ Konsoliditaj Fenestraj Eksportoj ⟫
Object.assign( window as any, {
    getTaskbar: akiriTaskobreton,
    getStartMenu: akiriKomencanMenuon,
    getHomeArea: akiriHejmanAreon,
    getWindowContainer: akiriFenestranUjon,
    getOpenWindows: akiriMalfermajnFenestrojn,
    getTaskbarInfo: akiriTaskbretonInfo,
    isTaskbarLarge: cxuTaskbretoGranda,
    getWindowTitle: akiriFenestranTitolon,
    getAppIcon: akiriAplikoPiktogramon,
    getStrings: akiriTextojn,
    getWindowManager: akiriFenestranAdministranton,
} );
