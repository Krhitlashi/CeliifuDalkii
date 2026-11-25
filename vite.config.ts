// ≺⧼ vite ʌ ſɭw ſᶘɜ 📦 ⧽≻
import { defineConfig } from "vite";
import { resolve, relative, dirname, join, isAbsolute, extname } from "path";
import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function xk12naHtmlCaqavop2jn(dir: string, allFiles: Record<string, string> = {}) {
  const files = readdirSync(dir);

  files.forEach(( file ) => {
    const caqavop2K6h6 = resolve(dir, file);
    if ( statSync( caqavop2K6h6 ).isDirectory() ) {
      if ( file !== "node_modules" && file !== "dist" && file !== ".git" ) {
        xk12naHtmlCaqavop2jn(caqavop2K6h6, allFiles);
      }
    } else if ( file.endsWith( ".html" ) ) {
      const partaK6h6 = relative(__dirname, caqavop2K6h6);
      const caqavop2Ksaka = partaK6h6.replace(/\.html$/, "").replace(/[\\/]/g, "_");
      allFiles[caqavop2Ksaka] = caqavop2K6h6;
    }
  });

  return allFiles;
}

const cutfaKukeHaCaqavop2n = {
  name: "cutfa-kuke-caqavop2j",
  closeBundle() {
    const dista3aq = join(__dirname, "dist");
    const ne3unakHaCaqavop2j = [ "node_modules", "dist", ".git", ".github", ".idea", ".vscode", ".freebuff" ];

    function b6keweKukeHaCaqavop2jn(dir: string, files: string[] = []): string[] {
      const entries = readdirSync(dir, { withFileTypes: true });

      for ( const entry of entries ) {
        const l2haK6h6 = join(dir, entry.name);

        if ( entry.isDirectory() && ne3unakHaCaqavop2j.includes(entry.name) ) {
          continue;
        }

        if ( entry.isDirectory() ) {
          b6keweKukeHaCaqavop2jn(l2haK6h6, files);
        } else if ( entry.isFile() && ( entry.name.endsWith( ".js" ) || entry.name.endsWith( ".txt" ) || entry.name.endsWith( ".xlsx" ) || entry.name.endsWith( ".json" ) || entry.name.endsWith( ".ico" ) ) ) {
          files.push(l2haK6h6);
        }
      }

      return files;
    }

    const kukeHaCaqavop2j = b6keweKukeHaCaqavop2jn(__dirname);
    let cutfaVek2fe = 0;

    kukeHaCaqavop2j.forEach(( k1iqK6h6 ) => {
      const partaK6h6 = relative(__dirname, k1iqK6h6);
      const natakatomasaiK6h6 = join(dista3aq, partaK6h6);
      const natakatomasaiCaqavop23aqK6h6 = dirname(natakatomasaiK6h6);

      if ( !existsSync( natakatomasaiCaqavop23aqK6h6 ) ) {
        mkdirSync(natakatomasaiCaqavop23aqK6h6, { recursive: true });
      }
      copyFileSync(k1iqK6h6, natakatomasaiK6h6);
      cutfaVek2fe++;
    });

    console.log( "<( j͑ʃɹ ſɟᴜ ſᶘᴜ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ )>", cutfaVek2fe );
  }
};

function alK1iqParta(id: string | null | undefined): string | null {
  if ( !id ) return null;
  let p = id;
  const qVecax2l = p.indexOf("?");
  if ( qVecax2l !== -1 ) p = p.substring(0, qVecax2l);
  const hVecax2l = p.indexOf("#");
  if ( hVecax2l !== -1 ) p = p.substring(0, hVecax2l);
  if ( p.startsWith("file://") ) {
    try {
      p = fileURLToPath(p);
    } catch {
      return null;
    }
  }
  if ( isAbsolute(p) ) {
    const rel = relative(__dirname, p);
    if ( rel.startsWith("..") || rel.startsWith("/") || rel === "" || rel === "." ) return null;
    return rel;
  }
  if ( p.startsWith("..") || p.startsWith("/") ) return null;
  return p;
}

export default defineConfig({
  plugins: [
    {
      name: "servi-cak2p2-html",
      configureServer( server ) {
        server.middlewares.use( ( req, _res, next ) => {
          if ( req.url === "/" || req.url === "/index.html" ) {
            req.url = "/%C9%AD(%E1%B4%9C%CD%B7%CC%97%20%C5%BF%C9%AD%C9%B9.html";
          }
          next();
        } );
      }
    },
    cutfaKukeHaCaqavop2n,
  ],
  build: {
    rollupOptions: {
      input: xk12naHtmlCaqavop2jn( __dirname ),
      output: {
        assetFileNames: ( assetInfo ) => {
          const caqavop2Ksaka = assetInfo.names?.[0] ?? "";
          const original = ( assetInfo.originalFileNames ?? [] )[0];
          if ( original ) {
            const rel = alK1iqParta( original );
            if ( rel ) {
              const dir = dirname( rel );
              const k1iq3akak = extname( original );
              if ( k1iq3akak === ".html" ) return caqavop2Ksaka;
              const qun23akak = k1iq3akak && caqavop2Ksaka.endsWith( k1iq3akak )
                ? caqavop2Ksaka.slice(0, -k1iq3akak.length)
                : caqavop2Ksaka;
              return dir && dir !== "."
                ? `${dir}/${qun23akak}${k1iq3akak}`
                : `${qun23akak}${k1iq3akak}`;
            }
          }
          return caqavop2Ksaka;
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
