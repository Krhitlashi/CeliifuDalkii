// ≺⧼ Elementaj Utilajoj ⧽≻

declare const CONSTANTS: any;

/**
 * Get container dimensions (fixed or from element)
 * @param {number|null} fixedWidth - Fixed width or null
 * @param {number|null} fixedHeight - Fixed height or null
 * @param {HTMLElement|null} container - Container element
 * @returns {{width: number, height: number}}
 */
export function akiriUjonGrandecojn( fixedWidth: number | null, fixedHeight: number | null, container: HTMLElement | null ): { width: number; height: number } {
    return {
        width: fixedWidth ?? ( container?.clientWidth || window.innerWidth ),
        height: fixedHeight ?? ( container?.clientHeight || window.innerHeight )
    };
}

/**
 * Check if point is within bounds
 * @param {number} x
 * @param {number} y
 * @param {DOMRect} bounds
 * @returns {boolean}
 */
export function cxuEnLimoj( x: number, y: number, bounds: DOMRect ): boolean {
    return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
}

// Attach to window for global access
( window as any ).getContainerDimensions = akiriUjonGrandecojn;
( window as any ).isWithinBounds = cxuEnLimoj;

/**
 * Set aria-pressed state on a button
 * @param {string|HTMLElement} btn - Button ID or element
 * @param {boolean} pressed
 */
function setButtonPressed( btn: string | HTMLElement, pressed: boolean ): void {
    const el = typeof btn === "string" ? document.getElementById( btn ) : btn;
    if ( el ) {
        if ( pressed ) {
            el.setAttribute( "aria-pressed", "true" );
        } else {
            el.removeAttribute( "aria-pressed" );
        }
    }
}

/**
 * Show element with fade-in animation
 * @param {HTMLElement} el
 */
function showWithAnimation( el: HTMLElement ): void {
    el.classList.add( "visible" );
}

/**
 * Hide element with fade-out animation
 * @param {HTMLElement} el
 * @param {number} duration - Animation duration in ms
 */
function hideWithAnimation( el: HTMLElement, duration: number = 0o300 ): void {
    el.classList.remove( "visible" );
    setTimeout( () => el.style.display = "none", duration );
}

/**
 * Get element span values from dataset
 * @param {HTMLElement} el
 * @returns {{colSpan: number, rowSpan: number}}
 */
function getElementSpans( el: HTMLElement ): { colSpan: number; rowSpan: number } {
    return {
        colSpan: parseInt( el.dataset.colSpan as string ) || 1,
        rowSpan: parseInt( el.dataset.rowSpan as string ) || 1
    };
}

/**
 * Set element span values
 * @param {HTMLElement} el
 * @param {number} colSpan
 * @param {number} rowSpan
 */
function setElementSpans( el: HTMLElement, colSpan: number, rowSpan: number ): void {
    el.dataset.colSpan = colSpan.toString();
    el.dataset.rowSpan = rowSpan.toString();
}

/**
 * Set element dragging state ( class )
 * @param {HTMLElement} el
 * @param {boolean} dragging
 */
function setElementDragging( el: HTMLElement, dragging: boolean ): void {
    el.classList.toggle( "dragging", dragging );
}

/**
 * Force reflow on element ( triggers layout recalculation )
 * @param {HTMLElement} el
 */
function forceReflow( el: HTMLElement ): void {
    void el.offsetWidth;
}

/**
 * Get element position and span values from dataset
 * @param {HTMLElement} el
 * @returns {{col: number, row: number, colSpan: number, rowSpan: number}}
 */
export function akiriElementanPozicion( el: HTMLElement ): { col: number; row: number; colSpan: number; rowSpan: number } {
    return {
        col: parseInt( el.dataset.col as string ) || 0,
        row: parseInt( el.dataset.row as string ) || 0,
        colSpan: parseInt( el.dataset.colSpan as string ) || 1,
        rowSpan: parseInt( el.dataset.rowSpan as string ) || 1
    };
}

/**
 * Toggle class on element
 * @param {HTMLElement} el
 * @param {string} className
 * @param {boolean} force
 */
function toggleClass( el: HTMLElement | null, className: string, force?: boolean ): void {
    if ( !el ) return;
    el.classList.toggle( className, force );
}

/**
 * Add class to element
 * @param {HTMLElement} el
 * @param {string} className
 */
function addClass( el: HTMLElement | null | undefined, className: string ): void {
    el?.classList.add( className );
}

/**
 * Remove class from element
 * @param {HTMLElement} el
 * @param {string} className
 */
function removeClass( el: HTMLElement | null | undefined, className: string ): void {
    el?.classList.remove( className );
}

/**
 * Check if element has class
 * @param {HTMLElement} el
 * @param {string} className
 * @returns {boolean}
 */
function hasClass( el: HTMLElement | null | undefined, className: string ): boolean {
    return el?.classList.contains( className ) ?? false;
}

// Attach to window for global access
( window as any ).setButtonPressed = setButtonPressed;
( window as any ).showWithAnimation = showWithAnimation;
( window as any ).hideWithAnimation = hideWithAnimation;
( window as any ).getElementSpans = getElementSpans;
( window as any ).setElementSpans = setElementSpans;
( window as any ).setElementDragging = setElementDragging;
( window as any ).forceReflow = forceReflow;
( window as any ).getElementPosition = akiriElementanPozicion;
( window as any ).toggleClass = toggleClass;
( window as any ).addClass = addClass;
( window as any ).removeClass = removeClass;
( window as any ).hasClass = hasClass;
