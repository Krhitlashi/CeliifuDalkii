// ≺⧼ Piktograma Krada Klaso ⧽≻

declare const CONSTANTS: any;
declare const EnigaAdministranto: any;
declare const akiriTaskobreton: any;
declare const akiriElementajnSpanojn: any;

import { AppData, IconGridConfig, CustomHTMLElement } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";
import { akiriUjonGrandecojn, akiriElementanPozicion, kalkuliĈelanGrandecon } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɔƽ.js";
import { agordiKaheloTreni, agordiKaheloGrandSxangxi } from "./ſɟɔ }ʃᴜ.js";

// ⟪ Porteblaj Kradaj Dimensiaj Aliajnimoj ( el CONSTANTS ) ⟫
export const MOBILE_GRID_ROWS = CONSTANTS.DIM.MOBILE_ROWS;
export const MOBILE_GRID_COLS = CONSTANTS.DIM.MOBILE_COLS;
export const DESKTOP_GRID_ROWS = CONSTANTS.DIM.DEFAULT_ROWS;
export const DESKTOP_GRID_COLS = CONSTANTS.DIM.DEFAULT_COLS;

// ⟪ Piktograma Krado ⟫

export class PiktogramaKrado {
    containerId: string;
    container: HTMLElement | null;
    config: IconGridConfig;
    estasPortebla: boolean;
    rows: number;
    cols: number;
    komencajVicoj: number;
    komencajKolumnoj: number;
    bottomUp: boolean;
    fiksaLarĝo: number | null;
    fiksaAlto: number | null;
    redaktaReĝimo: boolean;
    etikedReĝimo: string;
    nunaPaĝo: number;
    tutajPaĝoj: number;
    tuŝaKomencoY: number;
    tuŝaKomencoX: number;

    constructor( containerId: string, config: IconGridConfig = {} ) {
        this.containerId = containerId;
        this.container = document.getElementById( containerId );
        this.config = config;

        // Aŭtomate detekti porteblan vs labortablan
        this.estasPortebla = this.cxuPortebla();
        this.rows = this.estasPortebla ? MOBILE_GRID_ROWS : ( config.rows || DESKTOP_GRID_ROWS );
        this.cols = this.estasPortebla ? MOBILE_GRID_COLS : ( config.cols || DESKTOP_GRID_COLS );
        this.komencajVicoj = this.rows;
        this.komencajKolumnoj = this.cols;
        this.bottomUp = config.bottomUp || false;
        this.fiksaLarĝo = config.width ?? null;
        this.fiksaAlto = config.height ?? null;
        this.redaktaReĝimo = false;
        this.etikedReĝimo = config.labelMode || "external";
        this.nunaPaĝo = 0;
        this.tutajPaĝoj = 1;
        this.tuŝaKomencoY = 0;
        this.tuŝaKomencoX = 0;

        if ( !this.container ) return;

        this.container.addEventListener( "dblclick", ( e: MouseEvent ) => {
            const estasKlakeblaFono = this.containerId === "desktop" || this.containerId === "start-menu";
            if ( estasKlakeblaFono && e.target === this.container ) {
                this.baskuligiRedaktadon();
            }
        } );

        // Tuŝaj eventoj por svinga paĝado
        this.container.addEventListener( "touchstart", ( e: TouchEvent ) => this.pritraktiTuŝanKomencon( e ), { passive: true } );
        this.container.addEventListener( "touchmove", ( e: TouchEvent ) => this.pritraktiTuŝanMovon( e ), { passive: false } );
        this.container.addEventListener( "touchend", ( e: TouchEvent ) => this.pritraktiTuŝanFinon( e ), { passive: true } );

        // Aŭskulti ekran-grandajn ŝanĝojn
        window.addEventListener( "resize", () => this.pritraktiEkrananGrandSxangxon() );

        this.inicii();
    }

    cxuPortebla(): boolean {
        return window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;
    }

    pritraktiEkrananGrandSxangxon(): void {
        const estisPortebla = this.estasPortebla;
        this.estasPortebla = this.cxuPortebla();

        if ( estisPortebla !== this.estasPortebla ) {
            // Ekrana grando ŝanĝiĝis inter portebla kaj labortabla
            this.rows = this.estasPortebla ? MOBILE_GRID_ROWS : DESKTOP_GRID_ROWS;
            this.cols = this.estasPortebla ? MOBILE_GRID_COLS : DESKTOP_GRID_COLS;
            this.refreŝigi();
            this.rearanĝi();
        }
    }

    pritraktiTuŝanKomencon( e: TouchEvent ): void {
        this.tuŝaKomencoY = e.touches[0].clientY;
        this.tuŝaKomencoX = e.touches[0].clientX;
    }

    pritraktiTuŝanMovon( e: TouchEvent ): void {
        if ( this.containerId === "desktop" || this.containerId === "start-menu-content" ) {
            e.preventDefault();
        }
    }

    pritraktiTuŝanFinon( e: TouchEvent ): void {
        const tuŝaFinoY = e.changedTouches[0].clientY;
        const tuŝaFinoX = e.changedTouches[0].clientX;
        const difY = tuŝaFinoY - this.tuŝaKomencoY;
        const difX = tuŝaFinoX - this.tuŝaKomencoX;

        // Vertikala svingo por paĝado ( nur portebla )
        if ( this.estasPortebla && Math.abs( difY ) > Math.abs( difX ) && Math.abs( difY ) > 0o62 ) {
            if ( difY > 0 ) {
                // Svingi malsupren - antaŭa paĝo
                if ( this.nunaPaĝo > 0 ) {
                    this.nunaPaĝo--;
                    this.refreŝigi();
                    if ( ( window as any ).LabortablaPiktogramoAdministranto ) ( window as any ).LabortablaPiktogramoAdministranto._gxisdatigiPaĝajnIndikilojn();
                }
            } else {
                // Svingi supren - sekva paĝo
                const maksPaĝo = Math.ceil( ( ( window as any ).APPS || [] ).length / ( this.rows * this.cols ) ) - 1;
                if ( this.nunaPaĝo < maksPaĝo ) {
                    this.nunaPaĝo++;
                    this.refreŝigi();
                    if ( ( window as any ).LabortablaPiktogramoAdministranto ) ( window as any ).LabortablaPiktogramoAdministranto._gxisdatigiPaĝajnIndikilojn();
                }
            }
        }
    }

    inicii(): void {
        // Malplenigi ujon por forigi ekzistantajn kahelojn
        if ( this.container ) {
            this.container.innerHTML = "";
        }
    }

    gxisdatigiAdaptanOrientigon( el: HTMLElement ): void {
        requestAnimationFrame( () => {
            const rect = el.getBoundingClientRect();
            if ( rect.width === 0 || rect.height === 0 ) return;

            const taskbar = typeof akiriTaskobreton === "function" ? akiriTaskobreton() : document.getElementById( "taskbar" );
            const taskobarPozicio = taskbar?.dataset.position || "left";

            let efektivaPozicio = taskobarPozicio;
            const { colSpan: malnovaKolSpan, rowSpan: malnovaVicSpan } = akiriElementajnSpanojn( el );
            let novaKolSpan = malnovaKolSpan;
            let novaVicSpan = malnovaVicSpan;

            // Mezuri faktan pilolan dikecon
            const titolaBreto = el.querySelector( "ksaka" ) as HTMLElement | null;
            let pilolaDikeco = 0o40;
            if ( titolaBreto ) {
                pilolaDikeco = Math.min( titolaBreto.offsetWidth || 0o40, titolaBreto.offsetHeight || 0o40 );
            }

            const remburaĵo = 0o20;
            const sojlo = 0o100 + pilolaDikeco + remburaĵo;

            if ( this.etikedReĝimo === "external" ) {
                if ( rect.width < sojlo ) {
                    efektivaPozicio = "bottom";
                    if ( this.containerId === "start-menu-content" ) {
                        novaVicSpan = 2;
                        novaKolSpan = 1;
                    }
                } else if ( rect.height < sojlo ) {
                    efektivaPozicio = "left";
                    if ( this.containerId === "start-menu-content" ) {
                        novaKolSpan = 2;
                        novaVicSpan = 1;
                    }
                } else if ( this.containerId === "start-menu-content" ) {
                    novaKolSpan = 1;
                    novaVicSpan = 1;
                }
            }

            el.dataset.position = efektivaPozicio;
            if ( titolaBreto ) {
                titolaBreto.dataset.position = efektivaPozicio;
            }

            if ( novaKolSpan !== malnovaKolSpan || novaVicSpan !== malnovaVicSpan ) {
                el.dataset.colSpan = novaKolSpan.toString();
                el.dataset.rowSpan = novaVicSpan.toString();
                this.aplikiPozicion( el, parseInt( el.dataset.col || "0" ), parseInt( el.dataset.row || "0" ) );
            }
        } );
    }

    aldoniPiktogramon( appData: AppData, index: number ): HTMLElement {
        if ( !this.container ) return {} as any;

        const el = document.createElement( "div" );
        el.className = "app-tile";
        el.dataset.app = appData.app;
        el.dataset.title = appData.name;
        el.dataset.colSpan = "1";
        el.dataset.rowSpan = "1";

        let estasTrenanta = false;

        // Krei cepufal-envolvaĵon (kiel lastatempa karto)
        const cepufalEl = document.createElement( "div" );
        cepufalEl.className = "cepufal";
        cepufalEl.style.padding = "0";

        // Krei butonan areon
        const butonEl = document.createElement( "button" );
        butonEl.style.blockSize = "100%";
        butonEl.style.inlineSize = "100%";
        butonEl.onclick = ( e: MouseEvent ) => {
            e.stopPropagation();
            // Malfermi aplikaĵon se ne en redakta reĝimo, ne regrandigata, kaj ne trenata
            if ( !this.redaktaReĝimo && !el.classList.contains( "resizing" ) && !estasTrenanta ) {
                const wm = ( window as any ).FenestraAdministranto || ( window as any ).akiriFenestranAdministranton();
                if ( wm && wm.sxargiAplikonDeVojo ) {
                    const vivaTitolo = el.dataset.title || appData.name;
                    wm.sxargiAplikonDeVojo( appData.app, vivaTitolo );
                } else {
                    console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) FenestraAdministranto ne disponeblas" );
                }
            }
            estasTrenanta = false;
        };
        butonEl.oncontextmenu = ( e: MouseEvent ) => {
            e.stopPropagation();
            e.preventDefault();
            if ( ( window as any ).KuntekstaMenuoAdministranto ) {
                ( window as any ).KuntekstaMenuoAdministranto.montriPorKahelo( e.clientX, e.clientY, el );
            }
        };

        // Aldoni etikedon laŭ reĝimo
        if ( this.etikedReĝimo === "inside" ) {
            // Interna reĝimo: etikedo ene de butona areo
            const etikedaSpan = document.createElement( "span" );
            etikedaSpan.className = "label inside";
            etikedaSpan.innerText = appData.name;
            butonEl.appendChild( etikedaSpan );
        } else if ( this.etikedReĝimo !== "hidden" && this.etikedReĝimo !== "off" ) {
            // Ekstera reĝimo: krei titolbreton (ksaka - kiel lastatempa karto)
            const etikedaUjo = document.createElement( "ksaka" );
            etikedaUjo.className = "title-bar";
            const tekstaSpan = document.createElement( "p" );
            tekstaSpan.className = "title-bar-title";
            tekstaSpan.innerText = appData.name;
            etikedaUjo.appendChild( tekstaSpan );
            cepufalEl.appendChild( etikedaUjo );
        }

        const piktogramaSpan = document.createElement( "span" );
        piktogramaSpan.className = "icon";
        piktogramaSpan.innerText = appData.icon;
        butonEl.appendChild( piktogramaSpan );

        cepufalEl.appendChild( butonEl );
        el.appendChild( cepufalEl );

        const tenilo = document.createElement( "div" );
        tenilo.className = "resize-handle";
        const cxeRegrandigaKomenco = ( e: any ) => {
            e.stopPropagation();
            e.preventDefault();
            const poz = EnigaAdministranto.akiriMontranPozicion( e );
            agordiKaheloGrandSxangxi( this, el, poz.x, poz.y );
        };
        tenilo.addEventListener( "mousedown", cxeRegrandigaKomenco );
        tenilo.addEventListener( "touchstart", cxeRegrandigaKomenco, { passive: false } );

        el.appendChild( tenilo );

        if ( this.container ) this.container.appendChild( el );
        this.alakrogiAlKrado( el, index );
        this.gxisdatigiAdaptanOrientigon( el );

        // Spuri regrandigan staton sur la elemento mem
        ( el as CustomHTMLElement )._estasRegrandiganta = false;

        // Pritrakti mousedown kaj touchstart por tren-komenco
        const cxeMontrilPremo = ( e: any ) => {
            // Kontroli ĉu oni rekte alklakas regrandig-tenilan elementon
            const estasRegrandigaTenilo = e.target === tenilo;
            const povasTreni = this.redaktaReĝimo || ( this.containerId === "desktop" && !estasRegrandigaTenilo );

            // Bloki trenon se nuntempe regrandigata aŭ sur regrandiga tenilo
            if ( ( el as CustomHTMLElement )._estasRegrandiganta || estasRegrandigaTenilo ) {
                return;
            }

            if ( povasTreni ) {
                const poz = EnigaAdministranto.akiriMontranPozicion( e );
                agordiKaheloTreni( this, el, poz.x, poz.y, () => {
                    estasTrenanta = false;
                } );
            }
        };

        el.addEventListener( "mousedown", cxeMontrilPremo );
        el.addEventListener( "touchstart", cxeMontrilPremo, { passive: true } );

        return el;
    }

    alakrogiAlKrado( el: HTMLElement, index: number ): void {
        if ( !this.container ) return;

        // Trakti paĝadon nur por portebla labortablo
        const erojPoPaĝo = this.rows * this.cols;
        const paĝaIndekso = erojPoPaĝo > 0 ? Math.floor( index / erojPoPaĝo ) : 0;
        const indeksoSurPaĝo = erojPoPaĝo > 0 ? index % erojPoPaĝo : index;

        // Konservi paĝinformon sur elemento
        el.dataset.page = paĝaIndekso.toString();

        // Montri/kaŝi bazite sur paĝado (nur portebla labortablo)
        if ( this.estasPortebla && this.containerId === "desktop" ) {
            el.style.display = paĝaIndekso === this.nunaPaĝo ? "" : "none";
        }
        if ( this.containerId !== "start-menu-content" ) {
            const c = Math.floor( indeksoSurPaĝo / this.rows );
            const r = ( this.rows - 1 ) - ( indeksoSurPaĝo % this.rows );
            this.aplikiPozicion( el, c, r );
            return;
        }

        // Komenca menuo: uzi plenan indekson por ruluma aranĝo
        const taskbar = typeof akiriTaskobreton === "function" ? akiriTaskobreton() : document.getElementById( "taskbar" );
        const taskobarPozicio = taskbar?.dataset.position || "left";
        const estasVertikalaTaskobreto = taskobarPozicio === "left" || taskobarPozicio === "right";

        // Adapta etendado
        if ( estasVertikalaTaskobreto ) {
            el.dataset.colSpan = "2";
            el.dataset.rowSpan = "1";
        } else {
            el.dataset.colSpan = "1";
            el.dataset.rowSpan = "2";
        }

        const { colSpan: cs, rowSpan: rs } = akiriElementajnSpanojn( el );

        // Plenigi vertikale (malsupre supren), poste horizontale
        if ( estasVertikalaTaskobreto ) {
            const erojPoKol = this.rows;
            const kolGrupo = Math.floor( index / erojPoKol );
            const c = kolGrupo * cs;
            const r = ( this.rows - rs ) - ( index % erojPoKol );
            this.aplikiPozicion( el, c, r );
        } else {
            const erojPoKol = Math.floor( this.rows / rs );
            const c = Math.floor( index / erojPoKol ) * cs;
            const r = ( this.rows - rs ) - ( index % erojPoKol ) * rs;
            this.aplikiPozicion( el, c, r );
        }
    }

    aplikiPozicion( el: HTMLElement, c: number, r: number, xOffset: number = 0 ): void {
        const { colSpan, rowSpan } = akiriElementajnSpanojn( el );

        const povasEtendi = this.containerId === "start-menu-content";
        if ( povasEtendi ) {
            let bezonasRefreŝigon = false;
            if ( c + colSpan > this.cols ) {
                this.cols = c + colSpan;
                bezonasRefreŝigon = true;
            }
            if ( r + rowSpan > this.rows ) {
                this.rows = r + rowSpan;
                bezonasRefreŝigon = true;
            }
            if ( bezonasRefreŝigon ) {
                this.refreŝigi();
                return;
            }
        } else {
            if ( c + colSpan > this.cols ) c = this.cols - colSpan;
            if ( r + rowSpan > this.rows ) r = this.rows - rowSpan;
        }

        if ( c < 0 ) c = 0;
        if ( r < 0 ) r = 0;

        const interspaco = CONSTANTS.DIM.GAP_SIZE;

        const larĝKalk = `calc((${colSpan} / ${this.cols}) * (100% - ${(this.cols - 1) * interspaco}px) + ${(colSpan - 1) * interspaco}px)`;
        const altoKalk = `calc((${rowSpan} / ${this.rows}) * (100% - ${(this.rows - 1) * interspaco}px) + ${(rowSpan - 1) * interspaco}px)`;
        const maldekstraKalk = `calc((${c} / ${this.cols}) * (100% - ${(this.cols - 1) * interspaco}px) + ${c * interspaco}px${xOffset ? ` + ${xOffset}px` : ""})`;
        const suproKalk = `calc((${r} / ${this.rows}) * (100% - ${(this.rows - 1) * interspaco}px) + ${r * interspaco}px)`;

        el.style.width = larĝKalk;
        el.style.height = altoKalk;
        el.style.left = maldekstraKalk;
        el.style.top = suproKalk;

        el.dataset.col = c.toString();
        el.dataset.row = r.toString();

        if ( povasEtendi && this.container ) {
            this.container.style.minHeight = `${(this.rows / this.komencajVicoj) * 100}%`;
            this.container.style.width = "100%";
        }
    }

    rearanĝi(): void {
        if ( !this.config.centered || !this.container ) return;

        const kaheloj = Array.from( this.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
        if ( kaheloj.length === 0 ) return;

        let minK = this.cols;
        let maksK = 0;
        kaheloj.forEach( kahelo => {
            const { col: c, colSpan: cs } = akiriElementanPozicion( kahelo );
            if ( c < minK ) minK = c;
            if ( c + cs > maksK ) maksK = c + cs;
        } );

        const uzitajLarĝajKolumnoj = maksK - minK;
        const { width: ujaL } = akiriUjonGrandecojn( this.fiksaLarĝo, this.fiksaAlto, this.container );
        const w = ujaL / this.cols;
        const xOffset = ( ujaL - ( uzitajLarĝajKolumnoj * w ) ) / 2 - ( minK * w );

        kaheloj.forEach( kahelo => {
            const { col, row } = akiriElementanPozicion( kahelo );
            this.aplikiPozicion( kahelo, col, row, xOffset );
        } );

        if ( this.containerId === "start-menu-content" ) {
            this.container.style.minHeight = `${(this.rows / this.komencajVicoj) * 100}%`;
            this.container.style.minWidth = `${(this.cols / this.komencajKolumnoj) * 100}%`;
        }
    }

    cxuAreoOkupita( c: number, r: number, colSpan: number, rowSpan: number, ekskludiEl: HTMLElement | null ): boolean {
        if ( !this.container ) return false;
        for ( const kahelo of Array.from( this.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[] ) {
            if ( kahelo === ekskludiEl ) continue;

            // Uzi nunan pozicion el datumaro
            const kc = parseInt( kahelo.dataset.col || "0" );
            const kr = parseInt( kahelo.dataset.row || "0" );

            const { colSpan: kcs, rowSpan: krs } = akiriElementajnSpanojn( kahelo );

            if ( c < kc + kcs && c + colSpan > kc && r < kr + krs && r + rowSpan > kr ) {
                return true;
            }
        }
        return false;
    }

    alakrogiPostTrenado( el: HTMLElement ): void {
        const { width: ujaL, height: ujaA } = akiriUjonGrandecojn( this.fiksaLarĝo, this.fiksaAlto, this.container );
        const interspaco = CONSTANTS.DIM.GAP_SIZE;
        const ĉelaL = kalkuliĈelanGrandecon( ujaL, this.cols, interspaco );
        const ĉelaA = kalkuliĈelanGrandecon( ujaA, this.rows, interspaco );

        if ( !this.container ) return;
        const ujaRekt = this.container.getBoundingClientRect();
        const elRekt = el.getBoundingClientRect();

        const lokaX = ( elRekt.left - ujaRekt.left );
        const lokaY = ( elRekt.top - ujaRekt.top );

        let c = Math.round( lokaX / ( ĉelaL + interspaco ) );
        let r = Math.round( lokaY / ( ĉelaA + interspaco ) );

        const { colSpan, rowSpan } = akiriElementajnSpanojn( el );
        if ( c < 0 ) c = 0;
        if ( r < 0 ) r = 0;

        if ( this.containerId !== "start-menu-content" ) {
            if ( c + colSpan > this.cols ) c = this.cols - colSpan;
            if ( r + rowSpan > this.rows ) r = this.rows - rowSpan;
        }

        // Agordi provizoran novan pozicion por kolizio-detekto
        el.dataset._newCol = c.toString();
        el.dataset._newRow = r.toString();

        if ( this.cxuAreoOkupita( c, r, colSpan, rowSpan, el ) ) {
            let lokoTrovita = false;
            for ( let radiuso = 1; radiuso < 0o40 && !lokoTrovita; radiuso++ ) {
                for ( let dc = -radiuso; dc <= radiuso && !lokoTrovita; dc++ ) {
                    for ( let dr = -radiuso; dr <= radiuso && !lokoTrovita; dr++ ) {
                        const nc = c + dc;
                        const nr = r + dr;
                        if ( nc >= 0 && nc + colSpan <= this.cols && nr >= 0 && nr + rowSpan <= this.rows ) {
                            el.dataset._newCol = nc.toString();
                            el.dataset._newRow = nr.toString();
                            if ( !this.cxuAreoOkupita( nc, nr, colSpan, rowSpan, el ) ) {
                                c = nc; r = nr; lokoTrovita = true;
                            }
                        }
                    }
                }
            }
            // Se neniu malplena loko trovita, teni la faligitan pozicion ĉiukaze
        }

        // Forigi provizorajn valorojn kaj apliki pozicion
        delete el.dataset._newCol;
        delete el.dataset._newRow;

        this.aplikiPozicion( el, c, r );
        this.gxisdatigiAdaptanOrientigon( el );

        // Konservi kahelan aranĝon al stokejo
        if ( this.containerId === "desktop" ) ( window as any ).LabortablaPiktogramoAdministranto?._konserviLabortablanArangxon();
    }

    baskuligiRedaktadon(): void {
        this.redaktaReĝimo = !this.redaktaReĝimo;
        if ( this.container ) this.container.classList.toggle( "edit-mode" );
        document.body.classList.toggle( "edit-mode", this.redaktaReĝimo );
    }

    refreŝigi(): void {
        if ( !this.container ) return;
        const kaheloj = Array.from( this.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
        kaheloj.forEach( ( kahelo, index ) => {
            const { col: c, row: r } = akiriElementanPozicion( kahelo );
            const paĝo = parseInt( kahelo.dataset.page || "0" ) || 0;

            // Ĝisdatigi paĝan videblecon ( nur portebla labortablo )
            if ( this.estasPortebla && this.containerId === "desktop" ) {
                kahelo.style.display = paĝo === this.nunaPaĝo ? "" : "none";
            }

            if ( !isNaN( c ) && !isNaN( r ) ) this.aplikiPozicion( kahelo, c, r );
            else this.alakrogiAlKrado( kahelo, index );
        } );
    }
}

// Aldoni al fenestro por tutmonda aliro
( window as any ).PiktogramaKrado = PiktogramaKrado;

/**
 * Akiri maksimuman paĝnombron por portebla paĝado
 */
export function akiriMaksimumanPaĝon( apps?: any[] ): number {
    const erojPoPaĝo = MOBILE_GRID_ROWS * MOBILE_GRID_COLS;
    return Math.ceil( ( apps || ( window as any ).APPS || [] ).length / erojPoPaĝo ) - 1;
}
