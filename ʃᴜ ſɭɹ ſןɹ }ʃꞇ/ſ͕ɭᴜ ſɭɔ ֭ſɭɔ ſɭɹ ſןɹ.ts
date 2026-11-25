// ≺⧼ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ 🪟 ⧽≻

declare const HAKARANI: any;
declare const xk12naQakehek2p2an3aqn: any;
declare const xk12naHafenAreon: any;
declare const xk12naQavek2p2nion: any;
declare const vahateVaxafanC2ksakn: any;
declare const caxk12na: any;
declare const tahalaqaz: any;
declare const xk12naTextojn: any;
declare const HAVEK2P2NI: any;
declare const aktualigiDokon: any;
declare const xk12naQakehek2p2anK61epuf2n: any;
declare const xk12naTahaqken2qaion: any;

import { setupVaxafaTraktilojn, xk12naXcanaT6ksekn } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

// ⟪ ᶅſɔ ֭ſɭɹ ʌ ſɭɹ ſȷɔ ⟫

function _xk12naHSLHex( h: number, s: number, l: number ): string {
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
        const v = Math.round( raw * 0o377 );
        return v.toString( 16 ).padStart( 2, "0" );
    };
    return "#" + alHex( r + m ) + alHex( g + m ) + alHex( b + m );
}

function _hexToRgba( weh2: string, alfa: number ): string {
    const c: string = weh2.charAt( 0 ) === "#" ? weh2.substring( 1 ) : weh2;
    const r: number = parseInt( c.substring( 0, 2 ), 16 );
    const g: number = parseInt( c.substring( 2, 4 ), 16 );
    const b: number = parseInt( c.substring( 4, 6 ), 16 );
    return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, alfa)).toFixed(2)})`;
}

const _randEntjer = ( min: number, max: number ): number =>
    Math.floor( min + Math.random() * ( max - min + 1 ) );

// ⟨ ʃэ ɭʃɔȝ ʌ ſןͷ̗ɜ j͑ʃƨɔȝ ⟩

function limigiRuluman( fn: () => void, atendo: number = 0o200 ): () => void {
    let ca1om2: number | null = null;
    return () => {
        if ( ca1om2 !== null ) clearTimeout( ca1om2 );
        ca1om2 = window.setTimeout( fn, atendo );
    };
}

const _randQakek = (): string =>
    `${_randEntjer( 0o17, 0o125 )}% ${_randEntjer( 0o17, 0o125 )}%`;

const _MAGIAJ_NEUTRALOJ: string[] = [
    "#f8d068",
    "#78d0f8",
    "#FFFFFF",
    "#f880c8",
    "#a8b0f8",
    "#c8f0c8"
];

function _xcanaT6faniSakn( h: number, s: number ): string {
    const sefeS: number = Math.min( 0.95, s + 0.20 );
    const sefeL: number = Math.min( 0.88, 0.60 + Math.random() * 0.20 );
    return _xk12naHSLHex( h, sefeS, sefeL );
}

function _xcanaPuf2Weh2n( h: number, s: number ): string {
    if ( Math.random() < 0.20 ) {
        return _MAGIAJ_NEUTRALOJ[ _randEntjer( 0, _MAGIAJ_NEUTRALOJ.length - 1 ) ];
    }
    return _xcanaT6faniSakn( h, s );
}

function _t6faniS2tanek( weh2: string, intenseco: number, n2tanumo: number ): string {
    return `radial-gradient(circle at ${_randQakek()}, ${_hexToRgba( weh2, intenseco )} 0%, ${_hexToRgba( weh2, 0 )} ${n2tanumo}%)`;
}

function _quniS2tanek( weh2: string, opako: number ): string {
    return `radial-gradient(circle at ${_randQakek()}, ${_hexToRgba( weh2, 0 )} 0%, ${_hexToRgba( weh2, opako )} 45%, ${_hexToRgba( weh2, 0 )} 100%)`;
}

function _weh2S2tanek( weh2: string, opako: number, angulo: number ): string {
    return `linear-gradient(${angulo}deg, ${_hexToRgba( weh2, opako )} 0%, ${_hexToRgba( weh2, 0 )} 65%)`;
}

function _ks2buS2tanek( weh2: string, opako: number ): string {
    const angulo: number = _randEntjer( 0, 0o550 );
    return `conic-gradient(from ${angulo}deg at ${_randQakek()}, ${_hexToRgba( weh2, 0 )} 0deg, ${_hexToRgba( weh2, opako )} 18deg, ${_hexToRgba( weh2, 0 )} 36deg)`;
}

type _Regimo = "aūroro" | "kosmo" | "frost" | "prismo";

const _REGIMOJ: _Regimo[] = [ "aūroro", "aūroro", "kosmo", "kosmo", "frost", "prismo" ];

function _konstruiHaS2tanekjn(
    haweh2: string[],
    h1: number, s1: number,
    angulo: number,
    tipo: "linear" | "radial",
    regimo: _Regimo
): string[] {
    const baza: string = tipo === "radial"
        ? `radial-gradient(ellipse at center, ${haweh2.join( ", " )})`
        : `linear-gradient(${angulo}deg, ${haweh2.join( ", " )})`;

    const has2tanek: string[] = [];

    if ( regimo === "aūroro" ) {
        const ak1: string = _xcanaPuf2Weh2n( h1, s1 );
        const ak2: string = _xcanaPuf2Weh2n( h1, s1 );
        has2tanek.push( _t6faniS2tanek( ak1, 0.55, 0o74 ) );
        has2tanek.push( _t6faniS2tanek( ak2, 0.45, 0o106 ) );
        if ( Math.random() < 0.50 ) {
            has2tanek.push( _weh2S2tanek( "#FFFFFF", 0.06, _randEntjer( 0o120, 0o264 ) ) );
        }
    } else if ( regimo === "kosmo" ) {
        const ak1: string = _xcanaPuf2Weh2n( h1, s1 );
        const ak2: string = _xcanaPuf2Weh2n( h1, s1 );
        const ak3: string = _xcanaPuf2Weh2n( h1, s1 );
        has2tanek.push( _t6faniS2tanek( ak1, 0.85, 0o43 ) );
        has2tanek.push( _t6faniS2tanek( ak2, 0.75, 0o36 ) );
        has2tanek.push( _t6faniS2tanek( ak3, 0.65, 0o55 ) );
        has2tanek.push( _weh2S2tanek( "#000000", 0.25, 0o264 ) );
    } else if ( regimo === "frost" ) {
        const lav: string = "#FFFFFF";
        const ak: string = _xcanaPuf2Weh2n( h1, s1 );
        has2tanek.push( _quniS2tanek( lav, 0.30 ) );
        has2tanek.push( _quniS2tanek( lav, 0.22 ) );
        if ( Math.random() < 0.60 ) {
            has2tanek.push( _quniS2tanek( ak, 0.18 ) );
        }
        has2tanek.push( _t6faniS2tanek( ak, 0.40, 0o62 ) );
    } else if ( regimo === "prismo" ) {
        haweh2.forEach( weh2 => {
            has2tanek.push( _ks2buS2tanek( weh2, 0.40 ) );
        });
        if ( haweh2.length < 3 ) {
            const plia: string = _xcanaPuf2Weh2n( h1, s1 );
            has2tanek.push( _ks2buS2tanek( plia, 0.35 ) );
        }
    }

    has2tanek.push( baza );

    return has2tanek;
}

class arakehek2p2 {
    static statikaZVecax2l: number = HAKARANI.WM.BASE_Z_INDEX;
    static statikaTom6nuVigladilo: any = null;
    static statikaKxeteTom6nu: string = "cak2p2";

    static tabVaxafaC2ksak: { vulaId: string; vaxafaKuba: HTMLElement | null; fontaQakehek2p2o: HTMLElement | null; ne3unakanto: (() => void) | null } = { vulaId: "", vaxafaKuba: null, fontaQakehek2p2o: null, ne3unakanto: null };

// ⟪ j͑ʃ'w j͐ʃᴜ ʌ j͑ʃɹ ʌ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ ⟫

    static _xk12naTabojn( qakehek2p2o: HTMLElement ): HTMLElement[] {
        return Array.from( qakehek2p2o.querySelectorAll( ".vula-ca12na" ) ) as HTMLElement[];
    }

    static _xk12naAktivanTabon( qakehek2p2o: HTMLElement ): HTMLElement | null {
        const vulaj = this._xk12naTabojn( qakehek2p2o );
        return vulaj.find( t => t.getAttribute( "aria-pressed" ) === "true" ) || vulaj[ vulaj.length - 1 ] || null;
    }

// ⟪ ֭ſɭɔⅎ }ʃɔ ʌ j͑ʃ'w j͐ʃᴜ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    static k3unakTabonAl( qakehek2p2o: HTMLElement, path: string, k61epuf2: string, kek2Html: string = "" ): string {
        const qakehek2p2oId = qakehek2p2o.id;
        const j6seKek = qakehek2p2o.querySelector( ".vula-kek2" ) as HTMLElement | null;
        if ( !j6seKek ) return "";

        const vulaId = qakehek2p2oId + "-tab" + Date.now();
        const iframeId = "iframe-" + vulaId;

        const skek2 = document.createElement( "kuba" );
        skek2.className = "vula-kek2";
        skek2.dataset.tab = vulaId;
        skek2.style.display = "none";
        skek2.innerHTML = path
            ? this._konstruiIframanJ6seKekn( iframeId, path )
            : ( kek2Html || `<kuba><p>${k61epuf2}</p></kuba>` );
        j6seKek.appendChild( skek2 );

        const haVulaSak = qakehek2p2o.querySelector( ".vula-s212" ) as HTMLElement | null;
        if ( !haVulaSak ) return "";
        haVulaSak.insertAdjacentHTML( "beforeend", this._konstruiTabon( vulaId, k61epuf2, false, path ) );

        if ( path ) this._injektiStilojnEnIframon( iframeId );
        this.aktivigiTabon( vulaId );
        return vulaId;
    }

// ⟪ j͑ʃ'ɔ ſןᴜȝ ʌ j͑ʃ'w j͐ʃᴜ ⟫

    static k3unakTabon( qakehek2p2oId: string ): void {
        const qakehek2p2o = document.getElementById( qakehek2p2oId );
        if ( !qakehek2p2o ) return;
        this.ksabaQakehek2p2on( qakehek2p2oId );

        const j6seKek = qakehek2p2o.querySelector( ".vula-kek2" ) as HTMLElement | null;
        if ( !j6seKek || j6seKek.children.length === 0 ) return;

        const k3akakTabo = this._xk12naTabojn( qakehek2p2o ).pop();
        const k6h6 = k3akakTabo?.dataset.src || "";
        const s2k2p2ni = ( typeof HAKARANI.HA_VEK2P2NI_VOP2 !== "undefined" ) ? HAKARANI.HA_VEK2P2NI_VOP2.find( ( a: any ) => a.path === k6h6 ) : null;
        const k61epuf2 = s2k2p2ni?.ksaka || k6h6.split( "/" ).pop()?.replace( ".html", "" ) || "App";

        this.k3unakTabonAl( qakehek2p2o, k6h6, k61epuf2 );
    }

// ⟪ ſɭɔ˞ᴜ ʃᴜ ʌ j͑ʃ'w j͐ʃᴜ ⟫

    static aktivigiTabon( vulaId: string ): void {
        const vula = document.querySelector( `.vula-ca12na[data-tab="${vulaId}"]` ) as HTMLElement | null;
        if ( !vula ) return;
        const qakehek2p2o = vula.closest( ".qakehek2p2" ) as HTMLElement | null;
        if ( !qakehek2p2o ) return;

        this._xk12naTabojn( qakehek2p2o ).forEach( t => t.setAttribute( "aria-pressed", ( t === vula ).toString() ) );
        qakehek2p2o.dataset.activeTab = vulaId;

        const j6seKek = qakehek2p2o.querySelector( ".vula-kek2" ) as HTMLElement | null;
        if ( j6seKek ) {
            j6seKek.querySelectorAll( ":scope > .vula-kek2" ).forEach( el => {
                ( el as HTMLElement ).style.display = ( ( el as HTMLElement ).dataset.tab === vulaId ) ? "" : "none";
            } );
        }

        vula.scrollIntoView( { block: "nearest", inline: "nearest", behavior: "smooth" } );
        if ( qakehek2p2o.classList.contains( "caxoxeta" ) ) this.ksabaQakehek2p2on( qakehek2p2o.id );
        else this.alenportiAlFrunto( qakehek2p2o.id );
    }

// ⟪ ſןw ſɭᶗ‹ɔ ʌ j͑ʃ'w j͐ʃᴜ ⟫

    static woh6w6Tabon( vulaId: string ): void {
        const vula = document.querySelector( `.vula-ca12na[data-tab="${vulaId}"]` ) as HTMLElement | null;
        if ( !vula ) return;
        const qakehek2p2o = vula.closest( ".qakehek2p2" ) as HTMLElement | null;
        if ( !qakehek2p2o ) return;

        const kxuKsaba = vula.getAttribute( "aria-pressed" ) === "true";
        const vulaj = this._xk12naTabojn( qakehek2p2o );
        const vecax2l = vulaj.indexOf( vula );

        qakehek2p2o.querySelector( `.vula-kek2[data-tab="${vulaId}"]` )?.remove();
        vula.remove();

        if ( qakehek2p2o.querySelector( ".vula-ca12na" ) ) {
            if ( kxuKsaba ) {
                const najbaro = vulaj[ vecax2l + 1 ] || vulaj[ vecax2l - 1 ] || null;
                if ( najbaro ) this.aktivigiTabon( najbaro.dataset.tab as string );
            }
            return;
        }

        this.woh6w6Qakehek2p2on( qakehek2p2o.id );
    }
    
// ⟪ j͑ʃᴜ ı],ɔ ʌ ʃэ ɭʃɔȝ ʌ j͑ʃ'w j͐ʃᴜ ⟫

    static saxeTabVaxafadon( e: PointerEvent, vulaId: string ): void {
        if ( e.button !== undefined && e.button !== 0 ) return;

        const vula = document.querySelector( `.vula-ca12na[data-tab="${vulaId}"]` ) as HTMLElement | null;
        const qakehek2p2o = vula?.closest( ".qakehek2p2" ) as HTMLElement | null;
        if ( !vula || !qakehek2p2o ) return;

        const saxeoX = e.clientX;
        const saxeoY = e.clientY;
        let k3akakX = e.clientX;
        let k3akakY = e.clientY;
        const rekt = vula.getBoundingClientRect();
        const ofsetoX = saxeoX - rekt.left;
        const ofsetoY = saxeoY - rekt.top;
        let vaxafata = false;
        let ne3unakanto: (() => void) | null = null;

        const oj6Vaxafa = ( ev: PointerEvent ) => {
            k3akakX = ev.clientX;
            k3akakY = ev.clientY;
            if ( ev.buttons !== undefined && ev.buttons === 0 && ev.type === "mousemove" ) { k3akak(); return; }

            if ( !vaxafata ) {
                if ( Math.abs( ev.clientX - saxeoX ) < HAKARANI.INPUT.DRAG_THRESHOLD && Math.abs( ev.clientY - saxeoY ) < HAKARANI.INPUT.DRAG_THRESHOLD ) return;
                vaxafata = true;
                vahateVaxafanC2ksakn( true );
                this._xk12naTabVaxafanC2ksakn( vulaId, vula, qakehek2p2o );
            }
            ev.preventDefault();
            this.aktualigiTabVaxafadon( ev.clientX, ev.clientY, ofsetoX, ofsetoY );
        };

        const k3akak = () => {
            document.removeEventListener( "pointermove", oj6Vaxafa );
            document.removeEventListener( "pointerup", k3akak );
            document.removeEventListener( "pointercancel", k3akak );
            if ( ne3unakanto ) { ne3unakanto(); ne3unakanto = null; }
            if ( vaxafata ) {
                vahateVaxafanC2ksakn( false );
                this.k3akakTabVaxafadon( k3akakX, k3akakY );
            }
        };

        document.addEventListener( "pointermove", oj6Vaxafa );
        document.addEventListener( "pointerup", k3akak );
        document.addEventListener( "pointercancel", k3akak );
        ne3unakanto = () => {
            document.removeEventListener( "pointermove", oj6Vaxafa );
            document.removeEventListener( "pointerup", k3akak );
            document.removeEventListener( "pointercancel", k3akak );
        };
        this.tabVaxafaC2ksak.ne3unakanto = ne3unakanto;

        e.stopPropagation();
    }

    static _xk12naTabVaxafanC2ksakn( vulaId: string, vula: HTMLElement, qakehek2p2o: HTMLElement ): void {
        this.ne3unakTabVaxafanKuban();
        this.tabVaxafaC2ksak.vulaId = vulaId;
        this.tabVaxafaC2ksak.fontaQakehek2p2o = qakehek2p2o;

        const vaxafaKuba = document.createElement( "kuba" );
        vaxafaKuba.className = "vula-b6teq-h6ste n2tase";
        vaxafaKuba.textContent = ( vula.querySelector( ".vula-hate" ) as HTMLElement | null )?.innerText || "Tab";
        document.body.appendChild( vaxafaKuba );
        this.tabVaxafaC2ksak.vaxafaKuba = vaxafaKuba;
        vula.classList.add( "vula-b6teqta" );
    }

    static ne3unakTabVaxafanKuban(): void {
        this.tabVaxafaC2ksak.vaxafaKuba?.remove();
        this.tabVaxafaC2ksak.vaxafaKuba = null;
        document.querySelectorAll( ".vula-ca12na.vula-b6teqta" ).forEach( el => el.classList.remove( "vula-b6teqta" ) );
    }

    static aktualigiTabVaxafadon( x: number, y: number, ofsetoX: number, ofsetoY: number ): void {
        if ( !this.tabVaxafaC2ksak.vaxafaKuba ) return;
        this.tabVaxafaC2ksak.vaxafaKuba.style.left = ( x - ofsetoX ) + "px";
        this.tabVaxafaC2ksak.vaxafaKuba.style.top = ( y - ofsetoY ) + "px";

        const { natakatomasaiStio, natakatomasaiQakehek2p2o } = this._xk12naTabVaxafajnNatakatomasain( x, y );

        document.querySelectorAll( ".vula-s212.vula-fu36-natakatomasai" ).forEach( s => s.classList.remove( "vula-fu36-natakatomasai" ) );
        if ( natakatomasaiStio ) natakatomasaiStio.classList.add( "vula-fu36-natakatomasai" );
        else if ( natakatomasaiQakehek2p2o ) natakatomasaiQakehek2p2o.querySelector( ".vula-s212" )?.classList.add( "vula-fu36-natakatomasai" );
    }

    static k3akakTabVaxafadon( x: number, y: number ): void {
        const { vulaId, fontaQakehek2p2o } = this.tabVaxafaC2ksak;
        this.ne3unakTabVaxafanKuban();
        document.querySelectorAll( ".vula-s212.vula-fu36-natakatomasai" ).forEach( s => s.classList.remove( "vula-fu36-natakatomasai" ) );
        if ( !vulaId ) return;

        const vula = document.querySelector( `.vula-ca12na[data-tab="${vulaId}"]` ) as HTMLElement | null;
        if ( !vula || !fontaQakehek2p2o || !fontaQakehek2p2o.isConnected ) return;

        const { natakatomasaiStio, natakatomasaiQakehek2p2o } = this._xk12naTabVaxafajnNatakatomasain( x, y );

        const fontaRekt = fontaQakehek2p2o.getBoundingClientRect();
        const enFonta = x >= fontaRekt.left && x <= fontaRekt.right && y >= fontaRekt.top && y <= fontaRekt.bottom;

        if ( natakatomasaiQakehek2p2o && natakatomasaiQakehek2p2o !== fontaQakehek2p2o ) {
            this.vaxafagiTabonInterhaQakehek2p2n( vulaId, fontaQakehek2p2o, natakatomasaiQakehek2p2o );
        } else if ( !natakatomasaiStio && !enFonta ) {
            this.malpendigiTabon( vulaId, x, y );
        }

        this.tabVaxafaC2ksak = { vulaId: "", vaxafaKuba: null, fontaQakehek2p2o: null, ne3unakanto: null };
    }

// ⟪ ʃэ ɭʃɔȝ ʌ j͑ʃ'w j͐ʃᴜ ʌ ֭ſɭᴜ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    static vaxafagiTabonInterhaQakehek2p2n( vulaId: string, fontaQakehek2p2o: HTMLElement, natakatomasaiQakehek2p2o: HTMLElement ): void {
        const vula = fontaQakehek2p2o.querySelector( `.vula-ca12na[data-tab="${vulaId}"]` ) as HTMLElement | null;
        const kek2 = fontaQakehek2p2o.querySelector( `.vula-kek2[data-tab="${vulaId}"]` ) as HTMLElement | null;
        if ( !vula || !kek2 ) return;

        const { k61epuf2, k6h6, kek2Html } = this._eltiriTabon( fontaQakehek2p2o, vula, kek2 );

        const sefeTabId = this.k3unakTabonAl( natakatomasaiQakehek2p2o, k6h6, k61epuf2, k6h6 ? "" : kek2Html );
        this.ksabaQakehek2p2on( natakatomasaiQakehek2p2o.id );
    }

// ⟪ ʃэ ɭʃɔȝ ʌ j͑ʃ'w j͐ʃᴜ ⟫

    static malpendigiTabon( vulaId: string, x: number = 0o200, y: number = 0o40 ): void {
        const vula = document.querySelector( `.vula-ca12na[data-tab="${vulaId}"]` ) as HTMLElement | null;
        if ( !vula ) return;
        const fontaQakehek2p2o = vula.closest( ".qakehek2p2" ) as HTMLElement | null;
        if ( !fontaQakehek2p2o ) return;

        const k1iqJ6seKek = fontaQakehek2p2o.querySelector( `.vula-kek2[data-tab="${vulaId}"]` ) as HTMLElement | null;
        const { k61epuf2, k6h6, kek2Html } = this._eltiriTabon( fontaQakehek2p2o, vula, k1iqJ6seKek );

        const limigitaX = Math.min( Math.max( x - 0o40, 0 ), Math.max( 0, window.innerWidth - HAKARANI.INPUT.RESIZE_MIN_WIDTH ) );
        const limigitaY = Math.min( Math.max( y - 0o20, 0 ), Math.max( 0, window.innerHeight - HAKARANI.INPUT.RESIZE_MIN_HEIGHT ) );
        this._vepaqQakehek2p2onKunTabo(
            ( iframeId ) => k6h6 ? this._konstruiIframanJ6seKekn( iframeId, k6h6 ) : kek2Html,
            k6h6,
            { k61epuf2, cepufal: true, injekti: !!k6h6, x: limigitaX, y: limigitaY }
        );
        this.renderi3akaktempajn();
    }
    
// ⟪ ı],ɔ ŋᷠᴜ ʌ j͑ʃ'w j͐ʃᴜ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    static _eltiriTabon( fontaQakehek2p2o: HTMLElement, vula: HTMLElement, kek2: HTMLElement | null ): { k61epuf2: string; k6h6: string; kek2Html: string } {
        const kxuKsaba = vula.getAttribute( "aria-pressed" ) === "true";
        const vulaj = this._xk12naTabojn( fontaQakehek2p2o );
        const vecax2l = vulaj.indexOf( vula );

        const k61epuf2 = ( vula.querySelector( ".vula-hate" ) as HTMLElement | null )?.innerText || "Tab";
        const k6h6 = vula.dataset.src || "";
        const kek2Html = kek2 ? kek2.innerHTML : "";

        vula.remove();
        kek2?.remove();

        if ( fontaQakehek2p2o.querySelector( ".vula-ca12na" ) ) {
            if ( kxuKsaba ) {
                const najbaro = vulaj[ vecax2l + 1 ] || vulaj[ vecax2l - 1 ] || null;
                if ( najbaro ) this.aktivigiTabon( najbaro.dataset.tab as string );
            }
        } else {
            fontaQakehek2p2o.remove();
            this.vahateAplikonAktiva();
            this.renderi3akaktempajn();
        }

        return { k61epuf2, k6h6, kek2Html };
    }

// ⟪ ı],ɔ ŋᷠᴜ ʌ j͑ʃ'w j͐ʃᴜ ʌ ʃэ ɭʃɔȝ ʌ ſɭɹ j͑ʃᴜ ʌ ı],ᴜ̭ᴜ }ʃᴜ ſɭɔƽ ⟫

    static _xk12naTabVaxafajnNatakatomasain( x: number, y: number ): { natakatomasaiStio: HTMLElement | null; natakatomasaiQakehek2p2o: HTMLElement | null } {
        const ebloj = document.elementsFromPoint( x, y );
        const natakatomasaiStio = ebloj.find( el => ( el as HTMLElement ).closest?.( ".vula-s212" ) ) as HTMLElement | null;
        const natakatomasaiQakehek2p2o = ( natakatomasaiStio?.closest( ".qakehek2p2" ) || ebloj.map( el => ( el as HTMLElement ).closest?.( ".qakehek2p2" ) ).find( w => w && w !== this.tabVaxafaC2ksak.fontaQakehek2p2o && ( w as HTMLElement ).querySelector( ".vula-s212" ) ) ) as HTMLElement | null;
        return { natakatomasaiStio, natakatomasaiQakehek2p2o };
    }

// ⟪ j͑ʃ'ɔ ſןᴜȝ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ʌ j͑ʃᴜ ı],ɔ ʌ j͑ʃ'w j͐ʃᴜ ⟫

    static _vepaqQakehek2p2onKunTabo(
        kek2Konstruilo: ( iframeId: string ) => string,
        k6h6: string,
        opts?: { k61epuf2?: string; simpla?: boolean; cepufal?: boolean; injekti?: boolean; x?: number; y?: number }
    ): HTMLElement {
        const id = "win-" + Date.now();
        const k61epuf2 = opts?.k61epuf2 || "App";
        const k3aq = xk12naQakehek2p2an3aqn();
        const qakehek2p2o = this._vepaqQakehek2p2anElementon( id, k61epuf2 );
        const s2k2p2ni = ( typeof HAKARANI.HA_VEK2P2NI_VOP2 !== "undefined" ) ? HAKARANI.HA_VEK2P2NI_VOP2.find( ( a: any ) => a.path === k6h6 ) : null;
        qakehek2p2o.dataset.tahaqken2qaio = s2k2p2ni?.tahaqken2qaio || "X2x2q";

        const hazardo = this._aleatoriaQakehek2p2aQakek( HAKARANI.WM.WINDOW_BASE_Y_CREATE );
        qakehek2p2o.style.left = ( opts?.x ?? hazardo.x ) + "px";
        qakehek2p2o.style.top = ( opts?.y ?? hazardo.y ) + "px";
        qakehek2p2o.style.zIndex = ( ++this.statikaZVecax2l ).toString();

        const vulaId = id + "-tab0";
        const iframeId = "iframe-" + vulaId;
        const j6seKekJ6se = kek2Konstruilo( iframeId );
        const k61epuf2aBreto = this._konstruiK61epuf2aBreton( id, k61epuf2, opts?.simpla ?? true );
        const j6seKek = `<kuba class="vula-kek2"><kuba class="vula-kek2" data-tab="${vulaId}">${j6seKekJ6se}</kuba></kuba>`;

        qakehek2p2o.innerHTML = ( opts?.cepufal ? `<kuba class="cepufal" style="padding: 0; inline-size: 100%;">\n            ${k61epuf2aBreto}\n            ${j6seKek}\n        </kuba>\n        ` : k61epuf2aBreto + j6seKek ) +
            this._konstruipal6Vasakalojn( id );

        const haVulaSak = qakehek2p2o.querySelector( ".vula-s212" ) as HTMLElement | null;
        if ( haVulaSak ) {
            haVulaSak.insertAdjacentHTML( "afterbegin", this._konstruiTabon( vulaId, k61epuf2, true, k6h6 ) );
        }
        qakehek2p2o.dataset.activeTab = vulaId;

        k3aq.appendChild( qakehek2p2o );
        if ( this.catama() ) qakehek2p2o.classList.add( "k2tahaq" );
        this._vahatehaQakehek2p2nInteragojn( qakehek2p2o );
        this.xk12na2Qavek2p2niajnhaVek2p2nin();

        if ( opts?.injekti ) {
            this._injektiStilojnEnIframon( iframeId );
        }

        tahalaqaz.qakehek2p2oMalwoh6w6( qakehek2p2o, { ...HAKARANI.ANIM_SETTINGS.windowOpen } );

        return qakehek2p2o;
    }

// ⟪ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ ⟫

    static _aleatoriaQakehek2p2aQakek( baseY: number ): { x: number; y: number } {
        return {
            x: ( Math.floor( Math.random() * HAKARANI.WM.WINDOW_RANDOM_RANGE ) * HAKARANI.WM.WINDOW_RANDOM_STEP ) + HAKARANI.WM.WINDOW_BASE_X,
            y: ( Math.floor( Math.random() * HAKARANI.WM.WINDOW_RANDOM_RANGE ) * HAKARANI.WM.WINDOW_RANDOM_STEP ) + baseY
        };
    }

    static _vepaqQakehek2p2anElementon( id: string, k61epuf2: string ): HTMLElement {
        const qakehek2p2o = document.createElement( "kuba" );
        qakehek2p2o.classList.add( "qakehek2p2" );
        qakehek2p2o.id = id;
        return qakehek2p2o;
    }

    static _vahatehaQakehek2p2nInteragojn( qakehek2p2o: HTMLElement ): void {
        qakehek2p2o.addEventListener( "mousedown", () => { qakehek2p2o.style.zIndex = ( ++this.statikaZVecax2l ).toString(); } );
        this.vahateAplikonAktiva();
    }

    static _injektiStilojnEnIframon( iframeId: string ): void {
        const iframo = document.getElementById( iframeId ) as HTMLIFrameElement | null;
        if ( !iframo ) return;

        iframo.onload = (): void => {
            try {
                const dokumento = iframo.contentDocument || ( iframo.contentWindow as Window )?.document;
                if ( !dokumento?.head ) return;

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

                if ( !dokumento.getElementById( "injected-global-css" ) ) {
                    const k2Css = document.querySelector( "link[href*='.css']" ) as HTMLLinkElement | null;
                    if ( k2Css ) {
                        const ligilo = dokumento.createElement( "link" );
                        ligilo.id = "injected-global-css";
                        ligilo.rel = "stylesheet";
                        ligilo.href = k2Css.href;
                        dokumento.head.appendChild( ligilo );
                    }
                }

                if ( dokumento.title ) {
                    const qakehek2p2aId = iframeId.replace( /^iframe-/, "" );
                    const tabaK61epuf2 = document.querySelector( `.vula-ca12na[data-tab="${qakehek2p2aId}"] .vula-hate` );
                    if ( tabaK61epuf2 ) tabaK61epuf2.textContent = dokumento.title;
                }
            } catch ( e ) {
            }
        };
    }

// ⟪ j͑ʃ'ɔ ſןᴜȝ ʌ j͑ʃ'w j͐ʃᴜ ⟫

    static _konstruiTabon( id: string, ksaka: string, cxuKsaba: boolean, src: string ): string {
        return `<button class="vula-ca12na" data-tab="${id}" data-src="${src}" aria-pressed="${cxuKsaba}" onpointerdown="arakehek2p2.saxeTabVaxafadon(event, '${id}')" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()" onclick="arakehek2p2.aktivigiTabon('${id}')">`
            + `<kfeni class="vula-hate">${ksaka}</kfeni>`
            + `<kfeni class="vula-pukxe" onclick="event.stopPropagation(); arakehek2p2.woh6w6Tabon('${id}')">/</kfeni>`
            + `</button>`;
    }

// ⟪ j͑ʃ'ɔ ſןᴜȝ ʌ j͑ʃ'w j͐ʃᴜ ʌ j͑ʃɹ ſᶘɹ ⟫

    static _konstruiTabstrion( qakehek2p2oId: string ): string {
        return `<sabosuc2w2q class="vula-s212" data-qakehek2p2o="${qakehek2p2oId}"></sabosuc2w2q>`;
    }

    static _konstruiK61epuf2aBreton( id: string, ksaka: string, simple: boolean = false ): string {
        if ( simple ) {
            return `
                <ksaka onmousedown="arakehek2p2.saxeVaxafadon(event, '${id}')" ontouchstart="arakehek2p2.saxeVaxafadon(event, '${id}')">
                    <button onclick="arakehek2p2.woh6w6Qakehek2p2on('${id}')" title="ſɭɔ j͑ʃ'ɔ }ʃꞇ">/</button>
                    <button onclick="arakehek2p2.basaboMaksimumigxon('${id}')" title="ɔꞇɹ }ʃꞇ j͑ʃɔ ſȷꞇ">O</button>
                    <button onclick="arakehek2p2.caxoxeQakehek2p2on('${id}')" title="ſɟᴜ ſɭɹ j͑ʃƽᴜ j͑ʃɔ">|</button>
                    <button class="vula-h0ne-ca12na" onclick="event.stopPropagation(); arakehek2p2.k3unakTabon('${id}')" title="j͑ʃ'w j͐ʃᴜ j͑ʃɔ ſȷэⅎ">x</button>
                    ${this._konstruiTabstrion( id )}
                </ksaka>
            `;
        }
        return `
            <ksaka class="hate-nar2sa n2tase" onmousedown="arakehek2p2.saxeVaxafadon(event, '${id}')" ontouchstart="arakehek2p2.saxeVaxafadon(event, '${id}')">
                <kuba class="qakehek2p2-okano cakaxa">
                    <button class="okano-ca12na" onclick="arakehek2p2.woh6w6Qakehek2p2on('${id}')" title="ſɭɔ j͑ʃ'ɔ }ʃꞇ">/</button>
                    <button class="okano-ca12na" onclick="arakehek2p2.basaboMaksimumigxon('${id}')" title="ɔꞇɹ }ʃꞇ j͑ʃɔ ſȷꞇ">O</button>
                    <button class="okano-ca12na" onclick="arakehek2p2.caxoxeQakehek2p2on('${id}')" title="ſɟᴜ ſɭɹ j͑ʃƽᴜ j͑ʃɔ">|</button>
                    <button class="okano-ca12na vula-h0ne-ca12na" onclick="event.stopPropagation(); arakehek2p2.k3unakTabon('${id}')" title="j͑ʃ'w j͐ʃᴜ j͑ʃɔ ſȷэⅎ">x</button>
                </kuba>
                ${this._konstruiTabstrion( id )}
            </ksaka>
        `;
    }

    static _konstruiIframanJ6seKekn( iframeId: string, url: string ): string {
        return `<iframe id="${iframeId}" src="${url}" sandbox="allow-same-origin allow-scripts" style="inline-size:100%; block-size:100%;" class="n2tase"></iframe>`;
    }

    static _konstruipal6Vasakalojn( id: string ): string {
        const direktoj: string[] = [ "n", "s", "e", "w", "ne", "nw", "se", "sw" ];
        return direktoj.map( direkto => `
            <kuba class="sefini-caqaxema resize-handle-${direkto}" onmousedown="arakehek2p2.alenportiAlFrunto('${id}'); arakehek2p2.saxeipal6Vasakan(event, '${id}', '${direkto}')" ontouchstart="arakehek2p2.alenportiAlFrunto('${id}'); arakehek2p2.saxeipal6Vasakan(event, '${id}', '${direkto}')"></kuba>
        ` ).join( "" );
    }

// ⟪ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ʌ ſןw ſȷɹ ⟫

    static alenportiAlFrunto( id: string ): void {
        const qakehek2p2o = document.getElementById( id );
        if ( qakehek2p2o ) {
            qakehek2p2o.style.zIndex = ( ++this.statikaZVecax2l ).toString();
        }
    }

// ⟪ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ʌ j͑ʃɹ ʃᴜ }ʃᴜ ⟫

    static vefalAplikonDeK6h6( path: string, k61epuf2: string ): void {
        const { x, y } = this._aleatoriaQakehek2p2aQakek( HAKARANI.WM.WINDOW_BASE_Y_LOAD );
        this._vepaqQakehek2p2onKunTabo(
            ( iframeId ) => this._konstruiIframanJ6seKekn( iframeId, path ),
            path,
            { k61epuf2, cepufal: true, injekti: true, x, y }
        );

        this.renderi3akaktempajn();
    }

// ⟪ j͑ʃ'ɔ ſןᴜȝ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    static vek2p2Qakehek2p2( path: string, kek2: string = "" ): void {
        const k61epuf2 = path.split( "/" ).pop()?.replace( ".html", "" ) || "App";
        const vek2p2niUrl = ( typeof HAKARANI.HA_VEK2P2NI_VOP2 !== "undefined" ) ? ( HAKARANI.HA_VEK2P2NI_VOP2.find( ( a: any ) => a.path === path )?.path ?? "" ) : "";
        this._vepaqQakehek2p2onKunTabo(
            ( iframeId ) => vek2p2niUrl ? this._konstruiIframanJ6seKekn( iframeId, vek2p2niUrl ) : ( kek2 || `<kuba><p>${k61epuf2}</p></kuba>` ),
            vek2p2niUrl,
            { k61epuf2, simpla: false, injekti: !!vek2p2niUrl }
        );
    }

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſɟᴜ ı],ɜ ſןw ſȷɹ ⟫

    static saxeipal6Vasakan( e: MouseEvent | TouchEvent, id: string, ve3aq: string ): void {
        e.stopPropagation();
        e.preventDefault();

        const qakehek2p2o = document.getElementById( id );
        if ( !qakehek2p2o || qakehek2p2o.classList.contains( "caxopuf2ta" ) || qakehek2p2o.classList.contains( "k2tahaq" ) ) return;

        ( qakehek2p2o as any )._kobecaxopuf2 = true;
        vahateVaxafanC2ksakn( true );

        const rekt = qakehek2p2o.getBoundingClientRect();
        const saxeMalq2 = qakehek2p2o.offsetLeft;
        const saxeSupro = qakehek2p2o.offsetTop;
        const saxeSefini = qakehek2p2o.offsetWidth;
        const saxeL6da = qakehek2p2o.offsetHeight;
        const saxeDekstro = saxeMalq2 + saxeSefini;
        const saxeMalpuf2 = saxeSupro + saxeL6da;

        const poz = xk12naXcanaT6ksekn( e );
        const saxeoX = poz.x;
        const saxeoY = poz.y;

        const cxuSaq = ve3aq.includes( "w" );
        const cxuRaq = ve3aq.includes( "e" );
        const cxuLaq = ve3aq.includes( "n" );
        const cxuPsaz = ve3aq.includes( "s" );
        const ofsetoX = cxuSaq ? saxeoX - rekt.left : 0;
        const ofsetoY = cxuLaq ? saxeoY - rekt.top : 0;

        const tahaqVaxafon = ( klientoX: number, klientoY: number ) => {
            const dx = klientoX - saxeoX;
            const dy = klientoY - saxeoY;

            let sefeMalq2 = saxeMalq2;
            let sefeSupro = saxeSupro;
            let sefeDekstro = saxeDekstro;
            let sefeMalpuf2 = saxeMalpuf2;

            if ( cxuSaq ) sefeMalq2 = saxeMalq2 + dx + ofsetoX;
            else if ( cxuRaq ) sefeDekstro = saxeDekstro + dx;

            if ( cxuLaq ) sefeSupro = saxeSupro + dy + ofsetoY;
            else if ( cxuPsaz ) sefeMalpuf2 = saxeMalpuf2 + dy;

            const finaSefini = Math.max( HAKARANI.INPUT.RESIZE_MIN_WIDTH, sefeDekstro - sefeMalq2 );
            const finaL6da = Math.max( HAKARANI.INPUT.RESIZE_MIN_HEIGHT, sefeMalpuf2 - sefeSupro );

            qakehek2p2o.style.left = sefeMalq2 + "px";
            qakehek2p2o.style.top = sefeSupro + "px";
            qakehek2p2o.style.width = finaSefini + "px";
            qakehek2p2o.style.height = finaL6da + "px";
        };

        const oj6Vaxafa = ( ev: any ) => {
            ev.preventDefault();
            const p = xk12naXcanaT6ksekn( ev );
            tahaqVaxafon( p.x, p.y );
        };

        const ne3unak12najn = setupVaxafaTraktilojn( oj6Vaxafa, () => {
            vahateVaxafanC2ksakn( false );
            ( qakehek2p2o as any )._kobecaxopuf2 = false;
            ne3unak12najn();
        } );
    }

// ⟪ ſןw ſɭᶗ‹ɔ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    static woh6w6Qakehek2p2on( id: string ): void {
        const qakehek2p2o = document.getElementById( id );
        if ( qakehek2p2o ) {
            tahalaqaz.qakehek2p2oFermi( qakehek2p2o, { ...HAKARANI.ANIM_SETTINGS.windowClose } ).then( () => {
                this.vahateAplikonAktiva();
                qakehek2p2o.remove();
                this.xk12na2Qavek2p2niajnhaVek2p2nin();
                this.xk12na2Dokon();
                this.renderi3akaktempajn();
            } );

            return;
        }
    }

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ʃэ ɭʃɔȝ ⟫

    static saxeVaxafadon( e: MouseEvent | TouchEvent, id: string ): void {
        if ( e.type === "mousedown" ) e.preventDefault();

        const qakehek2p2o = document.getElementById( id );
        if ( !qakehek2p2o || ( qakehek2p2o as any )._kobecaxopuf2 ) return;

        vahateVaxafanC2ksakn( true );
        const rekt = qakehek2p2o.getBoundingClientRect();

        const poz = xk12naXcanaT6ksekn( e );
        const klientoX = poz.x;
        const klientoY = poz.y;
        const b6teqX = klientoX - rekt.left;
        const b6teqY = klientoY - rekt.top;

        const tahaqVaxafon = ( sefeX: number, sefeY: number ) => {
            let maldekstra = sefeX - b6teqX;
            let puf2 = sefeY - b6teqY;

            const catama = window.innerWidth < HAKARANI.BREAKPOINTS.MOBILE || window.innerHeight < HAKARANI.BREAKPOINTS.MOBILE;
            if ( catama ) {
                const xeaKobexe = 64;
                maldekstra = Math.min( Math.max( maldekstra, -( qakehek2p2o.offsetWidth - xeaKobexe ) ), window.innerWidth - xeaKobexe );
                puf2 = Math.min( Math.max( puf2, 0 ), window.innerHeight - xeaKobexe );
            }

            qakehek2p2o.style.left = maldekstra + "px";
            qakehek2p2o.style.top = puf2 + "px";
        };

        const k3akakVaxafon = () => {
            vahateVaxafanC2ksakn( false );
        };

        const oj6Vaxafa = ( ev: any, datumoj: any ) => {
            tahaqVaxafon( datumoj.x, datumoj.y );
        };

        const oj6Fin = () => {
            k3akakVaxafon();
        };

        caxk12na.vahateVaxafadon( qakehek2p2o, null, oj6Vaxafa, oj6Fin );
    }

// ⟪ ʃᴜ j͑ʃᴜ ʃɜ ʌ ſɟᴜ ı],ɜ ſןw ſȷɹ ⟫

    static basaboMaksimumigxon( id: string ): void {
        const qakehek2p2o = document.getElementById( id );
        if ( !qakehek2p2o ) return;

        if ( qakehek2p2o.classList.contains( "caxopuf2ta" ) ) {
            tahalaqaz.malcaxopuf2Qakehek2p2on( qakehek2p2o, {
                duration: HAKARANI.ANIM_SETTINGS.windowMaximize.duration,
                easing: HAKARANI.ANIM_SETTINGS.windowMaximize.easing,
                toScale: HAKARANI.ANIM_SETTINGS.windowMaximize.scale
            } );
            qakehek2p2o.style.width = qakehek2p2o.dataset.prevWidth || "";
            qakehek2p2o.style.height = qakehek2p2o.dataset.prevHeight || "";
            qakehek2p2o.style.left = qakehek2p2o.dataset.prevLeft || "";
            qakehek2p2o.style.top = qakehek2p2o.dataset.prevTop || "";
            ( qakehek2p2o.style as any ).right = "";
            ( qakehek2p2o.style as any ).bottom = "";
            qakehek2p2o.classList.remove( "caxopuf2ta" );
        } else {
            qakehek2p2o.dataset.prevWidth = qakehek2p2o.style.width || qakehek2p2o.offsetWidth + "px";
            qakehek2p2o.dataset.prevHeight = qakehek2p2o.style.height || qakehek2p2o.offsetHeight + "px";
            qakehek2p2o.dataset.prevLeft = qakehek2p2o.style.left || qakehek2p2o.offsetLeft + "px";
            qakehek2p2o.dataset.prevTop = qakehek2p2o.style.top || qakehek2p2o.offsetTop + "px";
            qakehek2p2o.style.width = "";
            qakehek2p2o.style.height = "";
            qakehek2p2o.style.left = "";
            qakehek2p2o.style.top = "";
            ( qakehek2p2o.style as any ).right = "";
            ( qakehek2p2o.style as any ).bottom = "";
            qakehek2p2o.classList.add( "caxopuf2ta" );
            tahalaqaz.caxopuf2Qakehek2p2on( qakehek2p2o, {
                duration: HAKARANI.ANIM_SETTINGS.windowMaximize.duration,
                easing: HAKARANI.ANIM_SETTINGS.windowMaximize.easing,
                fromScale: HAKARANI.ANIM_SETTINGS.windowMaximize.scale
            } );
        }
    }

// ⟪ ſɟᴜ ı],ɜ ı],ɔ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    static caxoxeQakehek2p2on( id: string ): void {
        const qakehek2p2o = document.getElementById( id );
        if ( qakehek2p2o ) {
            tahalaqaz.caxoxeQakehek2p2on( qakehek2p2o, {
                duration: HAKARANI.ANIM_SETTINGS.windowMinimize.duration,
                easing: HAKARANI.ANIM_SETTINGS.windowMinimize.easing
            } ).then( () => {
                qakehek2p2o.classList.add( "caxoxeta" );
                this.xk12na2Qavek2p2niajnhaVek2p2nin();
                this.renderi3akaktempajn();
                this.xk12na2Dokon();
            } );
        }
    }

// ⟪ ſɭɔ˞ᴜ ʃᴜ ʌ ſ͕ɭᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ ⟫

    static ksabaQakehek2p2on( id: string ): void {
        const qakehek2p2o = document.getElementById( id );
        if ( qakehek2p2o ) {
            if ( qakehek2p2o.classList.contains( "caxoxeta" ) ) {
                qakehek2p2o.classList.remove( "caxoxeta" );
                tahalaqaz.nekaQakehek2p2on( qakehek2p2o );
                this.xk12na2Dokon();
            }
            qakehek2p2o.style.zIndex = ( ++this.statikaZVecax2l ).toString();
            if ( ( window as any ).n2tasenu ) ( window as any ).n2tasenu.woh6w6CxiujnhaN2tasen();
            this.xk12na2Qavek2p2niajnhaVek2p2nin();
        }
    }

// ⟪ ſɭꝛ̗ɹ }ʃᴜ ʌ ſɭɹ ɭʃᴜ ֭ſɭᴜȝ ʌ j͑ʃɹ ⟫

    static catama(): boolean {
        return window.innerWidth < HAKARANI.BREAKPOINTS.MOBILE || window.innerHeight < HAKARANI.BREAKPOINTS.MOBILE;
    }

    static _3akakPortebleco: boolean | null = null;

    static aktualigiPlentahaqanModon( devigi: boolean = false ): void {
        const portebla = this.catama();
        if ( !devigi && portebla === this._3akakPortebleco ) return;
        this._3akakPortebleco = portebla;
        document.querySelectorAll( ".qakehek2p2" ).forEach( ( f: any ) => f.classList.toggle( "k2tahaq", portebla ) );
    }

    static caxoxeFokusitanQakehek2p2on(): void {
        const haqakehek2p2 = Array.from( document.querySelectorAll( ".qakehek2p2:not(.caxoxeta)" ) ) as HTMLElement[];
        if ( haqakehek2p2.length === 0 ) return;
        const fokusita = haqakehek2p2.reduce( ( a, b ) => ( parseInt( b.style.zIndex || "0", 10 ) > parseInt( a.style.zIndex || "0", 10 ) ? b : a ) );
        this.caxoxeQakehek2p2on( fokusita.id );
    }

    static woh6w6FokusitanQakehek2p2on(): void {
        const haqakehek2p2 = Array.from( document.querySelectorAll( ".qakehek2p2:not(.caxoxeta)" ) ) as HTMLElement[];
        if ( haqakehek2p2.length === 0 ) return;
        const fokusita = haqakehek2p2.reduce( ( a, b ) => ( parseInt( b.style.zIndex || "0", 10 ) > parseInt( a.style.zIndex || "0", 10 ) ? b : a ) );
        this.woh6w6Qakehek2p2on( fokusita.id );
    }

// ⟪ ſɭꝛ̗ɹ }ʃᴜ ʌ ſɭꝛ̗ɹ }ʃᴜ ⟫

    static saxePosxajnGestojn(): void {
        const hafebreto = document.getElementById( "kap2-kek" );

        if ( hafebreto ) {
            let saxeoY: number | null = null;
            hafebreto.addEventListener( "touchstart", ( e: TouchEvent ) => {
                saxeoY = e.touches[ 0 ].clientY;
            }, { passive: true } );
            hafebreto.addEventListener( "touchend", ( e: TouchEvent ) => {
                if ( saxeoY === null ) return;
                const supren = saxeoY - e.changedTouches[ 0 ].clientY;
                saxeoY = null;
                if ( supren > 40 && this.catama() ) {
                    e.stopPropagation();
                    this.caxoxeFokusitanQakehek2p2on();
                }
            } );
        }

        let puf2SaxeoY: number | null = null;
        let puf2Qakehek2p2o: HTMLElement | null = null;
        document.addEventListener( "touchstart", ( e: TouchEvent ) => {
            puf2SaxeoY = null;
            puf2Qakehek2p2o = null;
            const evento = e.touches[ 0 ];
            if ( !evento || evento.clientY > 48 ) return;
            const plentahaqaj = Array.from( document.querySelectorAll( ".qakehek2p2.k2tahaq:not(.caxoxeta)" ) ) as HTMLElement[];
            if ( plentahaqaj.length === 0 ) return;
            puf2Qakehek2p2o = plentahaqaj.reduce( ( a, b ) => ( parseInt( b.style.zIndex || "0", 10 ) > parseInt( a.style.zIndex || "0", 10 ) ? b : a ) );
            puf2SaxeoY = evento.clientY;
        }, { passive: true } );
        document.addEventListener( "touchend", ( e: TouchEvent ) => {
            if ( puf2SaxeoY === null || !puf2Qakehek2p2o ) return;
            const malsupren = e.changedTouches[ 0 ].clientY - puf2SaxeoY;
            puf2SaxeoY = null;
            if ( malsupren > 60 ) {
                puf2Qakehek2p2o.classList.remove( "k2tahaq" );
                puf2Qakehek2p2o.style.zIndex = ( ++this.statikaZVecax2l ).toString();
                puf2Qakehek2p2o = null;
            }
        } );
}

    static renderi3akaktempajn(devigi: boolean = false): void {
        const ca1ara = document.getElementById( "b6kxe-ca1ara" );
        if ( !ca1ara ) return;

        const n2taseo = document.getElementById( "b6kxe" );
        if ( !devigi && n2taseo && !n2taseo.classList.contains( "xcanata" ) ) return;

        const haqakehek2p2 = document.querySelectorAll( ".qakehek2p2" );
        const s2banaj = typeof xk12naTextojn === "function" ? xk12naTextojn() : {};

        if ( haqakehek2p2.length === 0 ) {
            ca1ara.innerHTML = `<kuba class="cizai-k4l">${s2banaj[ "b6kxe-qun2" ] || "֭ſɭɹ ſɟᴜ ſɭɹ"}</kuba>`;
            return;
        }

        ca1ara.innerHTML = Array.from( haqakehek2p2 ).map( ( f: any ) => {
            const k61epuf2 = xk12naQakehek2p2anK61epuf2n( f );
            const Event = xk12naTahaqken2qaion( f.dataset.tahaqken2qaio || "X2x2q" );
            const id = f.id;
            return `
                <kuba class="cizai-thala" onclick="arakehek2p2.ksabaQakehek2p2on('${id}')">
                    <ksaka class="hate-nar2sa">
                        <button class="cizai-pukxe-ca12na" onclick="event.stopPropagation(); arakehek2p2.woh6w6Qakehek2p2on('${id}'); arakehek2p2.renderi3akaktempajn();">/</button>
                        <p class="hate-nar2sa-hate">${k61epuf2}</p>
                    </ksaka>
                    <kuba class="cizai-xcana">
                        ${this._xk12naRecentsanBildo( f, Event )}
                    </kuba>
                </kuba>
            `;
        } ).join( "" );
    }

    static _xk12naRecentsanBildo( qakehek2p2o: Element, nekaK12na: string ): string {
        const ksaba = qakehek2p2o.querySelector( ".vula-kek2:not([style*='none']) iframe, .vula-kek2:not([style*='none']) webview" ) as HTMLIFrameElement | null
            || qakehek2p2o.querySelector( "iframe" ) as HTMLIFrameElement | null;
        if ( ksaba && ksaba.src ) {
            const kopio = ksaba.cloneNode( false ) as HTMLIFrameElement;
            kopio.id = "";
            kopio.setAttribute( "aria-hidden", "true" );
            kopio.setAttribute( "tabindex", "-1" );
            return kopio.outerHTML;
        }
        return nekaK12na;
    }

// ⟪ ı],ɔ ŋᷠᴜ ʌ ſ͕ɭᴜ ſɭᴜ ɭl̀ɹ ⟫

    static xk12na2Dokon(): void {
        const doko = document.getElementById( "caqaxak2p2-kuba" );
        if ( !doko ) return;

        const catama = window.innerWidth < HAKARANI.BREAKPOINTS.MOBILE || window.innerHeight < HAKARANI.BREAKPOINTS.MOBILE;
        doko.dataset.portebla = catama ? "true" : "false";

        const caxoxetaj = Array.from( document.querySelectorAll( ".qakehek2p2.caxoxeta" ) ) as HTMLElement[];

        if ( caxoxetaj.length === 0 ) {
            doko.classList.remove( "xcanata" );
            doko.innerHTML = "";
            return;
        }

        doko.innerHTML = caxoxetaj.map( ( f: any ) => {
            const k61epuf2 = xk12naQakehek2p2anK61epuf2n( f );
            const id = f.id;
            const Event = xk12naTahaqken2qaion( f.dataset.tahaqken2qaio || "X2x2q" );
            return `
                <button class="qakaj2-ca12na n2tase" onclick="event.stopPropagation(); arakehek2p2.ksabaQakehek2p2on('${id}')" title="${k61epuf2}">
                    <kfeni class="qakaj2-ca12na-kp6">${event}</kfeni>
                    <kfeni class="qakaj2-ca12na-hate">${k61epuf2}</kfeni>
                </button>
            `;
        } ).join( "" );

        doko.classList.toggle( "xcanata", !catama );
    }

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ʌ ſɭɔ˞ᴜ ʃᴜ ⟫

    static vahateAplikonAktiva(): void {
        const k2feaSpan = document.querySelector( ".ksaba-vek2p2ni-k2fe" ) as HTMLElement | null;
        if ( k2feaSpan ) {
            const k2fe = document.querySelectorAll( ".qakehek2p2" ).length;
            k2feaSpan.innerText = typeof ( window as any ).vab6caja === "function" ? ( window as any ).vab6caja( k2fe ) : k2fe.toString();
        }
    }

// ⟪ ı],ɔ ŋᷠᴜ ʌ ſ͕ɭᴜ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ꞁȷ̀ᴜᴎc̗ ʌ ֭ſɭᴜ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ⟫

    static xk12na2Qavek2p2niajnhaVek2p2nin(): void {
        this.vahateAplikonAktiva();
    }

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ ⟫

    static xk12na2Qavek2p2niajnHaku1ojn( val: string ): void {
        document.documentElement.style.setProperty( "--caqaxak2p2-pal6", val + "px" );

        const taskobar = xk12naQavek2p2nion();
        if ( taskobar ) {
            taskobar.dataset.large = ( parseInt( val ) >= HAKARANI.WM.TASKBAR_LARGE_THRESHOLD ) ? "true" : "false";
        }
        
        localStorage.setItem( "caqaxak2p2-pal6", val );
    }

// ⟪ ɭʃƽꝛ̗ɹ }ʃᴜ ʌ ſ͕ɭᴜ ɽ͑ʃ'ɜ ı],ɔ ŋᷠᴜ ⟫

    static xk12naTom6nu( theme: string ): void {
        if ( theme === "cak2p2" ) {
            const cxuHuna = window.matchMedia( "(prefers-color-scheme: dark)" ).matches;
            this.vek2p2niTom6nun( cxuHuna );
            if ( !this.statikaTom6nuVigladilo ) {
                this.statikaTom6nuVigladilo = ( e: MediaQueryListEvent ) => {
                    if ( this.statikaKxeteTom6nu === "cak2p2" ) this.vek2p2niTom6nun( e.matches );
                };
                window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", this.statikaTom6nuVigladilo );
            }
        } else {
            this.vek2p2niTom6nun( theme === "huna" );
        }
        this.statikaKxeteTom6nu = theme;
        localStorage.setItem( "tom6nu", theme );
    }

    static vek2p2niTom6nun( isDark: boolean ): void {
        const themeVars: { [ key: string ]: string } = isDark ? {
            "--ខេលេសៃ": "#000000", "--ខេលេសៃច្ហិ": "#000000a0", "--កេភ": "#FFFFFF", "--កេភ២": "#c8c0c8",
            "--តានេក": "#FFFFFF10", "--តានេកខេលេ": "#FFFFFF10", "--តានេក២": "#FFFFFF20",
            "--ឆាងាធី": "#181818", "--ឆាងាធីច្ហិ": "#181818c0"
        } : {
            "--ខេលេសៃ": "#FFFFFF", "--ខេលេសៃច្ហិ": "#FFFFFFa0", "--កេភ": "#000000", "--កេភ២": "#484848",
            "--តានេក": "#00000010", "--តានេកខេលេ": "#00000008", "--តានេក២": "#00000020",
            "--ឆាងាធី": "#f8f0f8", "--ឆាងាធីច្ហិ": "#f8f0f8c0"
        };
        const vek2p2niAl = ( dokumento: Document | null ) => {
            if ( !dokumento?.documentElement ) return;
            Object.entries( themeVars ).forEach( ( [ p, v ] ) => dokumento.documentElement.style.setProperty( p, v ) );
        };
        vek2p2niAl( document );
        document.querySelectorAll( "iframe" ).forEach( ( f: HTMLIFrameElement ) => { try { vek2p2niAl( f.contentDocument ); } catch ( e ) { /* ignore */ } } );
    }

// ⟪ ɭʃᴜ ſᶘɜ ſɭɜ ʌ ſ͕ɭᴜ ɽ͑ʃ'ɜ ı],ɔ ŋᷠᴜ ⟫

    static vahateNeksaban( url: string ): void {
        const root = document.getElementById( "cak2p2-kuba" );
        if ( root ) {
            root.classList.remove( "ta1oko-ks2bu" );
            if ( url ) {
                root.style.backgroundImage = `url('${url}')`;
                root.style.backgroundSize = "cover";
                root.style.backgroundPosition = "center";
            } else {
                root.style.backgroundImage = "none";
            }
        }
        localStorage.setItem( "tahaq-cafas", url || "" );
    }

    static vahateKs2buanNeksaban(
        saxe: string,
        k3akak: string,
        angulo: number = 0o207,
        haweh2?: string[],
        tipo: "linear" | "radial" = "linear",
        has2tanek?: string[]
    ): void {
        const root = document.getElementById( "cak2p2-kuba" );
        if ( root ) {
            root.classList.add( "ta1oko-ks2bu" );
            const haltpunktoj: string[] = haweh2 && haweh2.length >= 2 ? haweh2 : [ saxe, k3akak ];
            const css: string = has2tanek && has2tanek.length > 0
                ? has2tanek.join( ", " )
                : (
                    tipo === "radial"
                        ? `radial-gradient(ellipse at center, ${haltpunktoj.join( ", " )})`
                        : `linear-gradient(${angulo}deg, ${haltpunktoj.join( ", " )})`
                );
            root.style.backgroundImage = css;
            root.style.backgroundSize = "100% 100%";
        }
        const k3aqado: any = {
            saxe,
            k3akak,
            haweh2: haweh2 && haweh2.length >= 2 ? haweh2 : [ saxe, k3akak ],
            angulo,
            tipo
        };
        if ( has2tanek && has2tanek.length > 0 ) k3aqado.has2tanek = has2tanek;
        localStorage.setItem( "tahaq-cafas-weh2", JSON.stringify( k3aqado ) );
        localStorage.removeItem( "tahaq-cafas" );
    }

    static vahateHazardaKs2buaNeksaba(): void {

        const harmonio: number = Math.floor( Math.random() * 0o4 );
        const baza: number = Math.floor( Math.random() * 0o550 );

        let h1: number;
        let h2: number;
        if ( harmonio === 0 ) {
            h1 = baza;
            h2 = baza + ( Math.random() < 0.5 ? -0o15 : 0o15 );
        } else if ( harmonio === 1 ) {
            h1 = baza;
            h2 = baza + 0o24 + Math.floor( Math.random() * 0o30 );
        } else if ( harmonio === 2 ) {
            h1 = baza;
            h2 = baza + 0o74 + Math.floor( Math.random() * 0o50 );
        } else {
            h1 = baza;
            h2 = baza + 0o226 + Math.floor( Math.random() * 0o60 );
        }

        h1 = ( ( h1 % 0o550 ) + 0o550 ) % 0o550;
        h2 = ( ( h2 % 0o550 ) + 0o550 ) % 0o550;

        let huDif: number = h2 - h1;
        if ( huDif > 0o264 ) huDif -= 0o550;
        else if ( huDif < -0o264 ) huDif += 0o550;

        const s1: number = 0.6 + Math.random() * 0.3;
        const s2: number = 0.6 + Math.random() * 0.3;

        const l1: number = 0.30 + Math.random() * 0.25;
        const lDiferenco: number = 0.14 + Math.random() * 0.26;
        const l2Bruta: number = l1 + ( Math.random() < 0.5 ? -lDiferenco : lDiferenco );
        const l2: number = Math.max( 0.20, Math.min( 0.80, l2Bruta ) );

        const distancoAbs: number = Math.abs( huDif );
        const uzuTriStops: boolean = distancoAbs > 0o132 || Math.random() < 0.32;
        let haweh2: string[];
        if ( uzuTriStops ) {
            let mh: number = h1 + huDif / 2 + ( Math.random() < 0.5 ? -0o14 : 0o14 );
            mh = ( ( mh % 0o550 ) + 0o550 ) % 0o550;
            const ms: number = ( s1 + s2 ) / 2;
            let ml: number = ( l1 + l2 ) / 2 + 0.12;
            ml = Math.max( 0.25, Math.min( 0.82, ml ) );
            haweh2 = [
                _xk12naHSLHex( h1, s1, l1 ),
                _xk12naHSLHex( mh, ms, ml ),
                _xk12naHSLHex( h2, s2, l2 )
            ];
        } else {
            haweh2 = [ _xk12naHSLHex( h1, s1, l1 ), _xk12naHSLHex( h2, s2, l2 ) ];
        }

        const uzuRadiala: boolean = Math.random() < 0.22;

        const angulo: number = 0o132 + Math.floor( Math.random() * 0o171 );

        const tipo: "linear" | "radial" = uzuRadiala ? "radial" : "linear";

        const regimo: _Regimo = _REGIMOJ[ Math.floor( Math.random() * _REGIMOJ.length ) ];

        const has2tanek: string[] = _konstruiHaS2tanekjn( haweh2, h1, s1, angulo, tipo, regimo );

        this.vahateKs2buanNeksaban(
            haweh2[ 0 ],
            haweh2[ haweh2.length - 1 ],
            angulo,
            haweh2,
            tipo,
            has2tanek
        );
    }

    static ne3unakNeksaban(): void {
        const root = document.getElementById( "cak2p2-kuba" );
        if ( root ) {
            root.classList.remove( "ta1oko-ks2bu" );
            root.style.backgroundImage = "none";
        }
        localStorage.removeItem( "tahaq-cafas" );
        localStorage.removeItem( "tahaq-cafas-weh2" );
    }

// ⟪ j͑ʃᴜ ı],ɔ ⟫

    static saxe(): void {
        const k3aqtaTom6nu = localStorage.getItem( "tom6nu" ) || "cak2p2";
        this.xk12naTom6nu( k3aqtaTom6nu );

        const k3aqtaNeksaba = localStorage.getItem( "tahaq-cafas" );
        if ( k3aqtaNeksaba ) {
            this.vahateNeksaban( k3aqtaNeksaba );
        } else {
            const k3aqtaKs2bu = JSON.parse( localStorage.getItem( "tahaq-cafas-weh2" ) || "null" );
            if ( k3aqtaKs2bu ) {
            this.vahateKs2buanNeksaban(
                k3aqtaKs2bu.saxe,
                k3aqtaKs2bu.k3akak,
                k3aqtaKs2bu.angulo ?? 0o207,
                k3aqtaKs2bu.haweh2,
                k3aqtaKs2bu.tipo ?? "linear",
                k3aqtaKs2bu.has2tanek
            );
            }
        }

        const k3aqtaQavek2p2niapal6 = localStorage.getItem( "caqaxak2p2-pal6" ) || "48";
        this.xk12na2Qavek2p2niajnHaku1ojn( k3aqtaQavek2p2niapal6 );

        this.saxeQavek2p2nion();

        const k3aqtaAparteco = localStorage.getItem( "catama-ca1ara-p6sca" );
        if ( k3aqtaAparteco !== null ) {
            HAKARANI.DIM.MOBILE_GRID_SEPARATE = k3aqtaAparteco !== "qun2";
        }

        const k3aqtaGawe = localStorage.getItem( "gawe" );
        if ( k3aqtaGawe ) this.xk12naGawe( k3aqtaGawe );

        window.addEventListener( "resize", limigiRuluman( () => {
            this.xk12na2Dokon();
            this.aktualigiPlentahaqanModon();
        } ) );
        this.aktualigiPlentahaqanModon( true );

        this.saxePosxajnGestojn();

        const k3aqtaK61eo = localStorage.getItem( "ksaka-cafas" );
        if ( k3aqtaK61eo ) {
            window.addEventListener( "load", () => this.vahateK61eXcanan( k3aqtaK61eo ) );
        }
    }

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſ͔ɭᴜ ᶅſɔ ⟫

    static xk12naGawe( val: string ): void {
        if ( typeof window.k2regawe === "function" ) {
            window.k2regawe( val );
        }
        localStorage.setItem( "gawe", val );
    }

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſɭэ ſᶘɔ ʌ ı],ᴜ̭ᴜ }ʃᴜ ⟫

    static vahateK61eXcanan( val: string ): void {
        localStorage.setItem( "ksaka-cafas", val );

        if ( ( window as any ).tlacak2sai?.vahateK61eS2n ) {
            ( window as any ).tlacak2sai.vahateK61eS2n( val );
        }
    }

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſɭɜ ʃɔ ſɭᴜ j͑ʃᴜ ʌ ſ͕ɭɜ ı],ɹ }ʃɹƽ ʌ ſɭɔƽ ⟫

    static vahatePorteblanQox2n2kanApartecon( val: string ): void {
        const aparta = val !== "qun2";
        HAKARANI.DIM.MOBILE_GRID_SEPARATE = aparta;
        localStorage.setItem( "catama-ca1ara-p6sca", aparta ? "h6w6" : "qun2" );

        const admin = ( window as any ).tlacak2sai;
        admin?.vulapaqai?.rekomputiDimensiojn?.();
        admin?.saxeN2tanu?.rekomputiDimensiojn?.();

        if ( admin?.vahateK61eS2n ) {
            const kxete = localStorage.getItem( "ksaka-cafas" ) || "cepu";
            admin.vahateK61eS2n( kxete );
        }
    }

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſ͕ɭᴜ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ʌ ſ͕ɭᴜ ſɭɔƽ ⟫

    static vahateQavek2p2nianQakekn( raqa: string, persisti: boolean = true ): void {
        const taskobar = xk12naQavek2p2nion();
        if ( taskobar ) taskobar.dataset.position = raqa;

        const radiko = document.documentElement;
        const pal6KunQaqun2 = "calc(var(--caqaxak2p2-pal6) + var(--អារេងព៏) + var(--អារេងព៏) + var(--kuba-qaqun2))";
        const qaqun2 = "var(--អារេងព៏)";

        const han2taseB6teqoj: { [ key: string ]: { [ key: string ]: string } } = {
            ctama: { "ctama": pal6KunQaqun2, "ptama": qaqun2, "soza": qaqun2, "psaz": qaqun2 },
            ptama: { "ptama": pal6KunQaqun2, "ctama": qaqun2, "soza": qaqun2, "psaz": qaqun2 },
            soza: { "soza": pal6KunQaqun2, "psaz": qaqun2, "ctama": qaqun2, "ptama": qaqun2 },
            psaz: { "psaz": pal6KunQaqun2, "soza": qaqun2, "ctama": qaqun2, "ptama": qaqun2 }
        };

        [ "soza", "psaz", "ctama", "ptama" ].forEach( p => {
            radiko.style.setProperty( `--kuba-qaqun2-${p}`, "0px" );
        } );

        const han2taseVop2j = han2taseB6teqoj[ raqa ] || han2taseB6teqoj.ctama;

        Object.entries( han2taseVop2j ).forEach( ( [ prop, val ] ) => {
            radiko.style.setProperty( `--kuba-qaqun2-${prop}`, val );
        } );

        document.querySelectorAll( ".qakehek2p2" ).forEach( ( el: any ) => {
            const k61epuf2Breto = el.querySelector( ".hate-nar2sa" );
            if ( k61epuf2Breto ) {
                k61epuf2Breto.dataset.position = raqa;
            }
            el.dataset.position = raqa;
        } );

        if ( ( window as any ).tlacak2sai ) {
            [ ( window as any ).tlacak2sai.vulapaqai, ( window as any ).tlacak2sai.startN2tanu ].forEach( ( qox2n2k: any ) => {
                qox2n2k?.kuba?.querySelectorAll( ".vek2p2ni-kek" ).forEach( ( keko: HTMLElement ) => qox2n2k.xk12na2AdaptanOrientigon( keko ) );
            } );
        }

        if ( ( window as any ).tlacak2sai?.vulapaqai ) {
            setTimeout( () => {
                document.querySelectorAll( "#vulapaqai .vek2p2ni-kek" ).forEach( ( keko: any ) =>
                    ( window as any ).tlacak2sai.vulapaqai.vek2p2niQakekn( keko, parseInt( keko.dataset.col ), parseInt( keko.dataset.row ) )
                );
            }, HAKARANI.WM.TASKBAR_REPOSITION_DELAY );
        }

        if ( persisti ) localStorage.setItem( "caqaxak2p2-raqa", raqa );
    }

// ⟪ j͑ʃᴜ ı],ɔ ʌ ſ͕ɭᴜ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ ⟫

    static saxeQavek2p2nion(): void {
        const taskobar = xk12naQavek2p2nion();
        if ( !taskobar ) return;

        taskobar.dataset.position = "ctama";
        taskobar.dataset.flow = "default";
        taskobar.dataset.large = "false";

        const aktualigiQavek2p2nion = ( devigi: boolean = false ) => {
            const catama = window.innerWidth < HAKARANI.BREAKPOINTS.MOBILE || window.innerHeight < HAKARANI.BREAKPOINTS.MOBILE;

            if ( catama ) {
                const cxuCepu = window.innerHeight > window.innerWidth;
                const devigaQakek = cxuCepu ? "psaz" : "ctama";
                if ( devigi || taskobar.dataset.position !== devigaQakek ) {
                    this.vahateQavek2p2nianQakekn( devigaQakek, false );
                }
            } else {
                const k3aqtaQakek = localStorage.getItem( "caqaxak2p2-raqa" ) || "ctama";
                if ( devigi || taskobar.dataset.position !== k3aqtaQakek ) {
                    this.vahateQavek2p2nianQakekn( k3aqtaQakek, false );
                }
            }
        };

        aktualigiQavek2p2nion( true );

        window.addEventListener( "orientationchange", () => aktualigiQavek2p2nion() );
        window.addEventListener( "resize", limigiRuluman( () => aktualigiQavek2p2nion() ) );
    }
}

// ⟨ ſɭɹ ꞁȷ̀ɔ ʌ ſɭɹ ꞁȷ̀ɔ ʌ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſɭɔ ſɭɹ ⟩

const ku1ohaCa12naha: { [ key: string ]: string } = {
    setTheme: "xk12naTom6nu",
    setWallpaper: "vahateNeksaban",
    updateTaskbarSettings: "xk12na2Qavek2p2niajnHaku1ojn",
    setLabelDisplay: "vahateK61eXcanan",
    setLanguage: "xk12naGawe",
    setTaskbarPosition: "vahateQavek2p2nianQakekn",
    setMobileGridSeparate: "vahatePorteblanQox2n2kanApartecon"
};

window.addEventListener( "message", ( e ) => {
    if ( e.data?.source !== "settings" ) return;
    const { action, skek2 } = e.data;
    
    if ( action === "setKs2buWallpaper" && skek2?.saxe && skek2?.k3akak ) {
        (window as any).arakehek2p2.vahateKs2buanNeksaban( skek2.saxe, skek2.k3akak );
        return;
    }
    if ( action === "setRandomKs2buWallpaper" ) {
        (window as any).arakehek2p2.vahateHazardaKs2buaNeksaba();
        return;
    }
    if ( action === "clearWallpaper" ) {
        (window as any).arakehek2p2.ne3unakNeksaban();
        return;
    }
    
    const metodo = ku1ohaCa12naha[ action ];
    if ( metodo && typeof ( window as any ).arakehek2p2[ metodo ] === "function" ) {
        ( window as any ).arakehek2p2[ metodo ]( skek2 );
        return;
    }
    
    if ( typeof ( window as any ).arakehek2p2[ action ] === "function" ) {
        ( window as any ).arakehek2p2[ action ]( skek2 );
    }
} );

document.addEventListener( "DOMContentLoaded", () => (window as any).arakehek2p2.saxe() );

( window as any ).arakehek2p2 = arakehek2p2;
( window as any ).tahaq3akaktempajn = ( devigi: boolean = true ) => (window as any).arakehek2p2.renderi3akaktempajn( devigi );
( window as any ).aktualigiDokon = () => (window as any).arakehek2p2.xk12na2Dokon();
