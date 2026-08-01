// ≺⧼ Fenestra Administranto ⧽≻

declare const CONSTANTS: any;
declare const akiriFenestranUjon: any;
declare const akiriHejmanAreon: any;
declare const akiriTaskobreton: any;
declare const agordiTrenanStaton: any;
declare const EnigaAdministranto: any;
declare const AnimacioAdministranto: any;
declare const akiriTextojn: any;
declare const APPS: any;
declare const aktualigiDokon: any;

import { setupMontrajnEventojn, akiriMontranPunkton } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

// ⟪ HSL → Hex Konvertilo ⟫
// h: 0-360°, s kaj l: 0-1

function _akiriHSLHex( h: number, s: number, l: number ): string {
    const c: number = ( 1 - Math.abs( 2 * l - 1 ) ) * s;
    const x: number = c * ( 1 - Math.abs( ( ( h / 0o74 ) % 2 ) - 1 ) );
    const m: number = l - c / 2;

    let r = 0, g = 0, b = 0;
    if ( h < 0o74 ) { r = c; g = x; }
    else if ( h < 0o170 ) { r = x; g = c; }
    else if ( h < 0o264 ) { g = c; b = x; }
    else if ( h < 0o360 ) { g = x; b = c; }
    else if ( h < 0o454 ) { r = x; b = c; }
    else { r = c; b = x; }

    const alHex = ( raw: number ): string => {
        // Per konstrukcio raw ( = r + m aŭ g + m aŭ b + m ) ≤ 1, do 0o377 estas la
        // ĝusta maksimuma multiplikato sen bezonata klampo
        const v = Math.round( raw * 0o377 );
        return v.toString( 16 ).padStart( 2, "0" );
    };
    return "#" + alHex( r + m ) + alHex( g + m ) + alHex( b + m );
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
    `${_randEntjer( 0o17, 0o125 )}% ${_randEntjer( 0o17, 0o125 )}%`;

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
    const angulo: number = _randEntjer( 0, 0o550 );
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
        tavoloj.push( _briloTavolo( ak1, 0.55, 0o74 ) );
        tavoloj.push( _briloTavolo( ak2, 0.45, 0o106 ) );
        if ( Math.random() < 0.50 ) {
            tavoloj.push( _lavTavolo( "#ffffff", 0.06, _randEntjer( 0o120, 0o264 ) ) );
        }
    } else if ( regimo === "kosmo" ) {
        // Kosmo: 3 akraj densaj briloj + malhela vualo
        const ak1: string = _akiriAkcentanKoloron( h1, s1 );
        const ak2: string = _akiriAkcentanKoloron( h1, s1 );
        const ak3: string = _akiriAkcentanKoloron( h1, s1 );
        tavoloj.push( _briloTavolo( ak1, 0.85, 0o43 ) );
        tavoloj.push( _briloTavolo( ak2, 0.75, 0o36 ) );
        tavoloj.push( _briloTavolo( ak3, 0.65, 0o55 ) );
        tavoloj.push( _lavTavolo( "#000000", 0.25, 0o264 ) );
    } else if ( regimo === "frost" ) {
        // Frosto: 2-3 frostitaj vitroj + ak\u0109enta brilo
        const lav: string = "#ffffff";
        const ak: string = _akiriAkcentanKoloron( h1, s1 );
        tavoloj.push( _frostTavolo( lav, 0.30 ) );
        tavoloj.push( _frostTavolo( lav, 0.22 ) );
        if ( Math.random() < 0.60 ) {
            tavoloj.push( _frostTavolo( ak, 0.18 ) );
        }
        tavoloj.push( _briloTavolo( ak, 0.40, 0o62 ) );
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

    static _kreiFenestranElementon( id: string, titolo: string ): HTMLElement {
        const fenestro = document.createElement( "div" );
        fenestro.classList.add( "window" );
        fenestro.id = id;
        return fenestro;
    }

    static _agordiFenestrajnInteragojn( fenestro: HTMLElement ): void {
        fenestro.addEventListener( "mousedown", () => { fenestro.style.zIndex = ( ++this.statikaZIndekso ).toString(); } );
        this.agordiAplikonAktiva();
    }

    static _injektiStilojnEnIframon( iframeId: string ): void {
        const iframo = document.getElementById( iframeId ) as HTMLIFrameElement | null;
        if ( !iframo ) return;

        iframo.onload = (): void => {
            try {
                const dokumento = iframo.contentDocument || ( iframo.contentWindow as Window )?.document;
                if ( !dokumento?.head ) return;

                // Injekti superregajn stilojn
                if ( !dokumento.getElementById( "injected-style" ) ) {
                    const stilo = dokumento.createElement( "style" );
                    stilo.id = "injected-style";
                    stilo.textContent = `
                        h1, .saxesukef, .cakaxa, .sozanu, nav, footer, header { display: none !important; }
                        body { background-color: transparent !important; padding: var(--អារេងព៏) !important; }
                        ciihii {
                        background-color: var(--តានេក) !important; }
                    `;
                    dokumento.head.appendChild( stilo );
                }

                // Ligi la tutmondan stilfolion por plena dezajna sistemo
                if ( !dokumento.getElementById( "injected-global-css" ) ) {
                    const tutmondaCss = document.querySelector( 'link[href*="%C4%B1__%C9%94.css"]' ) as HTMLLinkElement | null;
                    if ( tutmondaCss ) {
                        const ligilo = dokumento.createElement( "link" );
                        ligilo.id = "injected-global-css";
                        ligilo.rel = "stylesheet";
                        ligilo.href = tutmondaCss.href;
                        dokumento.head.appendChild( ligilo );
                    }
                }

                // Adopti la propran <title> de la pagio al OS-titola-breto ( lokaj aplikoj, https, same-origin ).
                // Cross-origin https paĝoj ĵetos Sekurec-Eroron ĉi tie — la ekzista try / catch englutos ĝin
                if ( dokumento.title ) {
                    const fenestraId = iframeId.replace( /^iframe-/, "" );
                    const titolaP = document.getElementById( fenestraId )?.querySelector( ".title-bar-title" );
                    if ( titolaP ) titolaP.textContent = dokumento.title;
                }
            } catch ( e ) {
                // Cross-origin iframes ĵetos eraron; silente ignoru
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
        const direktoj: string[] = [ "n", "s", "e", "w", "ne", "nw", "se", "sw" ];
        return direktoj.map( direkto => `
            <div class="resize-handle resize-handle-${direkto}" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', '${direkto}')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', '${direkto}')"></div>
        ` ).join( "" );
    }

    // ⟪ Alenporti Fenestron al Frunto ⟫

    static alenportiAlFrunto( id: string ): void {
        const fenestro = document.getElementById( id );
        if ( fenestro ) {
            fenestro.style.zIndex = ( ++this.statikaZIndekso ).toString();
        }
    }

    // ⟪ Ŝargi Aplikon el Vojo ⟫

    static sxargiAplikonDeVojo( path: string, titolo: string ): void {
        const ujo = akiriFenestranUjon();

        // Kontroli ĉu aplikaĵo jam estas malfermita
        const ekzistantaFenestro = Array.from( document.querySelectorAll( ".window" ) ).find( ( f: any ) => {
            const iframo = f.querySelector( "iframe" );
            return iframo && iframo.src.includes( path );
        } );
        
        
        if ( ekzistantaFenestro ) {
            // Aplikaĵo jam malfermita — fokusigi ĝin kaj refreŝigi lastatempajn
            this.fokusigiFenestron( ekzistantaFenestro.id );
            this.renderiLastatempajn();
            return;
        }

        const id = "win-" + Date.now();
        const fenestro = this._kreiFenestranElementon( id, titolo );
        const app = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === path ) : null;
        fenestro.dataset.emoji = app?.emoji || "🖥️";
        const { x, y } = this._aleatoriaFenestraPozicio( CONSTANTS.WM.WINDOW_BASE_Y_LOAD );
        fenestro.style.left = x + "px";
        fenestro.style.top = y + "px";
        fenestro.style.zIndex = ( ++this.statikaZIndekso ).toString();

        const iframeId = "iframe-" + id;
        fenestro.innerHTML = `
        <div class="cepufal" style="padding: 0; inline-size: 100%;">
            ${this._konstruiTitolaBreton( id, titolo, true )}
            ${this._konstruiIframanEnhavon( iframeId, path )}
        </div>
        ` + this._konstruiGrandSxangxilojn( id );

        ujo.appendChild( fenestro );
        this._agordiFenestrajnInteragojn( fenestro );
        this.gxisdatigiTaskobretajnAplikojn();
        this._injektiStilojnEnIframon( iframeId );

        // Animacii fenestran malfermon kun frakcioj
        AnimacioAdministranto.fenestroMalfermi( fenestro, { ...CONSTANTS.ANIM_SETTINGS.windowOpen } );

        // Refreŝigi lastatempajn por montri novan fenestron
        this.renderiLastatempajn();
    }

    // ⟪ Krei Fenestron ⟫

    static kreiFenestron( path: string, enhavo: string = "" ): void {
        const id = "win-" + Date.now();
        const titolo = path.split( "/" ).pop()?.replace( ".html", "" ) || "App";
        const ujo = akiriFenestranUjon();
        const fenestro = this._kreiFenestranElementon( id, titolo );
        const app = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === path ) : null;
        fenestro.dataset.emoji = app?.emoji || "🖥️";
        const { x, y } = this._aleatoriaFenestraPozicio( CONSTANTS.WM.WINDOW_BASE_Y_CREATE );
        fenestro.style.left = x + "px";
        fenestro.style.top = y + "px";
        fenestro.style.zIndex = ( ++this.statikaZIndekso ).toString();

        const aplikaĵaUrl = this.aplikaĵajURLoj[ path ];
        const iframeId = "iframe-" + id;
        const internaEnhavo = aplikaĵaUrl
            ? this._konstruiIframanEnhavon( iframeId, aplikaĵaUrl )
            : ( enhavo || `<div><p>${titolo}</p></div>` );

        fenestro.innerHTML = this._konstruiTitolaBreton( id, titolo ) + internaEnhavo +
            this._konstruiGrandSxangxilojn( id );

        this._agordiFenestrajnInteragojn( fenestro );
        ujo.appendChild( fenestro );
        this.gxisdatigiTaskobretajnAplikojn();

        if ( aplikaĵaUrl ) {
            this._injektiStilojnEnIframon( iframeId );
        }

        // Animacii fenestran malfermon kun frakcioj
        AnimacioAdministranto.fenestroMalfermi( fenestro, { ...CONSTANTS.ANIM_SETTINGS.windowOpen } );
    }

    // ⟪ Komenci GrandŜanĝon ⟫

    static komenciGrandSxangxon( e: MouseEvent | TouchEvent, id: string, tenilo: string ): void {
        e.stopPropagation();
        e.preventDefault();

        const fenestro = document.getElementById( id );
        if ( !fenestro || fenestro.classList.contains( "maximized" ) || fenestro.classList.contains( "fullscreen" ) ) return;

        // Agordi regrandigan flagon
        ( fenestro as any )._estasRegrandiganta = true;
        agordiTrenanStaton( true );

        const rekt = fenestro.getBoundingClientRect();
        const komencaMaldekstro = fenestro.offsetLeft;
        const komencaSupro = fenestro.offsetTop;
        const komencaLarĝo = fenestro.offsetWidth;
        const komencaAlto = fenestro.offsetHeight;
        const komencaDekstro = komencaMaldekstro + komencaLarĝo;
        const komencaMalsupro = komencaSupro + komencaAlto;

        // Akiri montrilan pozicion per unuecigita traktilo
        const poz = akiriMontranPunkton( e );
        const komencoX = poz.x;
        const komencoY = poz.y;

        // Kalkuli kursoran ofseton de fenestra rando ( teniloj etendiĝas ekster fenestron )
        const estasOkcidento = tenilo.includes( "w" );
        const estasOriento = tenilo.includes( "e" );
        const estasNordo = tenilo.includes( "n" );
        const estasSudo = tenilo.includes( "s" );
        const ofsetoX = estasOkcidento ? komencoX - rekt.left : 0;
        const ofsetoY = estasNordo ? komencoY - rekt.top : 0;

        const fariTrenon = ( klientoX: number, klientoY: number ) => {
            const dx = klientoX - komencoX;
            const dy = klientoY - komencoY;

            // Kalkuli novan pozicion kaj grandecon per direktaj flagoj
            let novaMaldekstro = komencaMaldekstro;
            let novaSupro = komencaSupro;
            let novaDekstro = komencaDekstro;
            let novaMalsupro = komencaMalsupro;

            if ( estasOkcidento ) novaMaldekstro = komencaMaldekstro + dx + ofsetoX;
            else if ( estasOriento ) novaDekstro = komencaDekstro + dx;

            if ( estasNordo ) novaSupro = komencaSupro + dy + ofsetoY;
            else if ( estasSudo ) novaMalsupro = komencaMalsupro + dy;

            // Kalkuli finan pozicion kaj grandecon
            const finaLarĝo = Math.max( CONSTANTS.INPUT.RESIZE_MIN_WIDTH, novaDekstro - novaMaldekstro );
            const finaAlto = Math.max( CONSTANTS.INPUT.RESIZE_MIN_HEIGHT, novaMalsupro - novaSupro );

            fenestro.style.left = novaMaldekstro + "px";
            fenestro.style.top = novaSupro + "px";
            fenestro.style.width = finaLarĝo + "px";
            fenestro.style.height = finaAlto + "px";
        };

        // Krei mov-traktilon
        const cxeMov = ( ev: any ) => {
            ev.preventDefault();
            const p = akiriMontranPunkton( ev );
            fariTrenon( p.x, p.y );
        };

        // Agordi komunajn montradajn eventojn (forigiEventojn estas vokata en la onEnd-fino)
        const forigiEventojn = setupMontrajnEventojn( cxeMov, () => {
            agordiTrenanStaton( false );
            ( fenestro as any )._estasRegrandiganta = false;
            forigiEventojn();
        } );
    }

    // ⟪ Fermi Fenestron ⟫

    static fermiFenestron( id: string ): void {
        const fenestro = document.getElementById( id );
        if ( fenestro ) {
            // Animacii fenestran fermon kun frakcioj
            AnimacioAdministranto.fenestroFermi( fenestro, { ...CONSTANTS.ANIM_SETTINGS.windowClose } ).then( () => {
                this.agordiAplikonAktiva();
                fenestro.remove();
                this.gxisdatigiTaskobretajnAplikojn();
                this.renderiLastatempajn();
            } );

            return;
        }
    }

    // ⟪ Komenci Trenadon ⟫

    static komenciTrenadon( e: MouseEvent | TouchEvent, id: string ): void {
        e.preventDefault();

        const fenestro = document.getElementById( id );
        if ( !fenestro || ( fenestro as any )._estasRegrandiganta ) return;

        agordiTrenanStaton( true );
        const rekt = fenestro.getBoundingClientRect();

        // Akiri montrilan pozicion per unuecigita traktilo
        const poz = akiriMontranPunkton( e );
        const klientoX = poz.x;
        const klientoY = poz.y;
        const ŝovoX = klientoX - rekt.left;
        const ŝovoY = klientoY - rekt.top;

        const fariTrenon = ( novaX: number, novaY: number ) => {
            fenestro.style.left = ( novaX - ŝovoX ) + "px";
            fenestro.style.top = ( novaY - ŝovoY ) + "px";
        };

        const haltiTrenon = () => {
            agordiTrenanStaton( false );
        };

        // Uzi unuecigitan enigan traktilon por ambaŭ muso kaj tuŝo
        const cxeMov = ( ev: any, datumoj: any ) => {
            fariTrenon( datumoj.x, datumoj.y );
        };

        const cxeFin = () => {
            haltiTrenon();
        };

        EnigaAdministranto.agordiTrenadon( fenestro, null, cxeMov, cxeFin );
    }

    // ⟪ Baskuli Maksimumigon ⟫

    static baskuligiMaksimumigxon( id: string ): void {
        const fenestro = document.getElementById( id );
        if ( !fenestro ) return;

        if ( fenestro.classList.contains( "maximized" ) ) {
            // Ludi malmaksimumigan animacion unue
            AnimacioAdministranto.malmaksimumigiFenestron( fenestro, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMaximize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMaximize.easing,
                toScale: CONSTANTS.ANIM_SETTINGS.windowMaximize.scale
            } );
            // Restarigi antaŭajn dimensiojn
            fenestro.style.width = fenestro.dataset.prevWidth || "";
            fenestro.style.height = fenestro.dataset.prevHeight || "";
            fenestro.style.left = fenestro.dataset.prevLeft || "";
            fenestro.style.top = fenestro.dataset.prevTop || "";
            ( fenestro.style as any ).right = "";
            ( fenestro.style as any ).bottom = "";
            fenestro.classList.remove( "maximized" );
        } else {
            // Konservi nunajn dimensiojn
            fenestro.dataset.prevWidth = fenestro.style.width || fenestro.offsetWidth + "px";
            fenestro.dataset.prevHeight = fenestro.style.height || fenestro.offsetHeight + "px";
            fenestro.dataset.prevLeft = fenestro.style.left || fenestro.offsetLeft + "px";
            fenestro.dataset.prevTop = fenestro.style.top || fenestro.offsetTop + "px";
            // Forviŝi enliniajn stilojn por ke CSS .maximized reguloj transprenu
            fenestro.style.width = "";
            fenestro.style.height = "";
            fenestro.style.left = "";
            fenestro.style.top = "";
            ( fenestro.style as any ).right = "";
            ( fenestro.style as any ).bottom = "";
            fenestro.classList.add( "maximized" );
            // Ludi maksimumigan animacion
            AnimacioAdministranto.maksimumigiFenestron( fenestro, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMaximize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMaximize.easing,
                fromScale: CONSTANTS.ANIM_SETTINGS.windowMaximize.scale
            } );
        }
    }

    // ⟪ Minimumigi Fenestron ⟫

    static minimumigiFenestron( id: string ): void {
        const fenestro = document.getElementById( id );
        if ( fenestro ) {
            // Aldoni minimumigitan klason tuj por ekigi ŝtatŝanĝon,
            // sed la animacia administranto pritraktos la vidan parton.
            AnimacioAdministranto.minimumigiFenestron( fenestro, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMinimize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMinimize.easing
            } ).then( () => {
                fenestro.classList.add( "minimized" );
                this.gxisdatigiTaskobretajnAplikojn();
                this.renderiLastatempajn();
                if ( typeof aktualigiDokon === "function" ) aktualigiDokon();
            } );
        }
    }

    // ⟪ Fokusigi Fenestron ⟫

    static fokusigiFenestron( id: string ): void {
        const fenestro = document.getElementById( id );
        if ( fenestro ) {
            if ( fenestro.classList.contains( "minimized" ) ) {
                fenestro.classList.remove( "minimized" );
                AnimacioAdministranto.restaŭriFenestron( fenestro );
            }
            fenestro.style.zIndex = ( ++this.statikaZIndekso ).toString();
            if ( ( window as any ).PanelaAdministranto ) ( window as any ).PanelaAdministranto.fermiCxiujnPanelojn();
            this.gxisdatigiTaskobretajnAplikojn();
        }
    }

    // ⟪ Bildigi Lastatempajn ⟫
    static renderiLastatempajn(): void {
        const listo = document.getElementById( "recents-list" );
        if ( !listo ) return;

        const fenestroj = document.querySelectorAll( ".window" );
        const tekstoj = typeof akiriTextojn === "function" ? akiriTextojn() : {};

        if ( fenestroj.length === 0 ) {
            listo.innerHTML = `<div style="padding: 24px; text-align: center; opacity: 0.5;">${tekstoj.recents_no_apps || "No open apps"}</div>`;
            return;
        }

        listo.innerHTML = Array.from( fenestroj ).map( ( f: any ) => {
            const titolo = f.querySelector( ".title-bar-title" )?.innerText || "App";
            const emoĝio = f.dataset.emoji || "🖥️";
            const id = f.id;
            return `
                <div class="recents-card" onclick="FenestraAdministranto.fokusigiFenestron('${id}')">
                    <ksaka class="title-bar">
                        <button class="recents-close-btn" onclick="event.stopPropagation(); FenestraAdministranto.fermiFenestron('${id}'); FenestraAdministranto.renderiLastatempajn();">/</button>
                        <p class="title-bar-title">${titolo}</p>
                    </ksaka>
                    <div class="recents-preview">
                        ${emoĝio}
                    </div>
                </div>
            `;
        } ).join( "" );
    }

    // ⟪ Ĝisdatigi Dokon ⟫

    static gxisdatigiDokon(): void {
        const doko = document.getElementById( "taskbar-dock" );
        if ( !doko ) return;

        const fenestroj = document.querySelectorAll( ".window" );
        if ( fenestroj.length === 0 ) {
            doko.classList.remove( "visible" );
            return;
        }

        doko.innerHTML = Array.from( fenestroj ).map( ( f: any ) => {
            const titolo = f.querySelector( ".title-bar-title" )?.innerText || "App";
            const id = f.id;
            const estasMinimumigita = f.classList.contains( "minimized" );
            return `
                <button class="dock-btn n2tase ${estasMinimumigita ? "minimized" : ""}" onclick="FenestraAdministranto.fokusigiFenestron('${id}')" title="${titolo}">
                    ${titolo[ 0 ].toUpperCase()}
                </button>
            `;
        } ).join( "" );
    }

    // ⟪ Agordi Aplikon Aktiva ⟫

    static agordiAplikonAktiva(): void {
        const nombraSpan = document.querySelector( ".active-apps-count" ) as HTMLElement | null;
        if ( nombraSpan ) {
            const nombro = document.querySelectorAll( ".window" ).length;
            nombraSpan.innerText = typeof ( window as any ).vab6caja === "function" ? ( window as any ).vab6caja( nombro ) : nombro.toString();
        }
    }

    // ⟪ Ĝisdatigi Taskobretajn Aplikojn ⟫

    static gxisdatigiTaskobretajnAplikojn(): void {
        const centro = akiriHejmanAreon();
        const taskobar = akiriTaskobreton();
        if ( !centro || !taskobar ) return;

        centro.querySelectorAll( ".taskbar-app-btn" ).forEach( ( b: HTMLElement ) => b.remove() );

        // Lastatempaj aplikaĵoj nur montrataj en lastatempa panelo kaj komenca menuo, ne en taskobreto
        this.agordiAplikonAktiva();
    }

    // ⟪ Agordaj Traktiloj ⟫

    static gxisdatigiTaskobretajnAgordojn( val: string ): void {
        document.documentElement.style.setProperty( "--taskbar-width", val + "px" );

        const taskobar = akiriTaskobreton();
        if ( taskobar ) {
            taskobar.dataset.large = ( parseInt( val ) >= CONSTANTS.WM.TASKBAR_LARGE_THRESHOLD ) ? "true" : "false";
        }
        
        // Konservi al localStorage
        localStorage.setItem( "os-taskbar-size", val );
    }

    // ⟪ Tema Administrado ⟫

    static agordiTemon( theme: string ): void {
        if ( theme === "detect" ) {
            const estasMalhela = window.matchMedia( "(prefers-color-scheme: dark)" ).matches;
            this.aplikiTemon( estasMalhela );
            // Observi sistemajn ŝanĝojn
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
        const aplikiAl = ( dokumento: Document | null ) => {
            if ( !dokumento?.documentElement ) return;
            Object.entries( themeVars ).forEach( ( [ p, v ] ) => dokumento.documentElement.style.setProperty( p, v ) );
        };
        aplikiAl( document );
        document.querySelectorAll( "iframe" ).forEach( ( f: HTMLIFrameElement ) => { try { aplikiAl( f.contentDocument ); } catch ( e ) { /* ignore */ } } );
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
        angulo: number = 0o207,
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
        const konservitaTemo = localStorage.getItem( "os-theme" ) || "detect";
        this.agordiTemon( konservitaTemo );

        // Ŝargi tapeton ( bildo aŭ gradiento )
        const konservitaTapeto = localStorage.getItem( "os-wallpaper" );
        if ( konservitaTapeto ) {
            this.agordiTapeton( konservitaTapeto );
        } else {
            const konservitaGradiento = JSON.parse( localStorage.getItem( "os-wallpaper-gradient" ) || "null" );
            if ( konservitaGradiento ) {
                // Restarigi gradienton kun ĉiuj konservitaj ecoj (haltpunktoj, angulo, tipo, tavoloj)
            this.agordiGradientanTapeton(
                konservitaGradiento.start,
                konservitaGradiento.end,
                konservitaGradiento.angulo ?? 0o207,
                konservitaGradiento.koloroj,
                konservitaGradiento.tipo ?? "linear",
                konservitaGradiento.tavoloj
            );
            }
        }

        // Iniciati taskobretan grandecon el localStorage
        const konservitaTaskobretaGrando = localStorage.getItem( "os-taskbar-size" ) || "48";
        this.gxisdatigiTaskobretajnAgordojn( konservitaTaskobretaGrando );

        // Iniciati taskobreton kun konservita pozicio kaj enŝovoj
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

            // Re-aldoni piktogramojn al ambaŭ kradoj
            APPS.forEach( ( app: any, i: number ) => {
                dim.desktop?.aldoniPiktogramon( app, i );
                dim.startMenu?.aldoniPiktogramon( app, i );
            } );
            dim._rearanĝiCxiujn();
        }
    }

    // ⟪ Agordi Taskobretan Pozicion ⟫

    static agordiTaskobretanPozicion( pos: string ): void {
        const taskobar = akiriTaskobreton();
        if ( taskobar ) taskobar.dataset.position = pos;

        const radiko = document.documentElement;
        const grandoKunInterspaco = "calc(var(--taskbar-width) + var(--អារេងព៏) + var(--អារេងព៏) + var(--inset-gap))";
        const marĝeno = "var(--អារេងព៏)";

        const panelajEnŝovoj: { [ key: string ]: { [ key: string ]: string } } = {
            left: { "left": grandoKunInterspaco, "right": marĝeno, "top": marĝeno, "bottom": marĝeno },
            right: { "right": grandoKunInterspaco, "left": marĝeno, "top": marĝeno, "bottom": marĝeno },
            top: { "top": grandoKunInterspaco, "bottom": marĝeno, "left": marĝeno, "right": marĝeno },
            bottom: { "bottom": grandoKunInterspaco, "top": marĝeno, "left": marĝeno, "right": marĝeno }
        };

        // Restarigi ĉiujn panelajn enŝovojn
        [ "top", "bottom", "left", "right" ].forEach( p => {
            radiko.style.setProperty( `--panel-inset-${p}`, "0px" );
        } );

        const panelajValoroj = panelajEnŝovoj[ pos ] || panelajEnŝovoj.left;

        Object.entries( panelajValoroj ).forEach( ( [ prop, val ] ) => {
            radiko.style.setProperty( `--panel-inset-${prop}`, val );
        } );

        // Ĝisdatigi titolbreto-orientiĝon por fenestroj
        document.querySelectorAll( ".window" ).forEach( ( el: any ) => {
            const titolBreto = el.querySelector( ".title-bar" );
            if ( titolBreto ) {
                titolBreto.dataset.position = pos;
            }
            el.dataset.position = pos;
        } );

        // Ĝisdatigi kahelajn orientiĝojn per administrantoj
        if ( ( window as any ).LabortablaPiktogramoAdministranto ) {
            [ ( window as any ).LabortablaPiktogramoAdministranto.desktop, ( window as any ).LabortablaPiktogramoAdministranto.startMenu ].forEach( ( krado: any ) => {
                krado?.container?.querySelectorAll( ".app-tile" ).forEach( ( kahelo: HTMLElement ) => krado.gxisdatigiAdaptanOrientigon( kahelo ) );
            } );
        }

        if ( ( window as any ).LabortablaPiktogramoAdministranto?.desktop ) {
            setTimeout( () => {
                document.querySelectorAll( "#desktop .app-tile" ).forEach( ( kahelo: any ) =>
                    ( window as any ).LabortablaPiktogramoAdministranto.desktop.aplikiPozicion( kahelo, parseInt( kahelo.dataset.col ), parseInt( kahelo.dataset.row ) )
                );
            }, CONSTANTS.WM.TASKBAR_REPOSITION_DELAY );
        }

        // Konservi al localStorage
        localStorage.setItem( "os-taskbar-position", pos );
    }

    // ⟪ Inicii Taskobreton ⟫

    static iniciiTaskobreton(): void {
        const taskobar = akiriTaskobreton();
        if ( !taskobar ) return;

        taskobar.dataset.position = "left";
        taskobar.dataset.flow = "default";
        taskobar.dataset.large = "false";

        // Kontroli ĉu portebla aparato ( malgranda ekrano )
        const estasPortebla = window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;

        // Aŭtomate pozicii taskobreton bazite sur ekrana grando kaj orientiĝo
        const aŭtomatePoziciiTaskobreton = () => {
            const novaEstasPortebla = window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;
            const novaEstasPortreta = window.innerHeight > window.innerWidth;
            const nunaPozicio = taskobar.dataset.position;

            if ( novaEstasPortebla ) {
                const validasPorPortreto = nunaPozicio === "bottom";
                const validasPorPejzaĝo = nunaPozicio === "left" || nunaPozicio === "right";
                const bezonasĜisdatigon = novaEstasPortreta ? !validasPorPortreto : !validasPorPejzaĝo;

                if ( bezonasĜisdatigon ) {
                    this.agordiTaskobretanPozicion( novaEstasPortreta ? "bottom" : "left" );
                }
            }
        };

        if ( estasPortebla ) {
            // Portebla: aŭtomate detekti orientiĝon kaj agordi pozicion
            const estasPortreta = window.innerHeight > window.innerWidth;
            const konservitaPozicio = localStorage.getItem( "os-taskbar-position" );

            if ( konservitaPozicio ) {
                // Uzi konservitan pozicion se ĝi kongruas kun orientiĝo
                const validasPorPortreto = konservitaPozicio === "bottom";
                const validasPorPejzaĝo = konservitaPozicio === "left" || konservitaPozicio === "right";

                if ( ( estasPortreta && validasPorPortreto ) || ( !estasPortreta && validasPorPejzaĝo ) ) {
                    this.agordiTaskobretanPozicion( konservitaPozicio );
                } else {
                    // Aŭtomate agordi bazite sur orientiĝo
                    this.agordiTaskobretanPozicion( estasPortreta ? "bottom" : "left" );
                }
            } else {
                // Neniu konservita pozicio - aŭtomate agordi bazite sur orientiĝo
                this.agordiTaskobretanPozicion( estasPortreta ? "bottom" : "left" );
            }

            // Aŭskulti orientiĝajn ŝanĝojn kaj regrandigojn
            window.addEventListener( "orientationchange", aŭtomatePoziciiTaskobreton );
            window.addEventListener( "resize", aŭtomatePoziciiTaskobreton );
        } else {
            const konservitaPozicio = localStorage.getItem( "os-taskbar-position" ) || "left";
            this.agordiTaskobretanPozicion( konservitaPozicio );
        }
    }
}

// ⟨ Aŭskulti postMessage De Agorda Iframo ⟩
window.addEventListener( "message", ( e ) => {
    if ( e.data?.source !== "settings" ) return;
    const { action, value } = e.data;
    
    // Pritrakti gradientajn tapetajn agojn
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

// Iniciati Fenestran Administranton ( temo, tapeto, ktp. )
document.addEventListener( "DOMContentLoaded", () => (window as any).FenestraAdministranto.inicii() );

( window as any ).FenestraAdministranto = FenestraAdministranto;
( window as any ).bildigiLastatempajn = () => (window as any).FenestraAdministranto.renderiLastatempajn();
( window as any ).aktualigiDokon = () => (window as any).FenestraAdministranto.gxisdatigiDokon();