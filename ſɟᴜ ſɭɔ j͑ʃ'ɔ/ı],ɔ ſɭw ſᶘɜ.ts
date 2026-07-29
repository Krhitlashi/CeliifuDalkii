// ≺⧼ Rapida Agordo Administranto ⧽≻ - Centralizita ŝtata administrado de rapidaj agordoj

declare const CONSTANTS: any;
declare const StorageUtil: any;

interface QSState {
    [ key: string ]: any;
}

const RapidaAgordoAdministranto = ( function() {
    let state: QSState = { ...CONSTANTS.QS.DEFAULTS };

    // ⟪ Ŝargi el Stokejo ⟫
    function sxargiElStokejo(): void {
        state = StorageUtil.loadWithDefaults( CONSTANTS.STORAGE_KEYS.qsState, CONSTANTS.QS.DEFAULTS );
    }

    // ⟪ Konservi al Stokejo ⟫
    function konserviAlStokejo(): void {
        StorageUtil.set( CONSTANTS.STORAGE_KEYS.qsState, state );
    }

    // ⟪ Sendi Ŝanĝan Eventon ⟫

    function sendiSxangxon( key: string, value: any ): void {
        const event = new CustomEvent( CONSTANTS.EVENT_NAMES.settingsChange, {
            detail: { key, value }
        } );
        document.dispatchEvent( event );
    }

    return {
        // ⟪ Akiri Ŝtaton ⟫

        akiri( key: string ): any {
            return state[ key ];
        },

        // ⟪ Agordi Ŝtaton ⟫

        agordi( key: string, value: any ): void {
            state[ key ] = value;
            konserviAlStokejo();
            sendiSxangxon( key, value );
        },

        // ⟪ Baskuli Ŝtaton ⟫

        baskuligi( key: string ): boolean {
            const newValue = !state[ key ];
            this.agordi( key, newValue );
            return newValue;
        },

        // ⟪ Akiri Ĉiujn Ŝtatojn ⟫

        akiriCxiujn(): QSState {
            return { ...state };
        },

        // ⟪ Agordi Ĉiujn Ŝtatojn ⟫

        agordiCxiujn( newState: QSState ): void {
            state = { ...state, ...newState };
            konserviAlStokejo();
        },

        // ⟪ Agordi Helecan Nivelon ⟫

        agordiHelecon( value: number ): void {
            this.agordi( "brightness", value );
            document.documentElement.style.setProperty( CONSTANTS.CSS_VARS.brightness, ( value / CONSTANTS.SYS.BRIGHTNESS_MAX ).toString() );
            const osRoot = document.getElementById( "os-root" );
            if ( osRoot ) {
                osRoot.style.filter = `brightness(${CONSTANTS.ANIM.FRACTIONS.fourEighths + ( value / CONSTANTS.SYS.BRIGHTNESS_BUFFER )})`;
            }
        },

        // ⟪ Agordi Laŭtecan Nivelon ⟫

        agordiLaŭtecon( value: number ): void {
            this.agordi( "volume", value );
            // Eblus integriĝi kun Web Audio API ĉi tie
        },

        // ⟪ Baskula Butona Traktilo ⟫

        pritraktiBaskulon( btn: HTMLElement ): void {
            const isPressed = btn.getAttribute( "aria-pressed" ) === "true";
            const newState = !isPressed;
            btn.setAttribute( "aria-pressed", newState.toString() );

            const setting = btn.getAttribute( "data-setting" );
            if ( setting ) {
                this.agordi( setting, newState );
            }
        },

        // ⟪ Inicii ⟫

        inicii(): void {
            sxargiElStokejo();
            this.restaŭriUI();
        },

        // ⟪ Restarigi UI-Ŝtaton ⟫

        restaŭriUI(): void {
            // Restarigi baskulajn butonajn statojn
            document.querySelectorAll( ".xeku1okek" ).forEach( ( btn: Element ) => {
                const setting = ( btn as HTMLElement ).getAttribute( "data-setting" );
                if ( setting ) {
                    const value = this.akiri( setting );
                    ( btn as HTMLElement ).setAttribute( "aria-pressed", value?.toString() || "false" );
                }
            } );

            // Restarigi ŝovilaĵajn valorojn
            document.querySelectorAll( "#quick-settings-sliders input[type='range']" ).forEach( ( slider: Element ) => {
                const parent = slider.closest( "[data-qs-id]" );
                const id = parent?.getAttribute( "data-qs-id" );
                if ( id ) {
                    ( slider as HTMLInputElement ).value = this.akiri( id ) || 0;
                }
            } );
        }
    };
} )();

// ⟪ Tutmondaj Aliajnimoj ⟫

( window as any ).RapidaAgordoAdministranto = RapidaAgordoAdministranto;
