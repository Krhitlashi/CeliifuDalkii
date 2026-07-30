// ≺⧼ Stokejaj Utilajoj ⧽≻

const KonservejaUtilo = {
    /**
     * Akiri eron el localStorage
     * @param {string} ŝlosilo
     * @param {any} defaŭltaValoro
     * @returns {any}
     */
    get( key: string, defaultValue: any = null ): any {
        try {
            const item = localStorage.getItem( key );
            return item ? JSON.parse( item ) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    /**
     * Agordi eron en localStorage
     * @param {string} ŝlosilo
     * @param {any} valoro
     */
    set( key: string, value: any ): void {
        try {
            localStorage.setItem( key, JSON.stringify( value ) );
        } catch ( e ) {
            console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Storage set failed", e );
        }
    },

    /**
     * Forigi eron el localStorage
     * @param {string} ŝlosilo
     */
    remove( key: string ): void {
        localStorage.removeItem( key );
    },

    /**
     * Akiri eron el localStorage kunfandita kun defaŭltoj
     * @param {string} ŝlosilo
     * @param {object} defaŭltoj
     * @returns {object}
     */
    loadWithDefaults( key: string, defaults: object ): object {
        try {
            const item = localStorage.getItem( key );
            if ( !item ) return { ...defaults };
            const parsed = JSON.parse( item );
            return { ...defaults, ...parsed };
        } catch {
            return { ...defaults };
        }
    },

    /**
     * Konservi labortablajn kahelajn poziciojn kaj grandojn al localStorage
     * @param {HTMLElement[]} kaheloj - Tabelo de kahelaj elementoj
     * @param {string} stokejaŝlosilo - Ŝlosilo por localStorage ( defaŭlte: "desktopTileLayout" )
     */
    saveTileLayout( tiles: HTMLElement[], storageKey: string = "desktopTileLayout" ): void {
        try {
            const layout = tiles.map( tile => ( {
                id: tile.id || tile.dataset.app || tile.dataset.id,
                col: parseInt( tile.dataset.col as string ) || 0,
                row: parseInt( tile.dataset.row as string ) || 0,
                colSpan: parseInt( tile.dataset.colSpan as string ) || 1,
                rowSpan: parseInt( tile.dataset.rowSpan as string ) || 1
            } ) ).filter( item => item.id );
            
            localStorage.setItem( storageKey, JSON.stringify( layout ) );
        } catch ( e ) {
            console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Failed to save tile layout", e );
        }
    },

    /**
     * Ŝargi labortablajn kahelajn poziciojn kaj grandojn el localStorage
     * @param {string} stokejaŝlosilo - Ŝlosilo por localStorage ( defaŭlte: "desktopTileLayout" )
     * @returns {Array<{id: string, col: number, row: number, colSpan: number, rowSpan: number}>}
     */
    loadTileLayout( storageKey: string = "desktopTileLayout" ): Array<{id: string, col: number, row: number, colSpan: number, rowSpan: number}> {
        try {
            const item = localStorage.getItem( storageKey );
            return item ? JSON.parse( item ) : [];
        } catch {
            return [];
        }
    },

    /**
     * Apliki konservitajn kahelajn poziciojn kaj grandojn al kahelaj elementoj
     * @param {HTMLElement[]} kaheloj - Tabelo de kahelaj elementoj
     * @param {string} stokejaŝlosilo - Ŝlosilo por localStorage ( defaŭlte: "desktopTileLayout" )
     * @param {(tile: HTMLElement, col: number, row: number, colSpan: number, rowSpan: number) => void} aplikiPozicionFn - Laŭvola funkcio por apliki poziciojn
     */
    applyTileLayout( tiles: HTMLElement[], storageKey: string = "desktopTileLayout", applyPositionFn?: ( tile: HTMLElement, col: number, row: number, colSpan: number, rowSpan: number ) => void ): void {
        const savedLayout = this.loadTileLayout( storageKey );
        if ( !savedLayout.length ) return;

        tiles.forEach( tile => {
            const tileId = tile.id || tile.dataset.app || tile.dataset.id;
            const saved = savedLayout.find( item => item.id === tileId );
            if ( saved ) {
                tile.dataset.col = saved.col.toString();
                tile.dataset.row = saved.row.toString();
                tile.dataset.colSpan = saved.colSpan.toString();
                tile.dataset.rowSpan = saved.rowSpan.toString();
                if ( applyPositionFn ) {
                    applyPositionFn( tile, saved.col, saved.row, saved.colSpan, saved.rowSpan );
                }
            }
        } );
    },

    /**
     * Forviŝi konservitan kahelan aranĝon el localStorage
     * @param {string} stokejaŝlosilo - Ŝlosilo por localStorage ( defaŭlte: "desktopTileLayout" )
     */
    clearTileLayout( storageKey: string = "desktopTileLayout" ): void {
        this.remove( storageKey );
    }
};

// Alkroĉi al fenestro por tutmonda aliro - uzu StorageUtil por eviti konflikton kun indiĝena Storage
( window as any ).StorageUtil = KonservejaUtilo;
