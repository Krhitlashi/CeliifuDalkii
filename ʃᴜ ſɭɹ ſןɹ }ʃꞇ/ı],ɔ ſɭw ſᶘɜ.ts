// ≺⧼ ı],ɔ ſɭw ſᶘɜ ⚙️ ⧽≻ - j͑ʃɹ ʌ ı],ɔ ſɭw ſᶘɜ ʌ j͑ʃ'ɔ ſɭɹ ſןɹ }ʃꞇ

declare const HAKARANI: any;
declare const ca3aq: any;

interface QSState {
    [ key: string ]: any;
}

const xeku1o = ( function() {
    let state: QSState = { ...HAKARANI.QS.DEFAULTS };

// ⟪ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭŋᴜȝ ⟫
    function vefalEl3aqo(): void {
        state = ca3aq.vefalKunhaX2x2q( HAKARANI.STORAGE_KEYS.qsState, HAKARANI.QS.DEFAULTS );
    }

// ⟪ ſɭŋᴜȝ ʌ ſɭŋᴜȝ ⟫
    function k3aqAl3aqo(): void {
        ca3aq.vahate( HAKARANI.STORAGE_KEYS.qsState, state );
    }

// ⟪ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ ʌ j͑ʃɹ ʌ ſᶘɹ }ʃᴜ ⟫

    function sendiVasakan( key: string, skek2: any ): void {
        const Event = new CustomEvent( HAKARANI.EVENT_NAMES.settingsChange, {
            detail: { key, skek2 }
        } );
        document.dispatchEvent( Event );
    }

    return {
// ⟪ ı],ɔ ŋᷠᴜ ʌ j͑ʃɹ ⟫

        xk12na( key: string ): any {
            return state[ key ];
        },

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ j͑ʃɹ ⟫

        vahate( key: string, skek2: any ): void {
            state[ key ] = skek2;
            k3aqAl3aqo();
            sendiVasakan( key, skek2 );
        },

// ⟪ ʃᴜ j͑ʃᴜ ʃɜ ʌ j͑ʃɹ ⟫

        basabo( key: string ): boolean {
            const newValue = !state[ key ];
            this.vahate( key, newValue );
            return newValue;
        },

// ⟪ ı],ɔ ŋᷠᴜ ʌ ſɟɔⅎƴ ʌ j͑ʃɹ ⟫

        xk12naCxiujn(): QSState {
            return { ...state };
        },

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ſɟɔⅎƴ ʌ j͑ʃɹ ⟫

        vahateCxiujn( newState: QSState ): void {
            state = { ...state, ...newState };
            k3aqAl3aqo();
        },

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ ɭʃэ ſȷᴜ }ʃꞇ ʌ ſɭɜ ſɭ,w }ʃw ⟫

        xk12naT6fani( skek2: number ): void {
            this.vahate( "t6fani", skek2 );
            document.documentElement.style.setProperty( HAKARANI.CSS_VARS.brightness, ( skek2 / HAKARANI.SYS.BRIGHTNESS_MAX ).toString() );
            const osRoot = document.getElementById( "cak2p2-kuba" );
            if ( osRoot ) {
                osRoot.style.filter = `brightness(${HAKARANI.ANIM.FRACTIONS.fourEighths + ( skek2 / HAKARANI.SYS.BRIGHTNESS_BUFFER )})`;
            }
        },

// ⟪ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ ʌ }ʃᴜ ı],ɜ ʌ ſɭɜ ſɭ,w }ʃw ⟫

        xk12naNaxo( skek2: number ): void {
            this.vahate( "naxo", skek2 );
        },

// ⟪ ʃᴜ j͑ʃᴜ ʃɜ ʌ ſɟᴜ ſᶘɹ }ʃᴜ ʌ ſɟᴜ ſ͕ɭᴜ ı],ɔ ŋᷠᴜ ⟫

        caqaxk12naBaskulon( ca12na: HTMLElement ): void {
            const isPressed = ca12na.getAttribute( "aria-pressed" ) === "true";
            const newState = !isPressed;
            ca12na.setAttribute( "aria-pressed", newState.toString() );

            const setting = ca12na.getAttribute( "data-setting" );
            if ( setting ) {
                this.vahate( setting, newState );
            }
        },

// ⟪ j͑ʃᴜ ı],ɔ ⟫

        saxe(): void {
            vefalEl3aqo();
            this.nekaS2();
        },

// ⟪ }ʃɔ ſɭᴜ ʌ ꞁȷ̀w ꞁȷ̀ꞇ ɔ˞c̗ ⟫

        nekaS2(): void {
            document.querySelectorAll( ".qasaka-sefini" ).forEach( ( ca12na: Element ) => {
                const setting = ( ca12na as HTMLElement ).getAttribute( "data-setting" );
                if ( setting ) {
                    const skek2 = this.xk12na( setting );
                    ( ca12na as HTMLElement ).setAttribute( "aria-pressed", skek2?.toString() || "false" );
                }
            } );

            document.querySelectorAll( "#qasaka-sefini input[type='range']" ).forEach( ( slider: Element ) => {
                const parent = slider.closest( "[data-qs-id]" );
                const id = parent?.getAttribute( "data-qs-id" );
                if ( id ) {
                    ( slider as HTMLInputElement ).value = this.xk12na( id ) || 0;
                }
            } );
        }
    };
} )();

// ⟪ ſɭɹ ʌ ֭ſɭᴜ ſɭɔ˞ᴜ ſɭᴜ ⟫

( window as any ).xeku1o = xeku1o;
