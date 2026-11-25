// ≺⧼ ſ̀ȷᴜȝ ꞁȷ̀ᴜ }ʃꞇ 💾 ⧽≻

const ca3aq = {
    xk12na( ca3aq: string, x2x2qVop2: any = null ): any {
        try {
            const ero = localStorage.getItem( ca3aq );
            return ero ? JSON.parse( ero ) : x2x2qVop2;
        } catch {
            return x2x2qVop2;
        }
    },

    vahate( ca3aq: string, vop2: any ): void {
        try {
            localStorage.setItem( ca3aq, JSON.stringify( vop2 ) );
        } catch ( e ) {
            console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Malsukcesis vahate k3aqon", e );
        }
    },

    ne3unak( ca3aq: string ): void {
        localStorage.removeItem( ca3aq );
    },

    vefalKunhaX2x2q( ca3aq: string, hax2x2q: object ): object {
        try {
            const ero = localStorage.getItem( ca3aq );
            if ( !ero ) return { ...hax2x2q };
            const analizita = JSON.parse( ero );
            return { ...hax2x2q, ...analizita };
        } catch {
            return { ...hax2x2q };
        }
    },

    k3aqKekanArcaxoon( hakek: HTMLElement[], k3aqaCa3aq: string = "desktopTileLayout", qox2n2kaFormo?: string ): void {
        try {
            const arcaxoo = hakek.map( keko => ( {
                id: keko.id || keko.dataset.s2k2p2ni || keko.dataset.id,
                col: parseInt( keko.dataset.col as string ) || 0,
                row: parseInt( keko.dataset.row as string ) || 0,
                colSpan: parseInt( keko.dataset.colSpan as string ) || 1,
                rowSpan: parseInt( keko.dataset.rowSpan as string ) || 1,
                page: parseInt( keko.dataset.page as string ) || 0
            } ) ).filter( ero => ero.id );

            localStorage.setItem( k3aqaCa3aq, JSON.stringify( qox2n2kaFormo ? { _gridShape: qox2n2kaFormo, layout: arcaxoo } : arcaxoo ) );
        } catch ( e ) {
            console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Malsukcesis k3aq kekan arcaxoon", e );
        }
    },

    malvefalKekanArcaxoon( k3aqaCa3aq: string = "desktopTileLayout" ): { layout: Array<any>, gridShape: string | null } {
        try {
            const analizita = JSON.parse( localStorage.getItem( k3aqaCa3aq ) || "null" );
            if ( Array.isArray( analizita ) ) return { layout: analizita, gridShape: null };
            if ( analizita && Array.isArray( analizita.layout ) ) return { layout: analizita.layout, gridShape: analizita._gridShape ?? null };
        } catch { /* koruptita ero - uzi qun2n arcaxoon */ }
        return { layout: [], gridShape: null };
    },

    vefalKekanArcaxoon( k3aqaCa3aq: string = "desktopTileLayout" ): Array<{id: string, col: number, row: number, colSpan: number, rowSpan: number, page?: number}> {
        return this.malvefalKekanArcaxoon( k3aqaCa3aq ).layout;
    },

    vek2p2niKekanArcaxoon( hakek: HTMLElement[], k3aqaCa3aq: string = "desktopTileLayout", vek2p2niQakeknFn?: ( keko: HTMLElement, col: number, row: number, colSpan: number, rowSpan: number ) => void, qox2n2kaFormo?: string ): void {
        const { layout: k3aqtaArcaxoo, gridShape: k3aqtaFormo } = this.malvefalKekanArcaxoon( k3aqaCa3aq );
        if ( !k3aqtaArcaxoo.length ) return;

        const nekalahaVulan = !!qox2n2kaFormo && !!k3aqtaFormo && qox2n2kaFormo === k3aqtaFormo;

        hakek.forEach( keko => {
            const kekId = keko.id || keko.dataset.s2k2p2ni || keko.dataset.id;
            const k3aqta = k3aqtaArcaxoo.find( ero => ero.id === kekId );
            if ( k3aqta ) {
                if ( k3aqta.col < 0 || k3aqta.row < 0 ) return;

                keko.dataset.col = k3aqta.col.toString();
                keko.dataset.row = k3aqta.row.toString();
                keko.dataset.colSpan = k3aqta.colSpan.toString();
                keko.dataset.rowSpan = k3aqta.rowSpan.toString();
                if ( nekalahaVulan && typeof k3aqta.page === "number" ) {
                    keko.dataset.page = k3aqta.page.toString();
                }
                if ( vek2p2niQakeknFn ) {
                    vek2p2niQakeknFn( keko, k3aqta.col, k3aqta.row, k3aqta.colSpan, k3aqta.rowSpan );
                }
            }
        } );
    },

    nekafKekanArcaxoon( k3aqaCa3aq: string = "desktopTileLayout" ): void {
        this.ne3unak( k3aqaCa3aq );
    }
};

( window as any ).ca3aq = ca3aq;
