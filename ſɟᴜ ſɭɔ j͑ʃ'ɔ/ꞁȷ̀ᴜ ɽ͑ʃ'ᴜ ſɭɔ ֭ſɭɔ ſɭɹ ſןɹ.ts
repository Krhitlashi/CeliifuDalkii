// ≺⧼ Fenestra Administranto ⧽≻

declare const CONSTANTS: any;
declare const getWindowContainer: any;
declare const getWindowTitle: any;
declare const getHomeArea: any;
declare const getTaskbar: any;
declare const setDraggingState: any;
declare const EnigaAdministranto: any;
declare const AnimacioAdministranto: any;
declare const getStrings: any;
declare const APPS: any;
declare const updateDock: any;

import { setupMontrajnEventojn, akiriMontranPunkton } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

// ⟪ HSL → Hex Konvertilo ⟫
// h: 0-360°, s kaj l: 0-1

function _akiriHSLHex( h: number, s: number, l: number ): string {
    const c: number = ( 1 - Math.abs( 2 * l - 1 ) ) * s;
    const x: number = c * ( 1 - Math.abs( ( ( h / 60 ) % 2 ) - 1 ) );
    const m: number = l - c / 2;

    let r = 0, g = 0, b = 0;
    if ( h < 60 ) { r = c; g = x; }
    else if ( h < 120 ) { r = x; g = c; }
    else if ( h < 180 ) { g = c; b = x; }
    else if ( h < 240 ) { g = x; b = c; }
    else if ( h < 300 ) { r = x; b = c; }
    else { r = c; b = x; }

    const alHex = ( raw: number ): string => {
        // Per konstrukcio raw ( = r + m aŭ g + m aŭ b + m ) ≤ 1, do 0o377 estas la
        // ĝusta maksimuma multiplikato sen bezonata klampo
        const v = Math.round( raw * 0o377 );
        return v.toString( 16 ).padStart( 2, '0' );
    };
    return '#' + alHex( r + m ) + alHex( g + m ) + alHex( b + m );
}


// \u27ea Hilaj Funkcioj por Tavola Komponado \u27eb

function _hexToRgba( hex: string, alfa: number ): string {
    const c: string = hex.charAt( 0 ) === "#" ? hex.substring( 1 ) : hex;
    const r: number = parseInt( c.substring( 0, 2 ), 16 );
    const g: number = parseInt( c.substring( 2, 4 ), 16 );
    const b: number = parseInt( c.substring( 4, 6 ), 16 );
    return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, alfa)).toFixed(2)})`;
}

const _randEntjer = ( min: number, max: number ): number =>
    Math.floor( min + Math.random() * ( max - min + 1 ) );

const _randPozicio = (): string =>
    `${_randEntjer( 15, 85 )}% ${_randEntjer( 15, 85 )}%`;

// Magiaj ne\u016daj akcentoj por 20% de brilaj akcentoj - donas surprizan diversecon
const _MAGIAJ_NEUTRALOJ: string[] = [
    "#ffd166",
    "#7adfff",
    "#ffffff",
    "#ff8acc",
    "#a3b6ff",
    "#caffc7"
];

function _akiriBrilanAkcenton( h: number, s: number ): string {
    const novaS: number = Math.min( 0.95, s + 0.20 );
    const novaL: number = Math.min( 0.88, 0.60 + Math.random() * 0.20 );
    return _akiriHSLHex( h, novaS, novaL );
}

function _akiriAkcentanKoloron( h: number, s: number ): string {
    // 20% magiaj ne\u016daj; 80% derivitaj de la baza huao (altigitaj S/L)
    if ( Math.random() < 0.20 ) {
        return _MAGIAJ_NEUTRALOJ[ _randEntjer( 0, _MAGIAJ_NEUTRALOJ.length - 1 ) ];
    }
    return _akiriBrilanAkcenton( h, s );
}

// Brila orbo: hela koloro en centro, malklari\u011das al menumo%
function _briloTavolo( hex: string, intenseco: number, menumo: number ): string {
    return `radial-gradient(circle at ${_randPozicio()}, ${_hexToRgba( hex, intenseco )} 0%, ${_hexToRgba( hex, 0 )} ${menumo}%)`;
}

// Frostita vitro: travidebla centro, meza bando, malklari\u011das eksteren
function _frostTavolo( hex: string, opako: number ): string {
    return `radial-gradient(circle at ${_randPozicio()}, ${_hexToRgba( hex, 0 )} 0%, ${_hexToRgba( hex, opako )} 45%, ${_hexToRgba( hex, 0 )} 100%)`;
}

// Subtila direkta lavumo
function _lavTavolo( hex: string, opako: number, angulo: number ): string {
    return `linear-gradient(${angulo}deg, ${_hexToRgba( hex, opako )} 0%, ${_hexToRgba( hex, 0 )} 65%)`;
}

// Konusa prisma radio (mallar\u011da, klare difinita)
function _konusTavolo( hex: string, opako: number ): string {
    const angulo: number = _randEntjer( 0, 360 );
    return `conic-gradient(from ${angulo}deg at ${_randPozicio()}, ${_hexToRgba( hex, 0 )} 0deg, ${_hexToRgba( hex, opako )} 18deg, ${_hexToRgba( hex, 0 )} 36deg)`;
}

type _Regimo = "aūroro" | "kosmo" | "frost" | "prismo";

// Re\u011dimo-pez-distribuo: a\u016broro 33%, kosmo 33%, frost 17%, prismo 17%
const _REGIMOJ: _Regimo[] = [ "aūroro", "aūroro", "kosmo", "kosmo", "frost", "prismo" ];

function _konstruiTavolojn(
    koloroj: string[],
    h1: number, s1: number,
    angulo: number,
    tipo: "linear" | "radial",
    regimo: _Regimo
): string[] {
    const baza: string = tipo === "radial"
        ? `radial-gradient(ellipse at center, ${koloroj.join( ", " )})`
        : `linear-gradient(${angulo}deg, ${koloroj.join( ", " )})`;

    const tavoloj: string[] = [];

    if ( regimo === "aūroro" ) {
        // A\u016broro: 2 lar\u011daj molaj briloj + eventuala lavumo
        const ak1: string = _akiriAkcentanKoloron( h1, s1 );
        const ak2: string = _akiriAkcentanKoloron( h1, s1 );
        tavoloj.push( _briloTavolo( ak1, 0.55, 60 ) );
        tavoloj.push( _briloTavolo( ak2, 0.45, 70 ) );
        if ( Math.random() < 0.50 ) {
            tavoloj.push( _lavTavolo( "#ffffff", 0.06, _randEntjer( 80, 180 ) ) );
        }
    } else if ( regimo === "kosmo" ) {
        // Kosmo: 3 akraj densaj briloj + malhela vualo
        const ak1: string = _akiriAkcentanKoloron( h1, s1 );
        const ak2: string = _akiriAkcentanKoloron( h1, s1 );
        const ak3: string = _akiriAkcentanKoloron( h1, s1 );
        tavoloj.push( _briloTavolo( ak1, 0.85, 35 ) );
        tavoloj.push( _briloTavolo( ak2, 0.75, 30 ) );
        tavoloj.push( _briloTavolo( ak3, 0.65, 45 ) );
        tavoloj.push( _lavTavolo( "#000000", 0.25, 180 ) );
    } else if ( regimo === "frost" ) {
        // Frosto: 2-3 frostitaj vitroj + ak\u0109enta brilo
        const lav: string = "#ffffff";
        const ak: string = _akiriAkcentanKoloron( h1, s1 );
        tavoloj.push( _frostTavolo( lav, 0.30 ) );
        tavoloj.push( _frostTavolo( lav, 0.22 ) );
        if ( Math.random() < 0.60 ) {
            tavoloj.push( _frostTavolo( ak, 0.18 ) );
        }
        tavoloj.push( _briloTavolo( ak, 0.40, 50 ) );
    } else if ( regimo === "prismo" ) {
        // Prismo: konusaj radioj de baza koloroj + 1 magia
        koloroj.forEach( hex => {
            tavoloj.push( _konusTavolo( hex, 0.40 ) );
        });
        if ( koloroj.length < 3 ) {
            const plia: string = _akiriAkcentanKoloron( h1, s1 );
            tavoloj.push( _konusTavolo( plia, 0.35 ) );
        }
    }


    // Baza IRAS LAS -- CSS background-image desupre montras la unuan tavolon,
    // do por ke la opaka baza estu FONE (ne kaŝu la brilojn / frostajn vitrojn),
    // ni aldonas ĝin post la translucentaj tavoloj en la listo.
    tavoloj.push( baza );

    return tavoloj;
}


class FenestraAdministranto {
    static statikaZIndekso: number = CONSTANTS.WM.BASE_Z_INDEX;
    static statikaTemoVigladilo: any = null;
    static statikaNunaTemo: string = "detect";

    // ⟪ Aplikaĵa URL-Mapo ⟫ - Konstruita el APPS_DATA ( vojo → vojo )

    static get aplikaĵajURLoj(): { [ key: string ]: string } {
        if ( typeof CONSTANTS.APPS_DATA !== "undefined" ) {
            const map: { [ key: string ]: string } = {};
            CONSTANTS.APPS_DATA.forEach( ( app: any ) => {
                map[ app.path ] = app.path;
            } );
            return map;
        }
        return {};
    }

    // ⟪ Helpaj Funkcioj ⟫

    static _aleatoriaFenestraPozicio( baseY: number ): { x: number; y: number } {
        return {
            x: ( Math.floor( Math.random() * CONSTANTS.WM.WINDOW_RANDOM_RANGE ) * CONSTANTS.WM.WINDOW_RANDOM_STEP ) + CONSTANTS.WM.WINDOW_BASE_X,
            y: ( Math.floor( Math.random() * CONSTANTS.WM.WINDOW_RANDOM_RANGE ) * CONSTANTS.WM.WINDOW_RANDOM_STEP ) + baseY
        };
    }

    static _kreiFenestranElementon( id: string, title: string ): HTMLElement {
        const win = document.createElement( "div" );
        win.classList.add( "window" );
        win.id = id;
        return win;
    }

    static _agordiFenestrajnInteragojn( win: HTMLElement, id: string, title: string ): void {
        win.addEventListener( "mousedown", () => { win.style.zIndex = ( ++this.statikaZIndekso ).toString(); } );
        this.agordiAplikonAktiva( title, true );
    }

    static _injektiStilojnEnIframon( iframeId: string ): void {
        const iframe = document.getElementById( iframeId ) as HTMLIFrameElement | null;
        if ( !iframe ) return;

        iframe.onload = (): void => {
            try {
                const doc = iframe.contentDocument || ( iframe.contentWindow as Window )?.document;
                if ( !doc?.head ) return;

                // Inject override styles
                if ( !doc.getElementById( "injected-style" ) ) {
                    const style = doc.createElement( "style" );
                    style.id = "injected-style";
                    style.textContent = `
                        h1, .saxesukef, .cakaxa, .sozanu, nav, footer, header { display: none !important; }
                        body { background-color: transparent !important; padding: var(--អារេងព៏) !important; }
                        ciihii {
                        background-color: var(--តានេក) !important; }
                    `;
                    doc.head.appendChild( style );
                }

                // Link the global stylesheet for full design system
                if ( !doc.getElementById( "injected-global-css" ) ) {
                    const globalCss = document.querySelector( 'link[href*="֭ſɭᴜ ı],ɔ.css"]' ) as HTMLLinkElement | null;
                    if ( globalCss ) {
                        const link = doc.createElement( "link" );
                        link.id = "injected-global-css";
                        link.rel = "stylesheet";
                        link.href = globalCss.href;
                        doc.head.appendChild( link );
                    }
                }
            } catch ( e ) {
                // Cross-origin iframes will throw; silently ignore
            }
        };
    }

    static _konstruiTitolaBreton( id: string, title: string, simple: boolean = false ): string {
        if ( simple ) {
            return `
                <ksaka onmousedown="FenestraAdministranto.komenciTrenadon(event, '${id}')" ontouchstart="FenestraAdministranto.komenciTrenadon(event, '${id}')">
                    <button onclick="FenestraAdministranto.fermiFenestron('${id}')" title="Fermi">/</button>
                    <button onclick="FenestraAdministranto.baskuligiMaksimumigxon('${id}')" title="Maksimumigi">O</button>
                    <button onclick="FenestraAdministranto.minimumigiFenestron('${id}')" title="Minimumigi">|</button>
                    <p class="title-bar-title">${title}</p>
                </ksaka>
            `;
        }
        return `
            <ksaka class="title-bar n2tase" onmousedown="FenestraAdministranto.komenciTrenadon(event, '${id}')" ontouchstart="FenestraAdministranto.komenciTrenadon(event, '${id}')">
                <div class="window-controls cakaxa">
                    <button class="control-btn" onclick="FenestraAdministranto.fermiFenestron('${id}')" title="Fermi">/</button>
                    <button class="control-btn" onclick="FenestraAdministranto.baskuligiMaksimumigxon('${id}')" title="Maksimumigi">O</button>
                    <button class="control-btn" onclick="FenestraAdministranto.minimumigiFenestron('${id}')" title="Minimumigi">|</button>
                </div>
                <div class="title-bar-title">${title}</div>
            </ksaka>
        `;
    }

    static _konstruiIframanEnhavon( iframeId: string, url: string ): string {
        return `<iframe id="${iframeId}" src="${url}" sandbox="allow-same-origin allow-scripts" style="inline-size:100%; block-size:100%;" class="n2tase"></iframe>`;
    }

    static _konstruiGrandSxangxilojn( id: string ): string {
        return `
            <div class="resize-handle resize-handle-n" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'n')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'n')"></div>
            <div class="resize-handle resize-handle-s" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 's')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 's')"></div>
            <div class="resize-handle resize-handle-e" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'e')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'e')"></div>
            <div class="resize-handle resize-handle-w" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'w')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'w')"></div>
            <div class="resize-handle resize-handle-ne" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'ne')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'ne')"></div>
            <div class="resize-handle resize-handle-nw" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'nw')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'nw')"></div>
            <div class="resize-handle resize-handle-se" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'se')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'se')"></div>
            <div class="resize-handle resize-handle-sw" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'sw')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'sw')"></div>
        `;
    }

    // ⟪ Alenporti Fenestron al Frunto ⟫

    static alenportiAlFrunto( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            win.style.zIndex = ( ++this.statikaZIndekso ).toString();
        }
    }

    // ⟪ Ŝargi Aplikon el Vojo ⟫

    static sxargiAplikonDeVojo( path: string, title: string ): void {
        const container = getWindowContainer();

        // Check if app is already open
        const existingWin = Array.from( document.querySelectorAll( ".window" ) ).find( ( win: any ) => {
            const iframe = win.querySelector( "iframe" );
            return iframe && iframe.src.includes( path );
        } );
        
        
        if ( existingWin ) {
            // App is already open - focus it and refresh recents
            this.fokusigiFenestron( existingWin.id );
            this.renderiLastatempajn();
            return;
        }

        const id = "win-" + Date.now();
        const win = this._kreiFenestranElementon( id, title );
        const app = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === path ) : null;
        win.dataset.emoji = app?.emoji || "🖥️";
        const { x, y } = this._aleatoriaFenestraPozicio( CONSTANTS.WM.WINDOW_BASE_Y_LOAD );
        win.style.left = x + "px";
        win.style.top = y + "px";
        win.style.zIndex = ( ++this.statikaZIndekso ).toString();

        const iframeId = "iframe-" + id;
        win.innerHTML = `
        <div class="cepufal" style="padding: 0; inline-size: 100%;">
            ${this._konstruiTitolaBreton( id, title, true )}
            ${this._konstruiIframanEnhavon( iframeId, path )}
        </div>
        ` + this._konstruiGrandSxangxilojn( id );

        container.appendChild( win );
        this._agordiFenestrajnInteragojn( win, id, title );
        this.gxisdatigiTaskobretajnAplikojn();
        this._injektiStilojnEnIframon( iframeId );

        // Animate window opening with fractions
        AnimacioAdministranto.fenestroMalfermi( win, { ...CONSTANTS.ANIM_SETTINGS.windowOpen } );

        // Refresh recents to show new window
        this.renderiLastatempajn();
    }

    // ⟪ Krei Fenestron ⟫

    static kreiFenestron( path: string, content: string = "" ): void {
        const id = "win-" + Date.now();
        const title = path.split( "/" ).pop()?.replace( ".html", "" ) || "App";
        const container = getWindowContainer();
        const win = this._kreiFenestranElementon( id, title );
        const app = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === path ) : null;
        win.dataset.emoji = app?.emoji || "🖥️";
        const { x, y } = this._aleatoriaFenestraPozicio( CONSTANTS.WM.WINDOW_BASE_Y_CREATE );
        win.style.left = x + "px";
        win.style.top = y + "px";
        win.style.zIndex = ( ++this.statikaZIndekso ).toString();

        const appUrl = this.aplikaĵajURLoj[ path ];
        const iframeId = "iframe-" + id;
        const internalContent = appUrl
            ? this._konstruiIframanEnhavon( iframeId, appUrl )
            : ( content || `<div><p>${title}</p></div>` );

        win.innerHTML = this._konstruiTitolaBreton( id, title ) + internalContent +
            this._konstruiGrandSxangxilojn( id );

        this._agordiFenestrajnInteragojn( win, id, title );
        container.appendChild( win );
        this.gxisdatigiTaskobretajnAplikojn();

        if ( appUrl ) {
            this._injektiStilojnEnIframon( iframeId );
        }

        // Animate window opening with fractions
        AnimacioAdministranto.fenestroMalfermi( win, { ...CONSTANTS.ANIM_SETTINGS.windowOpen } );
    }

    // ⟪ Komenci GrandŜanĝon ⟫

    static komenciGrandSxangxon( e: MouseEvent | TouchEvent, id: string, handle: string ): void {
        e.stopPropagation();
        e.preventDefault();

        const win = document.getElementById( id );
        if ( !win || win.classList.contains( "maximized" ) || win.classList.contains( "fullscreen" ) ) return;

        // Set resizing flag
        ( win as any )._isResizing = true;
        setDraggingState( true );

        const rect = win.getBoundingClientRect();
        const startLeft = win.offsetLeft;
        const startTop = win.offsetTop;
        const startWidth = win.offsetWidth;
        const startHeight = win.offsetHeight;
        const startRight = startLeft + startWidth;
        const startBottom = startTop + startHeight;

        // Get pointer position using unified handler
        const pos = akiriMontranPunkton( e );
        const startX = pos.x;
        const startY = pos.y;

        // Calculate cursor offset from window edge ( handles extend outside window )
        const isWest = handle.includes( "w" );
        const isEast = handle.includes( "e" );
        const isNorth = handle.includes( "n" );
        const isSouth = handle.includes( "s" );
        const offsetX = isWest ? startX - rect.left : 0;
        const offsetY = isNorth ? startY - rect.top : 0;

        const doDrag = ( clientX: number, clientY: number ) => {
            const dx = clientX - startX;
            const dy = clientY - startY;

            // Calculate new position and size using direction flags
            let newLeft = startLeft;
            let newTop = startTop;
            let newRight = startRight;
            let newBottom = startBottom;

            if ( isWest ) newLeft = startLeft + dx + offsetX;
            else if ( isEast ) newRight = startRight + dx;

            if ( isNorth ) newTop = startTop + dy + offsetY;
            else if ( isSouth ) newBottom = startBottom + dy;

            // Calculate final position and size
            const finalWidth = Math.max( CONSTANTS.INPUT.RESIZE_MIN_WIDTH, newRight - newLeft );
            const finalHeight = Math.max( CONSTANTS.INPUT.RESIZE_MIN_HEIGHT, newBottom - newTop );

            win.style.left = newLeft + "px";
            win.style.top = newTop + "px";
            win.style.width = finalWidth + "px";
            win.style.height = finalHeight + "px";
        };

        // Create move handler
        const onMove = ( ev: any ) => {
            ev.preventDefault();
            const p = akiriMontranPunkton( ev );
            doDrag( p.x, p.y );
        };

        // Agordi komunajn montradajn eventojn (forigiEventojn estas vokata en la onEnd-fino)
        const forigiEventojn = setupMontrajnEventojn( onMove, () => {
            setDraggingState( false );
            ( win as any )._isResizing = false;
            forigiEventojn();
        } );
    }

    // ⟪ Fermi Fenestron ⟫

    static fermiFenestron( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            const title = getWindowTitle( win );

            // Animate window closing with fractions
            AnimacioAdministranto.fenestroFermi( win, { ...CONSTANTS.ANIM_SETTINGS.windowClose } ).then( () => {
                this.agordiAplikonAktiva( title, false );
                win.remove();
                this.gxisdatigiTaskobretajnAplikojn();
                this.renderiLastatempajn();
            } );

            return;
        }
    }

    // ⟪ Komenci Trenadon ⟫

    static komenciTrenadon( e: MouseEvent | TouchEvent, id: string ): void {
        e.preventDefault();

        const win = document.getElementById( id );
        if ( !win || ( win as any )._isResizing ) return;

        setDraggingState( true );
        const rect = win.getBoundingClientRect();

        // Get pointer position using unified handler
        const pos = akiriMontranPunkton( e );
        const clientX = pos.x;
        const clientY = pos.y;
        const shiftX = clientX - rect.left;
        const shiftY = clientY - rect.top;

        const doDrag = ( newX: number, newY: number ) => {
            win.style.left = ( newX - shiftX ) + "px";
            win.style.top = ( newY - shiftY ) + "px";
        };

        const stopDrag = () => {
            setDraggingState( false );
        };

        // Use unified input handler for both mouse and touch
        const onMove = ( ev: any, data: any ) => {
            doDrag( data.x, data.y );
        };

        const onEnd = () => {
            stopDrag();
        };

        EnigaAdministranto.setupDrag( win, null, onMove, onEnd );
    }

    // ⟪ Baskuli Maksimumigon ⟫

    static baskuligiMaksimumigxon( id: string ): void {
        const win = document.getElementById( id );
        if ( !win ) return;

        if ( win.classList.contains( "maximized" ) ) {
            // Play unmaximize animation first
            AnimacioAdministranto.malmaksimumigiFenestron( win, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMaximize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMaximize.easing,
                toScale: CONSTANTS.ANIM_SETTINGS.windowMaximize.scale
            } );
            // Restore previous dimensions
            win.style.width = win.dataset.prevWidth || "";
            win.style.height = win.dataset.prevHeight || "";
            win.style.left = win.dataset.prevLeft || "";
            win.style.top = win.dataset.prevTop || "";
            ( win.style as any ).right = "";
            ( win.style as any ).bottom = "";
            win.classList.remove( "maximized" );
        } else {
            // Save current dimensions
            win.dataset.prevWidth = win.style.width || win.offsetWidth + "px";
            win.dataset.prevHeight = win.style.height || win.offsetHeight + "px";
            win.dataset.prevLeft = win.style.left || win.offsetLeft + "px";
            win.dataset.prevTop = win.style.top || win.offsetTop + "px";
            // Clear inline styles so CSS .maximized rules take over
            win.style.width = "";
            win.style.height = "";
            win.style.left = "";
            win.style.top = "";
            ( win.style as any ).right = "";
            ( win.style as any ).bottom = "";
            win.classList.add( "maximized" );
            // Play maximize animation
            AnimacioAdministranto.maksimumigiFenestron( win, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMaximize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMaximize.easing,
                fromScale: CONSTANTS.ANIM_SETTINGS.windowMaximize.scale
            } );
        }
    }

    // ⟪ Minimumigi Fenestron ⟫

    static minimumigiFenestron( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            // Add minimized class immediately to trigger state change,
            // but animation manager will handle the visual part.
            AnimacioAdministranto.minimumigiFenestron( win, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMinimize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMinimize.easing
            } ).then( () => {
                win.classList.add( "minimized" );
                this.gxisdatigiTaskobretajnAplikojn();
                this.renderiLastatempajn();
                if ( typeof updateDock === "function" ) updateDock();
            } );
        }
    }

    // ⟪ Fokusigi Fenestron ⟫

    static fokusigiFenestron( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            if ( win.classList.contains( "minimized" ) ) {
                win.classList.remove( "minimized" );
                AnimacioAdministranto.restaŭriFenestron( win );
            }
            win.style.zIndex = ( ++this.statikaZIndekso ).toString();
            if ( ( window as any ).PanelaAdministranto ) ( window as any ).PanelaAdministranto.fermiCxiujnPanelojn();
            this.gxisdatigiTaskobretajnAplikojn();
        }
    }

    // ⟪ Bildigi Lastatempajn ⟫
    static renderiLastatempajn(): void {
        const list = document.getElementById( "recents-list" );
        if ( !list ) return;

        const windows = document.querySelectorAll( ".window" );
        const strings = typeof getStrings === "function" ? getStrings() : {};

        if ( windows.length === 0 ) {
            list.innerHTML = `<div style="padding: 24px; text-align: center; opacity: 0.5;">${strings.recents_no_apps || "No open apps"}</div>`;
            return;
        }

        list.innerHTML = Array.from( windows ).map( ( win: any ) => {
            const title = win.querySelector( ".title-bar-title" )?.innerText || "App";
            const emoji = win.dataset.emoji || "🖥️";
            const id = win.id;
            return `
                <div class="recents-card" onclick="FenestraAdministranto.fokusigiFenestron('${id}')">
                    <ksaka class="title-bar">
                        <button class="recents-close-btn" onclick="event.stopPropagation(); FenestraAdministranto.fermiFenestron('${id}'); FenestraAdministranto.renderiLastatempajn();">/</button>
                        <p class="title-bar-title">${title}</p>
                    </ksaka>
                    <div class="recents-preview">
                        ${emoji}
                    </div>
                </div>
            `;
        } ).join( "" );
    }

    // ⟪ Ĝisdatigi Dokon ⟫

    static gxisdatigiDokon(): void {
        const dock = document.getElementById( "taskbar-dock" );
        if ( !dock ) return;

        const windows = document.querySelectorAll( ".window" );
        if ( windows.length === 0 ) {
            dock.classList.remove( "visible" );
            return;
        }

        dock.innerHTML = Array.from( windows ).map( ( win: any ) => {
            const title = win.querySelector( ".title-bar-title" )?.innerText || "App";
            const id = win.id;
            const isMinimized = win.classList.contains( "minimized" );
            return `
                <button class="dock-btn n2tase ${isMinimized ? "minimized" : ""}" onclick="FenestraAdministranto.fokusigiFenestron('${id}')" title="${title}">
                    ${title[ 0 ].toUpperCase()}
                </button>
            `;
        } ).join( "" );
    }

    // ⟪ Agordi Aplikon Aktiva ⟫

    static agordiAplikonAktiva( appName: string | null, active: boolean | null ): void {
        const countSpan = document.querySelector( ".active-apps-count" ) as HTMLElement | null;
        if ( countSpan ) {
            const count = document.querySelectorAll( ".window" ).length;
            countSpan.innerText = typeof ( window as any ).vab6caja === "function" ? ( window as any ).vab6caja( count ) : count.toString();
        }
    }

    // ⟪ Ĝisdatigi Taskobretajn Aplikojn ⟫

    static gxisdatigiTaskobretajnAplikojn(): void {
        const center = getHomeArea();
        const taskbar = getTaskbar();
        if ( !center || !taskbar ) return;

        center.querySelectorAll( ".taskbar-app-btn" ).forEach( ( b: HTMLElement ) => b.remove() );

        // Recent apps only shown in recents panel and start menu, not in taskbar
        this.agordiAplikonAktiva( null, null );
    }

    // ⟪ Agordaj Traktiloj ⟫

    static gxisdatigiTaskobretajnAgordojn( val: string ): void {
        document.documentElement.style.setProperty( "--taskbar-width", val + "px" );

        const taskbar = getTaskbar();
        if ( taskbar ) {
            taskbar.dataset.large = ( parseInt( val ) >= CONSTANTS.WM.TASKBAR_LARGE_THRESHOLD ) ? "true" : "false";
        }
        
        // Save to localStorage
        localStorage.setItem( "os-taskbar-size", val );
    }

    // ⟪ Tema Administrado ⟫

    static agordiTemon( theme: string ): void {
        if ( theme === "detect" ) {
            const isDark = window.matchMedia( "(prefers-color-scheme: dark)" ).matches;
            this.aplikiTemon( isDark );
            // Watch for system changes
            if ( !this.statikaTemoVigladilo ) {
                this.statikaTemoVigladilo = ( e: MediaQueryListEvent ) => {
                    if ( this.statikaNunaTemo === "detect" ) this.aplikiTemon( e.matches );
                };
                window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", this.statikaTemoVigladilo );
            }
        } else {
            this.aplikiTemon( theme === "dark" );
        }
        this.statikaNunaTemo = theme;
        localStorage.setItem( "os-theme", theme );
    }

    static aplikiTemon( isDark: boolean ): void {
        const themeVars: { [ key: string ]: string } = isDark ? {
            "--ខេលេសៃ": "#000", "--ខេលេសៃច្ហិ": "#000000a0", "--កេភ": "#fff", "--កេភ២": "#c4c4c4",
            "--តានេក": "#ffffff10", "--តានេកខេលេ": "#ffffff10", "--តានេក២": "#ffffff20",
            "--ឆាងាធី": "#181818", "--ឆាងាធីច្ហិ": "#181818c0"
        } : {
            "--ខេលេសៃ": "#fff", "--ខេលេសៃច្ហិ": "#ffffffa0", "--កេភ": "#000", "--កេភ២": "#484848",
            "--តានេក": "#00000010", "--តានេកខេលេ": "#00000008", "--តានេក២": "#00000020",
            "--ឆាងាធី": "#f4f4f4", "--ឆាងាធីច្ហិ": "#f4f4f4c0"
        };
        const applyTo = ( doc: Document | null ) => {
            if ( !doc?.documentElement ) return;
            Object.entries( themeVars ).forEach( ( [ p, v ] ) => doc.documentElement.style.setProperty( p, v ) );
        };
        applyTo( document );
        document.querySelectorAll( "iframe" ).forEach( ( f: HTMLIFrameElement ) => { try { applyTo( f.contentDocument ); } catch ( e ) { /* ignore */ } } );
    }

    // ⟪ Tapeta Administrado ⟫

    static agordiTapeton( url: string ): void {
        const root = document.getElementById( "os-root" );
        if ( root ) {
            root.classList.remove( "wallpaper-gradient" );
            if ( url ) {
                root.style.backgroundImage = `url('${url}')`;
                root.style.backgroundSize = "cover";
                root.style.backgroundPosition = "center";
            } else {
                root.style.backgroundImage = "none";
            }
        }
        localStorage.setItem( "os-wallpaper", url || "" );
    }

    static agordiGradientanTapeton(
        start: string,
        end: string,
        angulo: number = 135,
        koloroj?: string[],
        tipo: "linear" | "radial" = "linear",
        tavoloj?: string[]
    ): void {
        const root = document.getElementById( "os-root" );
        if ( root ) {
            root.classList.add( "wallpaper-gradient" );
            const haltpunktoj: string[] = koloroj && koloroj.length >= 2 ? koloroj : [ start, end ];
            const css: string = tavoloj && tavoloj.length > 0
                ? tavoloj.join( ", " )
                : (
                    tipo === "radial"
                        ? `radial-gradient(ellipse at center, ${haltpunktoj.join( ", " )})`
                        : `linear-gradient(${angulo}deg, ${haltpunktoj.join( ", " )})`
                );
            root.style.backgroundImage = css;
            root.style.backgroundSize = "100% 100%";
        }
        // Persistas nur la tavolojn kiam ili ekzistas (aliaokaze retro-kompatiba skemo)
        const konservado: any = {
            start,
            end,
            koloroj: koloroj && koloroj.length >= 2 ? koloroj : [ start, end ],
            angulo,
            tipo
        };
        if ( tavoloj && tavoloj.length > 0 ) konservado.tavoloj = tavoloj;
        localStorage.setItem( "os-wallpaper-gradient", JSON.stringify( konservado ) );
        localStorage.removeItem( "os-wallpaper" );
    }

    static agordiHazardaGradientaTapeto(): void {
        // Algoritma hazarda gradienta generacio - neniu antaudifinita paledo.
        // Uzas kolorharmoniojn kun HSL-parametraj limoj por eviti la "mudan" zonon
        // (S < 50% kaj L \u0109irka\u016d 40-60%) kaj certigi klaran kontraston inter finoj.
        // Aldonas tavolojn (brilo, frostita vitro, prisma radio) sur la baza harmonio
        // por unikeco kaj videbla profundo -- ne nur plata koloro-al-koloro.

        // 1. Harmonio: 0=monokroma, 1=analoga, 2=triada-proksima, 3=dividita-komplementa
        const harmonio: number = Math.floor( Math.random() * 0o4 );
        const baza: number = Math.floor( Math.random() * 0o550 );

        let h1: number;
        let h2: number;
        if ( harmonio === 0 ) {
            // Monokroma: \u00b115\u00b0 - apena\u016ba eta delto por subtila profundeco
            h1 = baza;
            h2 = baza + ( Math.random() < 0.5 ? -0o15 : 0o15 );
        } else if ( harmonio === 1 ) {
            // Analoga: 20\u00b0-50\u00b0 - intima parenco
            h1 = baza;
            h2 = baza + 0o24 + Math.floor( Math.random() * 0o30 );
        } else if ( harmonio === 2 ) {
            // Triada-proksima: 60\u00b0-110\u00b0 - harmoniigita kontrasto (stilo Coolors/Adobe)
            h1 = baza;
            h2 = baza + 0o74 + Math.floor( Math.random() * 0o50 );
        } else {
            // Dividita-komplementa: 150\u00b0-210\u00b0 - vigla sen troa kontrasto
            h1 = baza;
            h2 = baza + 0o226 + Math.floor( Math.random() * 0o60 );
        }

        // Normigi al [0, 360\u00b0)
        h1 = ( ( h1 % 0o550 ) + 0o550 ) % 0o550;
        h2 = ( ( h2 % 0o550 ) + 0o550 ) % 0o550;

        // Plej-kurta-angula distanco inter h1 kaj h2 (en [-180\u00b0, +180\u00b0])
        let huDif: number = h2 - h1;
        if ( huDif > 0o264 ) huDif -= 0o550;
        else if ( huDif < -0o264 ) huDif += 0o550;

        // 2. Saturacio: 60%-90% - evita la mudan zonon kaj tenas kolorojn viglaj
        const s1: number = 0.6 + Math.random() * 0.3;
        const s2: number = 0.6 + Math.random() * 0.3;

        // 3. Lumeco-kontrasto garantiata: \u226514%, evitante ekstremojn
        const l1: number = 0.30 + Math.random() * 0.25;
        const lDiferenco: number = 0.14 + Math.random() * 0.26;
        const l2Bruta: number = l1 + ( Math.random() < 0.5 ? -lDiferenco : lDiferenco );
        const l2: number = Math.max( 0.20, Math.min( 0.80, l2Bruta ) );

        // 4. Devigu trian haltpunkton por lar\u011daj \u0135u-distancoj (>90\u00b0) por eviti
        // la mudan centron de RGB-spaco. Alie hazarda je 32%.
        const distancoAbs: number = Math.abs( huDif );
        const uzuTriStops: boolean = distancoAbs > 0o132 || Math.random() < 0.32;
        let koloroj: string[];
        if ( uzuTriStops ) {
            // Mezpunkt-\u0135uo la\u016d la plej kurta vojo, kun eta delto por organika vario
            let mh: number = h1 + huDif / 2 + ( Math.random() < 0.5 ? -0o14 : 0o14 );
            mh = ( ( mh % 0o550 ) + 0o550 ) % 0o550;
            const ms: number = ( s1 + s2 ) / 2;
            // Pli luma ol amba\u016d finoj por sunlevi\u0125o-/a\u016droro-efiko
            let ml: number = ( l1 + l2 ) / 2 + 0.12;
            ml = Math.max( 0.25, Math.min( 0.82, ml ) );
            koloroj = [
                _akiriHSLHex( h1, s1, l1 ),
                _akiriHSLHex( mh, ms, ml ),
                _akiriHSLHex( h2, s2, l2 )
            ];
        } else {
            koloroj = [ _akiriHSLHex( h1, s1, l1 ), _akiriHSLHex( h2, s2, l2 ) ];
        }

        // 5. ~22% de tempo uzas radialan tipon (organika diverseco)
        const uzuRadiala: boolean = Math.random() < 0.22;

        // 6. Angulo por linearaj: 90\u00b0-210\u00b0
        const angulo: number = 0o132 + Math.floor( Math.random() * 0o171 );

        const tipo: "linear" | "radial" = uzuRadiala ? "radial" : "linear";

        // 7. Elekti re\u011dimon por tavola komponado (pezoj en _REGIMOJ)
        const regimo: _Regimo = _REGIMOJ[ Math.floor( Math.random() * _REGIMOJ.length ) ];

        // 8. Konstrui la tavolojn (baza + brilo/frost/prismo la\u016d re\u011dimo)
        const tavoloj: string[] = _konstruiTavolojn( koloroj, h1, s1, angulo, tipo, regimo );

        // Persisti kun plena strukturo (haltpunktoj/angulo/tipo/tavoloj)
        this.agordiGradientanTapeton(
            koloroj[ 0 ],
            koloroj[ koloroj.length - 1 ],
            angulo,
            koloroj,
            tipo,
            tavoloj
        );
    }

    static forigiTapeton(): void {
        const root = document.getElementById( "os-root" );
        if ( root ) {
            root.classList.remove( "wallpaper-gradient" );
            root.style.backgroundImage = "none";
        }
        localStorage.removeItem( "os-wallpaper" );
        localStorage.removeItem( "os-wallpaper-gradient" );
    }

    // ⟪ Inicado ⟫

    static inicii(): void {
        const savedTheme = localStorage.getItem( "os-theme" ) || "detect";
        this.agordiTemon( savedTheme );

        // Load wallpaper (image or gradient)
        const savedWallpaper = localStorage.getItem( "os-wallpaper" );
        if ( savedWallpaper ) {
            this.agordiTapeton( savedWallpaper );
        } else {
            const savedGradient = JSON.parse( localStorage.getItem( "os-wallpaper-gradient" ) || "null" );
            if ( savedGradient ) {
                // Restarigi gradienton kun ĉiuj konservitaj ecoj (haltpunktoj, angulo, tipo, tavoloj)
            this.agordiGradientanTapeton(
                savedGradient.start,
                savedGradient.end,
                savedGradient.angulo ?? 135,
                savedGradient.koloroj,
                savedGradient.tipo ?? "linear",
                savedGradient.tavoloj
            );
            }
        }

        // Initialize taskbar size from localStorage
        const savedTaskbarSize = localStorage.getItem( "os-taskbar-size" ) || "48";
        this.gxisdatigiTaskobretajnAgordojn( savedTaskbarSize );

        // Initialize taskbar with saved position and insets
        this.iniciiTaskobreton();
    }

    // ⟪ Agordi Lingvon ⟫

    static agordiLingvon( val: string ): void {
        if ( typeof window.k2regawe === "function" ) {
            window.k2regawe( val );
        }
    }

    // ⟪ Agordi Etikedan Montron ⟫

    static agordiEtikedMontron( val: string ): void {
        if ( ( window as any ).LabortablaPiktogramoAdministranto ) {
            const dim = ( window as any ).LabortablaPiktogramoAdministranto;
            if ( dim.desktop ) {
                dim.desktop.etikedReĝimo = val;
                dim.desktop.inicii();
            }
            if ( dim.startMenu ) {
                dim.startMenu.etikedReĝimo = val;
                dim.startMenu.inicii();
            }

            // Re-add icons to both grids
            APPS.forEach( ( app: any, i: number ) => {
                dim.desktop?.aldoniPiktogramon( app, i );
                dim.startMenu?.aldoniPiktogramon( app, i );
            } );
            dim._rearanĝiCxiujn();
        }
    }

    // ⟪ Agordi Taskobretan Pozicion ⟫

    static agordiTaskobretanPozicion( pos: string ): void {
        const taskbar = getTaskbar();
        if ( taskbar ) taskbar.dataset.position = pos;

        const root = document.documentElement;
        const sizeWithGap = "calc(var(--taskbar-width) + var(--អារេងព៏) + var(--អារេងព៏) + var(--inset-gap))";
        const margin = "var(--អារេងព៏)";

        const panelInsets: { [ key: string ]: { [ key: string ]: string } } = {
            left: { "left": sizeWithGap, "right": margin, "top": margin, "bottom": margin },
            right: { "right": sizeWithGap, "left": margin, "top": margin, "bottom": margin },
            top: { "top": sizeWithGap, "bottom": margin, "left": margin, "right": margin },
            bottom: { "bottom": sizeWithGap, "top": margin, "left": margin, "right": margin }
        };

        // Reset all panel insets
        [ "top", "bottom", "left", "right" ].forEach( p => {
            root.style.setProperty( `--panel-inset-${p}`, "0px" );
        } );

        const panelValues = panelInsets[ pos ] || panelInsets.left;

        Object.entries( panelValues ).forEach( ( [ prop, val ] ) => {
            root.style.setProperty( `--panel-inset-${prop}`, val );
        } );

        // Update title bar orientation for windows
        document.querySelectorAll( ".window" ).forEach( ( el: any ) => {
            const titleBar = el.querySelector( ".title-bar" );
            if ( titleBar ) {
                titleBar.dataset.position = pos;
            }
            el.dataset.position = pos;
        } );

        // Update tile orientations via managers
        if ( ( window as any ).LabortablaPiktogramoAdministranto ) {
            [ ( window as any ).LabortablaPiktogramoAdministranto.desktop, ( window as any ).LabortablaPiktogramoAdministranto.startMenu ].forEach( ( grid: any ) => {
                grid?.container?.querySelectorAll( ".app-tile" ).forEach( ( tile: HTMLElement ) => grid.gxisdatigiAdaptanOrientigon( tile ) );
            } );
        }

        if ( ( window as any ).LabortablaPiktogramoAdministranto?.desktop ) {
            setTimeout( () => {
                document.querySelectorAll( "#desktop .app-tile" ).forEach( ( tile: any ) =>
                    ( window as any ).LabortablaPiktogramoAdministranto.desktop.aplikiPozicion( tile, parseInt( tile.dataset.col ), parseInt( tile.dataset.row ) )
                );
            }, CONSTANTS.WM.TASKBAR_REPOSITION_DELAY );
        }

        // Save to localStorage
        localStorage.setItem( "os-taskbar-position", pos );
    }

    // ⟪ Inicii Taskobreton ⟫

    static iniciiTaskobreton(): void {
        const taskbar = getTaskbar();
        if ( !taskbar ) return;

        taskbar.dataset.position = "left";
        taskbar.dataset.flow = "default";
        taskbar.dataset.large = "false";

        // Check if mobile device ( small screen )
        const isMobile = window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;

        // Auto-position taskbar based on screen size and orientation
        const autoPositionTaskbar = () => {
            const newIsMobile = window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;
            const newIsPortrait = window.innerHeight > window.innerWidth;
            const currentPos = taskbar.dataset.position;

            if ( newIsMobile ) {
                const isValidForPortrait = currentPos === "bottom";
                const isValidForLandscape = currentPos === "left" || currentPos === "right";
                const needsUpdate = newIsPortrait ? !isValidForPortrait : !isValidForLandscape;

                if ( needsUpdate ) {
                    this.agordiTaskobretanPozicion( newIsPortrait ? "bottom" : "left" );
                }
            }
        };

        if ( isMobile ) {
            // Mobile auto-detect orientation and set position
            const isPortrait = window.innerHeight > window.innerWidth;
            const savedPos = localStorage.getItem( "os-taskbar-position" );

            if ( savedPos ) {
                // Use saved position if it matches orientation
                const validForPortrait = savedPos === "bottom";
                const validForLandscape = savedPos === "left" || savedPos === "right";

                if ( ( isPortrait && validForPortrait ) || ( !isPortrait && validForLandscape ) ) {
                    this.agordiTaskobretanPozicion( savedPos );
                } else {
                    // Auto-set based on orientation
                    this.agordiTaskobretanPozicion( isPortrait ? "bottom" : "left" );
                }
            } else {
                // No saved position - auto-set based on orientation
                this.agordiTaskobretanPozicion( isPortrait ? "bottom" : "left" );
            }

            // Listen for orientation changes and resize
            window.addEventListener( "orientationchange", autoPositionTaskbar );
            window.addEventListener( "resize", autoPositionTaskbar );
        } else {
            const savedPos = localStorage.getItem( "os-taskbar-position" ) || "left";
            this.agordiTaskobretanPozicion( savedPos );
        }
    }
}

// ⟨ Listen For postMessage From Settings Iframe ⟩
window.addEventListener( "message", ( e ) => {
    if ( e.data?.source !== "settings" ) return;
    const { action, value } = e.data;
    
    // Handle gradient wallpaper actions
    if ( action === "setGradientWallpaper" && value?.start && value?.end ) {
        (window as any).FenestraAdministranto.agordiGradientanTapeton( value.start, value.end );
        return;
    }
    if ( action === "setRandomGradientWallpaper" ) {
        (window as any).FenestraAdministranto.agordiHazardaGradientaTapeto();
        return;
    }
    if ( action === "clearWallpaper" ) {
        (window as any).FenestraAdministranto.forigiTapeton();
        return;
    }
    
    if ( typeof ( window as any ).FenestraAdministranto[ action ] === "function" ) {
        ( window as any ).FenestraAdministranto[ action ]( value );
    }
} );

// Initialize Window Manager settings (theme, wallpaper, etc.)
document.addEventListener( "DOMContentLoaded", () => (window as any).FenestraAdministranto.inicii() );

( window as any ).FenestraAdministranto = FenestraAdministranto;
( window as any ).renderRecents = () => (window as any).FenestraAdministranto.renderiLastatempajn();
( window as any ).updateDock = () => (window as any).FenestraAdministranto.gxisdatigiDokon();