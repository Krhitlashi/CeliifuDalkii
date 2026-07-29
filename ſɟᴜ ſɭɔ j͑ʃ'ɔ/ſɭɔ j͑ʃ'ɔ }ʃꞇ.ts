// ≺⧼ Ĉefa Enirpunkto ⧽≻ - Ŝargas ĉiujn OS-modulojn en ĝusta ordo 🚀

console.log( "<( OS-Enirpunkto Ŝarganta )>" );

// ⟨ Konstantoj ⟩ - devas ŝargi unue (difinas window.CONSTANTS)
import "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

// ⟨ Utilajoj ⟩ - provizas help-funkciojn
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɹ ſȷɔ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ı],ɔ ŋᷠᴜ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ j͑ʃ'ᴜ ı],ᴜ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɔƽ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſ͕ɭwȝ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜƽ ꞁȷ̀ɜ ſɭɔʞ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſ̀ȷᴜȝ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

// ⟨ Administrantoj ⟩ - ĉi tiuj alkroĉas al fenestro
import "./ɭʃᴜ ֭ſɭᴜ j͐ʃᴜ ſ͕ɭᴜƴ.js";
import "./ı],ɔ ſɭw ſᶘɜ.js";
import "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ɭʃᴜ ı],c̗ᴜ.js";
import "./}ʃɹ ɭʃᴜ j͑ʃɔ }ʃw.js";
import "./ſɟᴜ ſɭɹ ſןɹ.js";
import "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js"; // Tipo-difinoj
import "./ſɟɔ }ʃᴜ.js";
import "./ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ.js";
import "./}ʃɹ ɭʃᴜ j͑ʃɔ }ʃw j͑ʃw ſɭʞɹȝ ꞁȷ̀ᴜꞇ.js";
import "./ſ̀ȷᴜ ſɟᴜ ſɭɹ j͑ʃᴜꞇ.js";
import "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɟᴜ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ.js";
import "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ.js";

console.log( "<( Ĉiuj OS-Moduloj Ŝargitaj )>" );

// ⟨ Inicado ⟩
// Sistemo-modulo en ſɟᴜ ſɭɹ ſןɹ.ts pritraktas la ĉefan startigadon

function startOS() {
    const Sistemo = ( window as any ).Sistemo;
    if ( Sistemo ) {
        console.log( "<( Startanta OS-on per Sistemo )>" );
        Sistemo.init();
    } else {
        console.error( "Sistemo ne trovita!" );
    }
}

// Kunordigi kun la interna startigado de Sistemo
if ( document.readyState === "loading" ) {
    window.addEventListener( "DOMContentLoaded", startOS );
} else {
    startOS();
}

console.log( "<( OS-Enirpunkto Preta )>" );
