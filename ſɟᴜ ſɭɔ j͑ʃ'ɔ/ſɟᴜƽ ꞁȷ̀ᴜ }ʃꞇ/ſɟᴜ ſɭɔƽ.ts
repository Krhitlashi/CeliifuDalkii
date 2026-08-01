// ≺⧼ Elementaj Utilajoj ⧽≻

declare const CONSTANTS: any;

/**
 * Akiri ujajn dimensiojn ( fiksitaj aŭ el elemento )
 * @param {number|null} fiksaLarĝo - Fiksita larĝo aŭ null
 * @param {number|null} fiksaAlto - Fiksita alto aŭ null
 * @param {HTMLElement|null} ujo - Uja elemento
 * @returns {{width: number, height: number}}
 */
export function akiriUjonGrandecojn( fiksaLarĝo: number | null, fiksaAlto: number | null, ujo: HTMLElement | null ): { width: number; height: number } {
    return {
        width: fiksaLarĝo ?? ( ujo?.clientWidth || window.innerWidth ),
        height: fiksaAlto ?? ( ujo?.clientHeight || window.innerHeight )
    };
}

/**
 * Kontroli ĉu punkto estas ene de limoj
 * @param {number} x
 * @param {number} y
 * @param {DOMRect} limoj
 * @returns {boolean}
 */
export function cxuEnLimoj( x: number, y: number, limoj: DOMRect ): boolean {
    return x >= limoj.left && x <= limoj.right && y >= limoj.top && y <= limoj.bottom;
}

/**
 * Kalkuli ĉelan grandecon laŭ uja grando, kolumna nombro kaj interspaco
 * @param {number} ujaGrando - Uja grando ( larĝo aŭ alto )
 * @param {number} kolumnoj - Nombro da kolumnoj ( aŭ vicoj )
 * @param {number} interspaco - Interspaco inter ĉeloj
 * @returns {number}
 */
export function kalkuliĈelanGrandecon( ujaGrando: number, kolumnoj: number, interspaco: number ): number {
    return ( ujaGrando - ( kolumnoj - 1 ) * interspaco ) / kolumnoj;
}

/**
 * Agordi aria-pressed staton sur butono
 * @param {string|HTMLElement} btn - Butona ID aŭ elemento
 * @param {boolean} premata
 */
function agordiButonPremita( btn: string | HTMLElement, premata: boolean ): void {
    const el = typeof btn === "string" ? document.getElementById( btn ) : btn;
    if ( el ) {
        if ( premata ) el.setAttribute( "aria-pressed", "true" );
        else el.removeAttribute( "aria-pressed" );
    }
}

/**
 * Akiri elementajn span-valorojn el datumaro
 * @param {HTMLElement} el
 * @returns {{colSpan: number, rowSpan: number}}
 */
function akiriElementajnSpanojn( el: HTMLElement ): { colSpan: number; rowSpan: number } {
    return {
        colSpan: parseInt( el.dataset.colSpan as string ) || 1,
        rowSpan: parseInt( el.dataset.rowSpan as string ) || 1
    };
}

/**
 * Agordi elementan tren-statatributon ( klaso )
 * @param {HTMLElement} el
 * @param {boolean} trenanta
 */
function agordiElementanTrenadon( el: HTMLElement, trenanta: boolean ): void {
    el.classList.toggle( "dragging", trenanta );
}

/**
 * Akiri elementan pozicion kaj span-valorojn el datumaro
 * @param {HTMLElement} el
 * @returns {{col: number, row: number, colSpan: number, rowSpan: number}}
 */
export function akiriElementanPozicion( el: HTMLElement ): { col: number; row: number; colSpan: number; rowSpan: number } {
    return {
        col: parseInt( el.dataset.col as string ) || 0,
        row: parseInt( el.dataset.row as string ) || 0,
        colSpan: parseInt( el.dataset.colSpan as string ) || 1,
        rowSpan: parseInt( el.dataset.rowSpan as string ) || 1
    };
}

/**
 * Aldoni klason al elemento
 * @param {HTMLElement} el
 * @param {string} klasaNomo
 */
function aldoniKlason( el: HTMLElement | null | undefined, klasaNomo: string ): void {
    el?.classList.add( klasaNomo );
}

/**
 * Forigi klason el elemento
 * @param {HTMLElement} el
 * @param {string} klasaNomo
 */
function forigiKlason( el: HTMLElement | null | undefined, klasaNomo: string ): void {
    el?.classList.remove( klasaNomo );
}

/**
 * Kontroli ĉu elemento havas klason
 * @param {HTMLElement} el
 * @param {string} klasaNomo
 * @returns {boolean}
 */
function cxuKlaso( el: HTMLElement | null | undefined, klasaNomo: string ): boolean {
    return el?.classList.contains( klasaNomo ) ?? false;
}

// ⟪ Konsoliditaj Fenestraj Eksportoj ⟫
Object.assign( window as any, {
    akiriUjonGrandecojn,
    cxuEnLimoj,
    kalkuliĈelanGrandecon,
    agordiButonPremita,
    akiriElementajnSpanojn,
    agordiElementanTrenadon,
    akiriElementanPozicion,
    aldoniKlason,
    forigiKlason,
    cxuKlaso,
} );
