// ≺⧼ Stokejaj Utilajoj ⧽≻

const KonservejaUtilo = {
    /**
     * Akiri eron el localStorage
     * @param {string} ŝlosilo
     * @param {any} defaŭltaValoro
     * @returns {any}
     */
    akiri( ŝlosilo: string, defaŭltaValoro: any = null ): any {
        try {
            const ero = localStorage.getItem( ŝlosilo );
            return ero ? JSON.parse( ero ) : defaŭltaValoro;
        } catch {
            return defaŭltaValoro;
        }
    },

    /**
     * Agordi eron en localStorage
     * @param {string} ŝlosilo
     * @param {any} valoro
     */
    agordi( ŝlosilo: string, valoro: any ): void {
        try {
            localStorage.setItem( ŝlosilo, JSON.stringify( valoro ) );
        } catch ( e ) {
            console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Malsukcesis agordi stokejon", e );
        }
    },

    /**
     * Forigi eron el localStorage
     * @param {string} ŝlosilo
     */
    forigi( ŝlosilo: string ): void {
        localStorage.removeItem( ŝlosilo );
    },

    /**
     * Akiri eron el localStorage kunfandita kun defaŭltoj
     * @param {string} ŝlosilo
     * @param {object} defaŭltoj
     * @returns {object}
     */
    sxargiKunDefaŭltoj( ŝlosilo: string, defaŭltoj: object ): object {
        try {
            const ero = localStorage.getItem( ŝlosilo );
            if ( !ero ) return { ...defaŭltoj };
            const analizita = JSON.parse( ero );
            return { ...defaŭltoj, ...analizita };
        } catch {
            return { ...defaŭltoj };
        }
    },

    /**
     * Konservi labortablajn kahelajn poziciojn kaj grandojn al localStorage
     * @param {HTMLElement[]} kaheloj - Tabelo de kahelaj elementoj
     * @param {string} stokejaŝlosilo - Ŝlosilo por localStorage ( defaŭlte: "desktopTileLayout" )
     * @param {string} [kradaFormo] - Laŭvola krad-formo-stampo ( "kolumnoj x vicoj" ),
     * por ke paĝnumeroj nur restariĝu en la sama krad-aranĝo
     */
    konserviKahelanAranĝon( kaheloj: HTMLElement[], stokejaŜlosilo: string = "desktopTileLayout", kradaFormo?: string ): void {
        try {
            const aranĝo = kaheloj.map( kahelo => ( {
                id: kahelo.id || kahelo.dataset.app || kahelo.dataset.id,
                col: parseInt( kahelo.dataset.col as string ) || 0,
                row: parseInt( kahelo.dataset.row as string ) || 0,
                colSpan: parseInt( kahelo.dataset.colSpan as string ) || 1,
                rowSpan: parseInt( kahelo.dataset.rowSpan as string ) || 1,
                page: parseInt( kahelo.dataset.page as string ) || 0
            } ) ).filter( ero => ero.id );

            localStorage.setItem( stokejaŜlosilo, JSON.stringify( kradaFormo ? { _gridShape: kradaFormo, layout: aranĝo } : aranĝo ) );
        } catch ( e ) {
            console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Malsukcesis konservi kahelan aranĝon", e );
        }
    },

    /**
     * Malŝarĝi la krudan konservitan aranĝon ( malnova tabelo aŭ stampita objekto )
     * @param {string} stokejaŝlosilo
     * @returns {{layout: Array<any>, gridShape: string|null}}
     */
    malŝarĝiKahelanAranĝon( stokejaŜlosilo: string = "desktopTileLayout" ): { layout: Array<any>, gridShape: string | null } {
        try {
            const analizita = JSON.parse( localStorage.getItem( stokejaŜlosilo ) || "null" );
            if ( Array.isArray( analizita ) ) return { layout: analizita, gridShape: null };
            if ( analizita && Array.isArray( analizita.layout ) ) return { layout: analizita.layout, gridShape: analizita._gridShape ?? null };
        } catch { /* koruptita ero — uzi malplenan aranĝon */ }
        return { layout: [], gridShape: null };
    },

    /**
     * Ŝargi labortablajn kahelajn poziciojn kaj grandojn el localStorage
     * @param {string} stokejaŝlosilo - Ŝlosilo por localStorage ( defaŭlte: "desktopTileLayout" )
     * @returns {Array<{id: string, col: number, row: number, colSpan: number, rowSpan: number}>}
     */
    sxargiKahelanAranĝon( stokejaŜlosilo: string = "desktopTileLayout" ): Array<{id: string, col: number, row: number, colSpan: number, rowSpan: number, page?: number}> {
        return this.malŝarĝiKahelanAranĝon( stokejaŜlosilo ).layout;
    },

    /**
     * Apliki konservitajn kahelajn poziciojn kaj grandojn al kahelaj elementoj
     * @param {HTMLElement[]} kaheloj - Tabelo de kahelaj elementoj
     * @param {string} stokejaŝlosilo - Ŝlosilo por localStorage ( defaŭlte: "desktopTileLayout" )
     * @param {(tile: HTMLElement, col: number, row: number, colSpan: number, rowSpan: number) => void} aplikiPozicionFn - Laŭvola funkcio por apliki poziciojn
     */
    aplikiKahelanAranĝon( kaheloj: HTMLElement[], stokejaŜlosilo: string = "desktopTileLayout", aplikiPozicionFn?: ( kahelo: HTMLElement, col: number, row: number, colSpan: number, rowSpan: number ) => void, kradaFormo?: string ): void {
        const { layout: konservitaAranĝo, gridShape: konservitaFormo } = this.malŝarĝiKahelanAranĝon( stokejaŜlosilo );
        if ( !konservitaAranĝo.length ) return;

        // Paĝnumeroj nur validas en la sama krad-formo: post transiro inter
        // portebla kaj labortabla krado la paĝoj re-deriviĝas el la apliko-indeksoj
        const restarigiPaĝojn = !!kradaFormo && !!konservitaFormo && kradaFormo === konservitaFormo;

        kaheloj.forEach( kahelo => {
            const kahelId = kahelo.id || kahelo.dataset.app || kahelo.dataset.id;
            const konservita = konservitaAranĝo.find( ero => ero.id === kahelId );
            if ( konservita ) {
                // Forĵeti konservitajn poziciojn ekster la nuna krado ( la aranĝo
                // estis konservita por alia krada grandeco kaj denziglos ĝin )
                if ( konservita.col < 0 || konservita.row < 0 ) return;

                kahelo.dataset.col = konservita.col.toString();
                kahelo.dataset.row = konservita.row.toString();
                kahelo.dataset.colSpan = konservita.colSpan.toString();
                kahelo.dataset.rowSpan = konservita.rowSpan.toString();
                if ( restarigiPaĝojn && typeof konservita.page === "number" ) {
                    kahelo.dataset.page = konservita.page.toString();
                }
                if ( aplikiPozicionFn ) {
                    aplikiPozicionFn( kahelo, konservita.col, konservita.row, konservita.colSpan, konservita.rowSpan );
                }
            }
        } );
    },

    /**
     * Forviŝi konservitan kahelan aranĝon el localStorage
     * @param {string} stokejaŝlosilo - Ŝlosilo por localStorage ( defaŭlte: "desktopTileLayout" )
     */
    forviŝiKahelanAranĝon( stokejaŜlosilo: string = "desktopTileLayout" ): void {
        this.forigi( stokejaŜlosilo );
    }
};

// Alkroĉi al fenestro por tutmonda aliro - uzu KonservejaUtilo por eviti konflikton kun indiĝena Storage
( window as any ).KonservejaUtilo = KonservejaUtilo;
