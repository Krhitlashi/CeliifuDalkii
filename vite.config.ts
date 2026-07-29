import { defineConfig } from "vite";
import { resolve, relative, dirname, join, isAbsolute, extname } from "path";
import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to find all HTML files
function getHtmlEntries(dir: string, allFiles: Record<string, string> = {}) {
  const files = readdirSync(dir);

  files.forEach(( file ) => {
    const filePath = resolve(dir, file);
    if ( statSync(filePath).isDirectory() ) {
      if ( file !== "node_modules" && file !== "dist" && file !== ".git" ) {
        getHtmlEntries(filePath, allFiles);
      }
    } else if ( file.endsWith(".html") ) {
      const relativePath = relative(__dirname, filePath);
      const name = relativePath.replace(/\.html$/, "").replace(/[\\/]/g, "_");
      allFiles[name] = filePath;
    }
  });

  return allFiles;
}

// Plugin to copy remaining static JS / TXT files to dist.
const copyStaticFilesPlugin = {
  name: "copy-static-files",
  closeBundle() {
    const distDir = join(__dirname, "dist");
    const excludedDirs = [ "node_modules", "dist", ".git", ".github", ".idea" ];

    function findStaticFiles(dir: string, files: string[] = []): string[] {
      const entries = readdirSync(dir, { withFileTypes: true });

      for ( const entry of entries ) {
        const fullPath = join(dir, entry.name);

        if ( entry.isDirectory() && excludedDirs.includes(entry.name) ) {
          continue;
        }

        if ( entry.isDirectory() ) {
          findStaticFiles(fullPath, files);
        } else if ( entry.isFile() && ( entry.name.endsWith(".js") || entry.name.endsWith(".txt") || entry.name.endsWith(".xlsx") ) ) {
          files.push(fullPath);
        }
      }

      return files;
    }

    const staticFiles = findStaticFiles(__dirname);
    let copiedCount = 0;

    staticFiles.forEach(( srcPath ) => {
      const relativePath = relative(__dirname, srcPath);
      const destPath = join(distDir, relativePath);
      const destDirPath = dirname(destPath);

      if ( !existsSync(destDirPath) ) {
        mkdirSync(destDirPath, { recursive: true });
      }
      copyFileSync(srcPath, destPath);
      copiedCount++;
    });

    console.log(`Copied ${copiedCount} static files to dist`);
  }
};

// Convert a Rollup/Vite module ID ( file:// URL, virtual URL with ?query, absolute path, or relative path ) into a path string relative to the project root, or null.
function toSourceRelative(id: string | null | undefined): string | null {
  if ( !id ) return null;
  let p = id;
  const qIdx = p.indexOf("?");
  if ( qIdx !== -1 ) p = p.substring(0, qIdx);
  const hIdx = p.indexOf("#");
  if ( hIdx !== -1 ) p = p.substring(0, hIdx);
  // Convert file:// URL → absolute path.
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
  plugins: [copyStaticFilesPlugin],
  build: {
    rollupOptions: {
      input: getHtmlEntries(__dirname),
      /* Preserve both the asset basename AND its source-relative directory. Vite's `[name]` token gives the sanitized basename ( e.g. `ı__ɔ` from `ı],ɔ` ), and `assetInfo.originalFileNames[0]` gives the source path so can reconstruct the source directory. Without this, a CSS file at `ſɟᴜ ſɭɹ/.../֭ſɭᴜ ı],ɔ.css` ends up at dist root as `֭ſɭᴜ ı__ɔ.css`, losing its source directory.
      
      Chunk files ( JS bundles ) keep Vite's default `[name]-[hash].js` naming so existing chunk URLs stay addressable.
      
      ( Note ) This is under `rollupOptions` ( not `rolldownOptions` ) intentionally. Vite 8 uses Rolldown under the hood, while the bundler still consumes `rollupOptions.output` for asset naming. */
      output: {
        assetFileNames: ( assetInfo ) => {
          const name = assetInfo.names?.[0] ?? "";
          const original = ( assetInfo.originalFileNames ?? [] )[0];
          if ( original ) {
            const rel = toSourceRelative(original);
            if ( rel ) {
              const dir = dirname(rel);
              const sourceExt = extname(original);
              // Vite 8 / Rolldown's `assetInfo.names[0]` is inconsistent across asset types. HTML-imported CSS uses basename without extension ( `֭ſɭᴜ ı__ɔ` ), while binary/text assets imported via CSS/JS chunks ( TTF/PNG/ICO/JSON ) have with the extension already on `name` ( `j͑ʃꞇȝ.ttf` ). Strip the source's extension off `name` if present, then always re-append.
              const withoutExt = sourceExt && name.endsWith(sourceExt)
                ? name.slice(0, -sourceExt.length)
                : name;
              return dir && dir !== "."
                ? `${dir}/${withoutExt}${sourceExt}`
                : `${withoutExt}${sourceExt}`;
            }
          }
          return name;
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
