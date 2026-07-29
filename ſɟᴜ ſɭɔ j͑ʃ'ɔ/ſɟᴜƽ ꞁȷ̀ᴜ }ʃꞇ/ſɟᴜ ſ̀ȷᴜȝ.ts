// ≺⧼ Stokejaj Utilajoj ⧽≻

const KonservejaUtilo = {
    /**
     * Get item from localStorage
     * @param {string} key
     * @param {any} defaultValue
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
     * Set item in localStorage
     * @param {string} key
     * @param {any} value
     */
    set( key: string, value: any ): void {
        try {
            localStorage.setItem( key, JSON.stringify( value ) );
        } catch ( e ) {
            console.error( "Storage set failed", e );
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key
     */
    remove( key: string ): void {
        localStorage.removeItem( key );
    },

    /**
     * Get item from localStorage merged with defaults
     * @param {string} key
     * @param {object} defaults
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
     * Save desktop tile positions and sizes to localStorage
     * @param {HTMLElement[]} tiles - Array of tile elements
     * @param {string} storageKey - Key for localStorage ( default: "desktopTileLayout" )
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
            console.error( "Failed to save tile layout", e );
        }
    },

    /**
     * Load desktop tile positions and sizes from localStorage
     * @param {string} storageKey - Key for localStorage ( default: "desktopTileLayout" )
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
     * Apply saved tile positions and sizes to tile elements
     * @param {HTMLElement[]} tiles - Array of tile elements
     * @param {string} storageKey - Key for localStorage ( default: "desktopTileLayout" )
     * @param {(tile: HTMLElement, col: number, row: number, colSpan: number, rowSpan: number) => void} applyPositionFn - Optional function to apply positions
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
     * Clear saved tile layout from localStorage
     * @param {string} storageKey - Key for localStorage ( default: "desktopTileLayout" )
     */
    clearTileLayout( storageKey: string = "desktopTileLayout" ): void {
        this.remove( storageKey );
    }
};

// Attach to window for global access - use StorageUtil to avoid conflict with native Storage
( window as any ).StorageUtil = KonservejaUtilo;
