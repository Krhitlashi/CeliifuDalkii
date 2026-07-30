// ≺⧼ Kahelaj Trenaj kaj Regrandigaj Traktiloj ⧽≻

declare const CONSTANTS: any;
declare const EnigaAdministranto: any;
declare const getStartMenu: any;
declare const getContainerDimensions: any;
declare const isWithinBounds: any;
declare const setElementDragging: any;

import { CustomHTMLElement } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";
import { setupMontrajnEventojn, akiriMontranPunkton } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

// Antaŭen referenco por eviti cirklan dependecon
interface PiktogramaKradaInterfaco {
    containerId: string;
    container: HTMLElement | null;
    rows: number;
    cols: number;
    fiksaLarĝo: number | null;
    fiksaAlto: number | null;
    estasPortebla: boolean;
    alakrogiPostTrenado( el: HTMLElement ): void;
    cxuAreoOkupita( c: number, r: number, kolSpan: number, vicSpan: number, ekskludiEl: HTMLElement | null ): boolean;
    aplikiPozicion( el: HTMLElement, c: number, r: number, xOffset?: number ): void;
    gxisdatigiAdaptanOrientigon( el: HTMLElement ): void;
}

/**
 * Agordi unuecigitan tren-traktadon por kahelo
 * @param {PiktogramaKradaInterfaco} krado - La krada instanco
 * @param {HTMLElement} el - Elemento trenata
 * @param {number} komencoX - Komenca X-pozicio
 * @param {number} komencoY - Komenca Y-pozicio
 * @param {Function} postTrenFino - Revoko kiam trenado finiĝas
 */
export function agordiKaheloTreni( krado: PiktogramaKradaInterfaco, el: HTMLElement, komencoX: number, komencoY: number, postTrenFino: (() => void) | null ): void {
    const komencaMaldekstro = el.offsetLeft;
    const komencaSupro = el.offsetTop;
    let komencaMenuoFermita = false;
    const komencaMenuo = krado.containerId === "start-menu-content" ? getStartMenu() : null;
    const originalaPatro = el.parentElement;
    const originalaSekvaGefrato = el.nextSibling;
    let estisTrenita = false;

    setElementDragging( el, true );
    el.style.zIndex = ( CONSTANTS.WM.BASE_Z_INDEX + 0o100 ).toString();

    if ( krado.containerId === "start-menu-content" ) {
        document.body.appendChild( el );
        el.style.position = "fixed";
    }

    const movi = ( klientoX: number, klientoY: number ) => {
        const deltoX = klientoX - komencoX;
        const deltoY = klientoY - komencoY;
        const trenDistanco = Math.abs( deltoX ) + Math.abs( deltoY );

        // Agordi estasTrenanta nur post movado preter sojlo
        if ( !estisTrenita && trenDistanco > CONSTANTS.DIM.DRAG_THRESHOLD ) {
            estisTrenita = true;
        }

        // Fermi komencan menuon se treno sufiĉe malproksima
        if ( !komencaMenuoFermita && komencaMenuo && krado.containerId === "start-menu-content" && trenDistanco > CONSTANTS.DIM.DRAG_THRESHOLD ) {
            komencaMenuo.classList.remove( "open" );
            document.body.classList.remove( "start-menu-open" );
            if ( ( window as any ).PanelaAdministranto ) ( window as any ).PanelaAdministranto.fermiCxiujnPanelojn();
            komencaMenuoFermita = true;
        }

        if ( el.style.position === "fixed" ) {
            el.style.left = klientoX - el.offsetWidth / 2 + "px";
            el.style.top = klientoY - el.offsetHeight / 2 + "px";
        } else {
            const { width: ujoL, height: ujoA } = getContainerDimensions( krado.fiksaLarĝo, krado.fiksaAlto, krado.container );
            const interspaco = CONSTANTS.DIM.GAP_SIZE;
            const cxeL = ( ujoL - ( krado.cols - 1 ) * interspaco ) / krado.cols;
            const cxeA = ( ujoA - ( krado.rows - 1 ) * interspaco ) / krado.rows;

            const krudaMaldekstro = komencaMaldekstro + deltoX;
            const krudaSupro = komencaSupro + deltoY;

            const alkX = Math.round( krudaMaldekstro / ( cxeL + interspaco ) ) * ( cxeL + interspaco );
            const alkY = Math.round( krudaSupro / ( cxeA + interspaco ) ) * ( cxeA + interspaco );

            el.style.left = alkX + "px";
            el.style.top = alkY + "px";
        }
    };

    const supren = () => {
        setElementDragging( el, false );
        el.style.zIndex = "";

        // Trakti transigon de komenca menuo al labortablo
        if ( krado.containerId === "start-menu-content" && ( window as any ).LabortablaPiktogramoAdministranto?.labortablo ) {
            const labortablo = ( window as any ).LabortablaPiktogramoAdministranto.labortablo.container;
            const labortablaRekt = labortablo.getBoundingClientRect();
            const elRekt = el.getBoundingClientRect();
            const elCentroX = elRekt.left + elRekt.width / 2;
            const elCentroY = elRekt.top + elRekt.height / 2;

            if ( isWithinBounds( elCentroX, elCentroY, labortablaRekt ) ) {
                el.style.position = "";
                if ( postTrenFino ) postTrenFino();
                ( krado as any ).transigiPiktogramonDeKomencaMenuo( el );
                return;
            }
        }

        // Restarigi pozicion aŭ alklaki
        if ( krado.containerId === "start-menu-content" && originalaPatro ) {
            el.style.position = "";
            if ( postTrenFino ) postTrenFino();
            if ( originalaSekvaGefrato ) originalaPatro.insertBefore( el, originalaSekvaGefrato );
            else originalaPatro.appendChild( el );
            krado.alakrogiPostTrenado( el );
        } else {
            if ( postTrenFino ) postTrenFino();
            krado.alakrogiPostTrenado( el );
        }
    };

    // Agordi eventaŭskultilojn por kaj muso kaj tuŝo
    const cxeMov = ( ev: any ) => {
        ev.preventDefault();
        const poz = akiriMontranPunkton( ev );
        movi( poz.x, poz.y );
    };

    const forigiEventojn = setupMontrajnEventojn( cxeMov, () => {
        forigiEventojn();
        supren();
    } );
}

/**
 * Agordi unuecigitan regrandigan traktadon por kahelo
 * @param {PiktogramaKradaInterfaco} krado - La krada instanco
 * @param {HTMLElement} el - Elemento regrandigata
 * @param {number} komencoX - Komenca X-pozicio
 * @param {number} komencoY - Komenca Y-pozicio
 */
export function agordiKaheloGrandSxangxi( krado: PiktogramaKradaInterfaco, el: HTMLElement, komencoX: number, komencoY: number ): void {
    const komencaL = el.offsetWidth;
    const komencaA = el.offsetHeight;
    const { width: ujoL, height: ujoA } = getContainerDimensions( krado.fiksaLarĝo, krado.fiksaAlto, krado.container );
    const interspaco = CONSTANTS.DIM.GAP_SIZE;
    const cxeL = ( ujoL - ( krado.cols - 1 ) * interspaco ) / krado.cols;
    const cxeA = ( ujoA - ( krado.rows - 1 ) * interspaco ) / krado.rows;

    el.classList.add( "resizing" );

    const movi = ( klientoX: number, klientoY: number ) => {
        const dx = klientoX - komencoX;
        const dy = klientoY - komencoY;

        let kolSpan = Math.round( ( komencaL + dx ) / cxeL );
        let vicSpan = Math.round( ( komencaA + dy ) / cxeA );

        if ( kolSpan < 1 ) kolSpan = 1;
        if ( vicSpan < 1 ) vicSpan = 1;

        if ( krado.cxuAreoOkupita( parseInt( el.dataset.col || "0" ), parseInt( el.dataset.row || "0" ), kolSpan, vicSpan, el ) ) return;

        el.style.width = `${cxeL * kolSpan + ( kolSpan - 1 ) * interspaco}px`;
        el.style.height = `${cxeA * vicSpan + ( vicSpan - 1 ) * interspaco}px`;

        el.dataset.pendingColSpan = kolSpan.toString();
        el.dataset.pendingRowSpan = vicSpan.toString();
    };

    const supren = () => {
        el.classList.remove( "resizing" );
        el.classList.remove( "dragging" );
        ( el as CustomHTMLElement )._isResizing = false;

        if ( el.dataset.pendingColSpan ) {
            const novaKolSpan = parseInt( el.dataset.pendingColSpan );
            const novaVicSpan = parseInt( el.dataset.pendingRowSpan || "1" );
            if ( !krado.cxuAreoOkupita( parseInt( el.dataset.col || "0" ), parseInt( el.dataset.row || "0" ), novaKolSpan, novaVicSpan, el ) ) {
                el.dataset.colSpan = novaKolSpan.toString();
                el.dataset.rowSpan = novaVicSpan.toString();
            }
            delete el.dataset.pendingColSpan;
            delete el.dataset.pendingRowSpan;
        }

        void el.offsetWidth;
        krado.aplikiPozicion( el, parseInt( el.dataset.col || "0" ), parseInt( el.dataset.row || "0" ) );
        krado.gxisdatigiAdaptanOrientigon( el );

        // Konservi kahelan aranĝon al stokejo
        if ( krado.containerId === "desktop" ) ( window as any ).LabortablaPiktogramoAdministranto?._konserviLabortablanArangxon();
    };

    const cxeMov = ( ev: any ) => {
        ev.preventDefault();
        const poz = akiriMontranPunkton( ev );
        movi( poz.x, poz.y );
    };

    const forigiEventojn = setupMontrajnEventojn( cxeMov, () => {
        forigiEventojn();
        supren();
    } );
}
