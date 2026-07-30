// ≺⧼ Piktograma Krada Klaso ⧽≻

declare const CONSTANTS: any;
declare const EnigaAdministranto: any;
declare const getTaskbar: any;
declare const getElementSpans: any;

import { AppData, IconGridConfig, CustomHTMLElement } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";
import { akiriUjonGrandecojn, akiriElementanPozicion } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɔƽ.js";
import { agordiKaheloTreni, agordiKaheloGrandSxangxi } from "./ſɟɔ }ʃᴜ.js";

// ⟪ Porteblaj Kradaj Dimensiaj Aliajnimoj ( el CONSTANTS ) ⟫
export const MOBILE_GRID_ROWS = CONSTANTS.DIM.MOBILE_ROWS;
export const MOBILE_GRID_COLS = CONSTANTS.DIM.MOBILE_COLS;
export const DESKTOP_GRID_ROWS = CONSTANTS.DIM.DEFAULT_ROWS;
export const DESKTOP_GRID_COLS = CONSTANTS.DIM.DEFAULT_COLS;

let APPS: AppData[] = [];

// ⟪ Piktograma Krado ⟫

export class PiktogramaKrado {
    containerId: string;
    container: HTMLElement | null;
    config: IconGridConfig;
    estasPortebla: boolean;
    rows: number;
    cols: number;
    initialRows: number;
    initialCols: number;
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
        this.initialRows = this.rows;
        this.initialCols = this.cols;
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
            const isClickableBackground = this.containerId === "desktop" || this.containerId === "start-menu";
            if ( isClickableBackground && e.target === this.container ) {
                this.baskuligiRedaktadon();
            }
        } );

        // Touch events for swipe pagination
        this.container.addEventListener( "touchstart", ( e: TouchEvent ) => this.pritraktiTuŝanKomencon( e ), { passive: true } );
        this.container.addEventListener( "touchmove", ( e: TouchEvent ) => this.pritraktiTuŝanMovon( e ), { passive: false } );
        this.container.addEventListener( "touchend", ( e: TouchEvent ) => this.pritraktiTuŝanFinon( e ), { passive: true } );

        // Listen for screen size changes
        window.addEventListener( "resize", () => this.pritraktiEkrananGrandSxangxon() );

        this.inicii();
    }

    cxuPortebla(): boolean {
        return window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;
    }

    pritraktiEkrananGrandSxangxon(): void {
        const wasMobile = this.estasPortebla;
        this.estasPortebla = this.cxuPortebla();

        if ( wasMobile !== this.estasPortebla ) {
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
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchEndY - this.tuŝaKomencoY;
        const diffX = touchEndX - this.tuŝaKomencoX;

        // Vertical swipe for pagination (only on mobile)
        if ( this.estasPortebla && Math.abs( diffY ) > Math.abs( diffX ) && Math.abs( diffY ) > 50 ) {
            if ( diffY > 0 ) {
                // Svingi malsupren - antaŭa paĝo
                if ( this.nunaPaĝo > 0 ) {
                    this.nunaPaĝo--;
                    this.refreŝigi();
                    if ( ( window as any ).LabortablaPiktogramoAdministranto ) ( window as any ).LabortablaPiktogramoAdministranto._gxisdatigiPaĝajnIndikilojn();
                }
            } else {
                // Svingi supren - sekva paĝo
                const maxPage = Math.ceil( APPS.length / ( this.rows * this.cols ) ) - 1;
                if ( this.nunaPaĝo < maxPage ) {
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

            const taskbar = typeof getTaskbar === "function" ? getTaskbar() : document.getElementById( "taskbar" );
            const taskbarPos = taskbar?.dataset.position || "left";

            let effectivePos = taskbarPos;
            const { colSpan: oldColSpan, rowSpan: oldRowSpan } = getElementSpans( el );
            let newColSpan = oldColSpan;
            let newRowSpan = oldRowSpan;

            // Mezuri faktan pilolan dikecon
            const titleBar = el.querySelector( "ksaka" ) as HTMLElement | null;
            let pillThickness = 0o40;
            if ( titleBar ) {
                pillThickness = Math.min( titleBar.offsetWidth || 0o40, titleBar.offsetHeight || 0o40 );
            }

            const padding = 0o20;
            const threshold = 0o100 + pillThickness + padding;

            if ( this.etikedReĝimo === "external" ) {
                if ( rect.width < threshold ) {
                    effectivePos = "bottom";
                    if ( this.containerId === "start-menu-content" ) {
                        newRowSpan = 2;
                        newColSpan = 1;
                    }
                } else if ( rect.height < threshold ) {
                    effectivePos = "left";
                    if ( this.containerId === "start-menu-content" ) {
                        newColSpan = 2;
                        newRowSpan = 1;
                    }
                } else if ( this.containerId === "start-menu-content" ) {
                    newColSpan = 1;
                    newRowSpan = 1;
                }
            }

            el.dataset.position = effectivePos;
            if ( titleBar ) {
                titleBar.dataset.position = effectivePos;
            }

            if ( newColSpan !== oldColSpan || newRowSpan !== oldRowSpan ) {
                el.dataset.colSpan = newColSpan.toString();
                el.dataset.rowSpan = newRowSpan.toString();
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
                const wm = ( window as any ).FenestraAdministranto || ( window as any ).getWindowManager();
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
                ( window as any ).KuntekstaMenuoAdministranto.showForTile( e.clientX, e.clientY, el );
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
            const poz = EnigaAdministranto.getPointerPos( e );
            agordiKaheloGrandSxangxi( this, el, poz.x, poz.y );
        };
        tenilo.addEventListener( "mousedown", cxeRegrandigaKomenco );
        tenilo.addEventListener( "touchstart", cxeRegrandigaKomenco, { passive: false } );

        el.appendChild( tenilo );

        if ( this.container ) this.container.appendChild( el );
        this.alakrogiAlKrado( el, index );
        this.gxisdatigiAdaptanOrientigon( el );

        // Spuri regrandigan staton sur la elemento mem
        ( el as CustomHTMLElement )._isResizing = false;

        // Pritrakti mousedown kaj touchstart por tren-komenco
        const cxeMontrilPremo = ( e: any ) => {
            // Kontroli ĉu oni rekte alklakas regrandig-tenilan elementon
            const estasRegrandigaTenilo = e.target === tenilo;
            const povasTreni = this.redaktaReĝimo || ( this.containerId === "desktop" && !estasRegrandigaTenilo );

            // Bloki trenon se nuntempe regrandigata aŭ sur regrandiga tenilo
            if ( ( el as CustomHTMLElement )._isResizing || estasRegrandigaTenilo ) {
                return;
            }

            if ( povasTreni ) {
                const poz = EnigaAdministranto.getPointerPos( e );
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
        const itemsPerPage = this.rows * this.cols;
        const pageIndex = itemsPerPage > 0 ? Math.floor( index / itemsPerPage ) : 0;
        const indexOnPage = itemsPerPage > 0 ? index % itemsPerPage : index;

        // Konservi paĝinformon sur elemento
        el.dataset.page = pageIndex.toString();

        // Montri/kaŝi bazite sur paĝado (nur portebla labortablo)
        if ( this.estasPortebla && this.containerId === "desktop" ) {
            el.style.display = pageIndex === this.nunaPaĝo ? "" : "none";
        }
        if ( this.containerId !== "start-menu-content" ) {
            const c = Math.floor( indexOnPage / this.rows );
            const r = ( this.rows - 1 ) - ( indexOnPage % this.rows );
            this.aplikiPozicion( el, c, r );
            return;
        }

        // Komenca menuo: uzi plenan indekson por ruluma aranĝo
        const taskbar = typeof getTaskbar === "function" ? getTaskbar() : document.getElementById( "taskbar" );
        const taskbarPos = taskbar?.dataset.position || "left";
        const estasVertikalaTaskobreto = taskbarPos === "left" || taskbarPos === "right";

        // Adapta etendado
        if ( estasVertikalaTaskobreto ) {
            el.dataset.colSpan = "2";
            el.dataset.rowSpan = "1";
        } else {
            el.dataset.colSpan = "1";
            el.dataset.rowSpan = "2";
        }

        const { colSpan: cs, rowSpan: rs } = getElementSpans( el );

        // Plenigi vertikale (malsupre supren), poste horizontale
        if ( estasVertikalaTaskobreto ) {
            const itemsPerCol = this.rows;
            const colGroup = Math.floor( index / itemsPerCol );
            const c = colGroup * cs;
            const r = ( this.rows - rs ) - ( index % itemsPerCol );
            this.aplikiPozicion( el, c, r );
        } else {
            const itemsPerCol = Math.floor( this.rows / rs );
            const c = Math.floor( index / itemsPerCol ) * cs;
            const r = ( this.rows - rs ) - ( index % itemsPerCol ) * rs;
            this.aplikiPozicion( el, c, r );
        }
    }

    aplikiPozicion( el: HTMLElement, c: number, r: number, xOffset: number = 0 ): void {
        const { colSpan, rowSpan } = getElementSpans( el );

        const canExpand = this.containerId === "start-menu-content";
        if ( canExpand ) {
            let needsRefresh = false;
            if ( c + colSpan > this.cols ) {
                this.cols = c + colSpan;
                needsRefresh = true;
            }
            if ( r + rowSpan > this.rows ) {
                this.rows = r + rowSpan;
                needsRefresh = true;
            }
            if ( needsRefresh ) {
                this.refreŝigi();
                return;
            }
        } else {
            if ( c + colSpan > this.cols ) c = this.cols - colSpan;
            if ( r + rowSpan > this.rows ) r = this.rows - rowSpan;
        }

        if ( c < 0 ) c = 0;
        if ( r < 0 ) r = 0;

        const gap = CONSTANTS.DIM.GAP_SIZE;

        const widthCalc = `calc((${colSpan} / ${this.cols}) * (100% - ${(this.cols - 1) * gap}px) + ${(colSpan - 1) * gap}px)`;
        const heightCalc = `calc((${rowSpan} / ${this.rows}) * (100% - ${(this.rows - 1) * gap}px) + ${(rowSpan - 1) * gap}px)`;
        const leftCalc = `calc((${c} / ${this.cols}) * (100% - ${(this.cols - 1) * gap}px) + ${c * gap}px${xOffset ? ` + ${xOffset}px` : ""})`;
        const topCalc = `calc((${r} / ${this.rows}) * (100% - ${(this.rows - 1) * gap}px) + ${r * gap}px)`;

        el.style.width = widthCalc;
        el.style.height = heightCalc;
        el.style.left = leftCalc;
        el.style.top = topCalc;

        el.dataset.col = c.toString();
        el.dataset.row = r.toString();

        if ( canExpand && this.container ) {
            this.container.style.minHeight = `${(this.rows / this.initialRows) * 100}%`;
            this.container.style.width = "100%";
        }
    }

    rearanĝi(): void {
        if ( !this.config.centered || !this.container ) return;

        const tiles = Array.from( this.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
        if ( tiles.length === 0 ) return;

        let minC = this.cols;
        let maxC = 0;
        tiles.forEach( tile => {
            const { col: c, colSpan: cs } = akiriElementanPozicion( tile );
            if ( c < minC ) minC = c;
            if ( c + cs > maxC ) maxC = c + cs;
        } );

        const usedWidthCols = maxC - minC;
        const { width: containerW } = akiriUjonGrandecojn( this.fiksaLarĝo, this.fiksaAlto, this.container );
        const w = containerW / this.cols;
        const xOffset = ( containerW - ( usedWidthCols * w ) ) / 2 - ( minC * w );

        tiles.forEach( tile => {
            const { col, row } = akiriElementanPozicion( tile );
            this.aplikiPozicion( tile, col, row, xOffset );
        } );

        if ( this.containerId === "start-menu-content" ) {
            this.container.style.minHeight = `${(this.rows / this.initialRows) * 100}%`;
            this.container.style.minWidth = `${(this.cols / this.initialCols) * 100}%`;
        }
    }

    cxuAreoOkupita( c: number, r: number, colSpan: number, rowSpan: number, excludeEl: HTMLElement | null ): boolean {
        if ( !this.container ) return false;
        for ( const tile of Array.from( this.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[] ) {
            if ( tile === excludeEl ) continue;

            // Uzi nunan pozicion el datumaro
            let tc = parseInt( tile.dataset.col || "0" );
            let tr = parseInt( tile.dataset.row || "0" );

            // For the excluded element, use its intended new position if provided
            if ( tile === excludeEl && tile.dataset._newCol !== undefined ) {
                tc = parseInt( tile.dataset._newCol );
                tr = parseInt( tile.dataset._newRow || "0" );
            }

            const { colSpan: tcs, rowSpan: trs } = getElementSpans( tile );

            if ( c < tc + tcs && c + colSpan > tc && r < tr + trs && r + rowSpan > tr ) {
                return true;
            }
        }
        return false;
    }

    alakrogiPostTrenado( el: HTMLElement ): void {
        const { width: containerW, height: containerH } = akiriUjonGrandecojn( this.fiksaLarĝo, this.fiksaAlto, this.container );
        const gap = CONSTANTS.DIM.GAP_SIZE;
        const cellW = ( containerW - ( this.cols - 1 ) * gap ) / this.cols;
        const cellH = ( containerH - ( this.rows - 1 ) * gap ) / this.rows;

        if ( !this.container ) return;
        const containerRect = this.container.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        const localX = ( elRect.left - containerRect.left );
        const localY = ( elRect.top - containerRect.top );

        let c = Math.round( localX / ( cellW + gap ) );
        let r = Math.round( localY / ( cellH + gap ) );

        const { colSpan, rowSpan } = getElementSpans( el );
        if ( c < 0 ) c = 0;
        if ( r < 0 ) r = 0;

        if ( this.containerId !== "start-menu-content" ) {
            if ( c + colSpan > this.cols ) c = this.cols - colSpan;
            if ( r + rowSpan > this.rows ) r = this.rows - rowSpan;
        }

        // Set temporary new position for collision detection
        el.dataset._newCol = c.toString();
        el.dataset._newRow = r.toString();

        if ( this.cxuAreoOkupita( c, r, colSpan, rowSpan, el ) ) {
            let spotFound = false;
            for ( let radius = 1; radius < 0o40 && !spotFound; radius++ ) {
                for ( let dc = -radius; dc <= radius && !spotFound; dc++ ) {
                    for ( let dr = -radius; dr <= radius && !spotFound; dr++ ) {
                        const nc = c + dc;
                        const nr = r + dr;
                        if ( nc >= 0 && nc + colSpan <= this.cols && nr >= 0 && nr + rowSpan <= this.rows ) {
                            el.dataset._newCol = nc.toString();
                            el.dataset._newRow = nr.toString();
                            if ( !this.cxuAreoOkupita( nc, nr, colSpan, rowSpan, el ) ) {
                                c = nc; r = nr; spotFound = true;
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
        const tiles = Array.from( this.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
        tiles.forEach( ( tile, index ) => {
            const { col: c, row: r } = akiriElementanPozicion( tile );
            const page = parseInt( tile.dataset.page || "0" ) || 0;

            // Update pagination visibility (mobile desktop only)
            if ( this.estasPortebla && this.containerId === "desktop" ) {
                tile.style.display = page === this.nunaPaĝo ? "" : "none";
            }

            if ( !isNaN( c ) && !isNaN( r ) ) this.aplikiPozicion( tile, c, r );
            else this.alakrogiAlKrado( tile, index );
        } );
    }
}

// Aldoni al fenestro por tutmonda aliro
( window as any ).PiktogramaKrado = PiktogramaKrado;

/**
 * Get maximum page number for mobile pagination
 */
export function akiriMaksimumanPaĝon( apps?: any[] ): number {
    const itemsPerPage = MOBILE_GRID_ROWS * MOBILE_GRID_COLS;
    return Math.ceil( ( apps || ( window as any ).APPS || [] ).length / itemsPerPage ) - 1;
}
