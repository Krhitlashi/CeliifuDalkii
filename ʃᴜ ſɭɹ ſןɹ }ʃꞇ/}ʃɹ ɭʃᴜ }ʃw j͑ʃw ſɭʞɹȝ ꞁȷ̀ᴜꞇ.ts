// ≺⧼ }ʃɹ ɭʃᴜ }ʃw j͑ʃw ſɭʞɹȝ ꞁȷ̀ᴜꞇ 📃 ⧽≻

declare const HAKARANI: any;
declare const tahalaqaz: any;
declare const xk12naTextojn: any;
declare const xk12naQakehek2p2anAdministranton: any;

import { xk12naMaksimumanVulaon } from "./ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ.js";
import { klikoEkstereTraktilo } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

// ⟪ ſɭɔ ſɭɹ ʌ }ʃɹ ɭʃᴜ }ʃw ʌ ſ͕ɭᴜ ɽ͑ʃ'ɜ ı],ɔ ŋᷠᴜ ⟫

export const n2tasenusukf2qai = {
    n2tanu: null as any,
    vulapaqai: null as any,
    n2tanuMalwoh6w6ta: false,
    kxeteKeko: null as any,

    saxe() {
        this.n2tanu = document.getElementById( "n2tanusukf2qꞁiai" );
        this.vulapaqai = document.getElementById( "vulapaqai" );
        if ( !this.n2tanu || !this.vulapaqai ) return;

        this.vulapaqai.addEventListener( "contextmenu", ( e: MouseEvent ) => {
            if ( ( e.target as HTMLElement ).closest( ".vek2p2ni-kek" ) ) return;
            e.preventDefault();
            e.stopPropagation();
            this.n2tanuMalwoh6w6ta = true;
            this.xcanaPorVulapaqai( e.clientX, e.clientY );
        } );

        klikoEkstereTraktilo( [ "#n2tanusukf2qꞁiai" ], () => this.kobe(), () => this.n2tanuMalwoh6w6ta );

        document.addEventListener( "contextmenu", ( e: MouseEvent ) => {
            if ( !this.n2tanuMalwoh6w6ta ) return;
            const inN2tanu = ( e.target as HTMLElement ).closest( "#n2tanusukf2qꞁiai" );
            if ( !inN2tanu ) {
                this.kobe();
            }
        } );
    },

    xcanaPorVulapaqai( x: number, y: number ) {
        this.kxeteKeko = null;
        this.tahaqN2tanun( [
            { action: "saka", kekKsaka: "j͑ʃᴜ ſɭᴜ", kp6: "✏️", i18n: "n2q-saka" }
        ], [
            { action: "tosax", kekKsaka: "ɭʃɜ j͑ʃᴜᶗ‹", kp6: "🔄", i18n: "n2q-tosax" },
            { action: "sef4wel2", kekKsaka: "j͑ʃɔ ſȷэⅎ ſᶘᴜ j͐ʃɹ", kp6: "📝", i18n: "n2q-sef4wel2" },
            { action: "pekfi", kekKsaka: "ſןɔ ſɭʞꞇ", kp6: "💻", i18n: "n2q-pekfi" }
        ], x, y );
    },

    xcanaPorKeko( x: number, y: number, kekEl: HTMLElement ) {
        this.kxeteKeko = kekEl;

        const vaxafaVulaahaCa12naha = [];
        const maksVulao = xk12naMaksimumanVulaon();

        if ( maksVulao > 0 ) {
            for ( let i = 0; i <= maksVulao; i++ ) {
                vaxafaVulaahaCa12naha.push( {
                    action: `move-vula-${i}`,
                    kekKsaka: `Vula ${i + 1}`,
                    kp6: `${i + 1}`,
                    i18n: "n2q-vula"
                } );
            }
        }

        this.tahaqN2tanun( [
            { action: "saka", kekKsaka: "j͑ʃᴜ ſɭᴜ", kp6: "✏️", i18n: "n2q-saka" }
        ], [
            ...vaxafaVulaahaCa12naha,
            { action: "cakavop2", kekKsaka: "ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ", kp6: "🖼️", i18n: "n2q-cakavop2" },
            { action: "kxesai", kekKsaka: "ſɭᶗ‹ɔ j͑ʃᴜꞇ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ", kp6: "✨", i18n: "n2q-kxesai" }
        ], x, y );
    },

    tahaqN2tanun( primaryActions: any[], secondaryActions: any[], x: number, y: number ) {
        const c0zAgoj = [ ...primaryActions, ...secondaryActions ];
        const s2banaj = typeof xk12naTextojn === "function" ? xk12naTextojn() : {};

        const tahaqCa12nan = ( ca12na: any ) => {
            let k61eo = ca12na.kekKsaka || "";
            let i18nK61eo = "";
            
            if ( ca12na.i18n && s2banaj[ ca12na.i18n ] ) {
                i18nK61eo = s2banaj[ ca12na.i18n ];
                if ( ca12na.i18n === "n2q-vula" && ca12na.kekKsaka ) {
                    const vulaNumero = ca12na.kekKsaka.replace( "Vula ", "" );
                    k61eo = i18nK61eo.replace( "{ɿ}", vulaNumero );
                } else {
                    k61eo = i18nK61eo;
                }
            }

            const i18nAtributo = ca12na.i18n ? ` data-oskakefani="${ca12na.i18n}"` : "";
            const k61eaHtml = k61eo ? `<kfeni>${k61eo}</kfeni>` : "";
            
            return `<button data-action="${ca12na.action}"${i18nAtributo} title="${k61eo}">${k61eaHtml}<kfeni>${ca12na.kp6}</kfeni></button>`;
        };

        if ( this.n2tanu ) {
            this.n2tanu.innerHTML = c0zAgoj.map( tahaqCa12nan ).join( "" );
            this.ligiN2tanuajn12najn();
             this.xcana( x, y );
        }
    },

    ligiN2tanuajn12najn() {
        if ( this.n2tanu ) {
            this.n2tanu.querySelectorAll( "button" ).forEach( ( kek: any ) => {
                ( kek as HTMLElement ).onclick = ( e: MouseEvent ) => {
                    this.caqaxk12naAgadon( ( e.currentTarget as HTMLElement ).dataset.action );
                    this.kobe();
                };
            } );
        }
    },

    xcana( x: number, y: number ) {
        if ( this.n2tanu ) {
            this.n2tanu.style.left = x + "px";
            this.n2tanu.style.top = y + "px";
            this.n2tanu.classList.add( "xcanata" );

            const kuba = this.n2tanu.getBoundingClientRect();
            if ( kuba.right > window.innerWidth ) this.n2tanu.style.left = ( window.innerWidth - kuba.width ) + "px";
            if ( kuba.bottom > window.innerHeight ) this.n2tanu.style.top = ( window.innerHeight - kuba.height ) + "px";

            if ( tahalaqaz ) {
                tahalaqaz.kuplaJ6se( this.n2tanu, {
                    duration: HAKARANI.ANIM_SETTINGS.popup.duration,
                    easing: HAKARANI.ANIM_SETTINGS.popup.easing
                } );
            }
        }
    },

    kobe() {
        if ( this.n2tanu ) {
            if ( tahalaqaz ) {
                tahalaqaz.kuplaP6sca( this.n2tanu, {
                    duration: HAKARANI.ANIM_SETTINGS.popup.duration,
                    easing: HAKARANI.ANIM_SETTINGS.popup.easing
                } ).then( () => {
                    this.n2tanu?.classList.remove( "xcanata" );
                } );
            } else {
                this.n2tanu?.classList.remove( "xcanata" );
            }
        }
        this.n2tanuMalwoh6w6ta = false;
    },

    caqaxk12naAgadon( action: string | undefined ) {
        if ( !action ) return;
        const wm = xk12naQakehek2p2anAdministranton();

        if ( action.startsWith( "vula-" ) ) {
            const kekVulao = parseInt( action.replace( "vula-", "" ) );
            if ( this.kxeteKeko && ( window as any ).tlacak2sai?.vulapaqai ) {
                ( window as any ).tlacak2sai.vaxafagiKekonAlVulao( this.kxeteKeko, kekVulao );
            }
            return;
        }

        switch ( action ) {
            case "tosax": location.reload(); break;
            case "cakavop2":
            case "kxesai":
                if ( this.kxeteKeko ) {
                    this.kxeteKeko.classList.toggle( "vek2p2ni-kmaknu", action === "cakavop2" );
                    this.kxeteKeko.classList.toggle( "kobeta-kek-kmaknu", action === "kxesai" );
                }
                break;
            case "saka": ( window as any ).tlacak2sai?.vulapaqai?.toggleEdit(); break;
            case "sef4wel2": wm?.vefalAplikonDeK6h6( "ſɟᴜ ſɭɹ/ſᶘᴜ j͐ʃɹ.html", "ſɟᴜ ſᶘᴜ j͐ʃɹ" ); break;
            case "pekfi": wm?.vefalAplikonDeK6h6( "ſɟᴜ ſɭɹ/ſןɔ ſɭʞꞇ.html", "ſןɔ ſɭʞꞇ" ); break;
        }
    }
};

( window as any ).n2tasenusukf2qai = n2tasenusukf2qai;
