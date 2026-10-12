#!/usr/bin/env python3
import os
import sys
import shutil
import zipfile
import hashlib

WORKSPACE = os.path.dirname(os.path.abspath(__file__))
PROJ_ROOT = os.path.join(WORKSPACE, "hostinger bmts erp")
DEPLOY_READY = os.path.join(WORKSPACE, "deploy_ready")
ZIP_OUT = os.path.join(WORKSPACE, "hostinger-bmts-erp-clean.zip")

# Reconfigure stdout for utf-8 if needed
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

print("=== BMTS School ERP - Production Deployment Packager ===")

# 1. Clean destination folder
if os.path.exists(DEPLOY_READY):
    print(f"Cleaning existing {DEPLOY_READY}...")
    shutil.rmtree(DEPLOY_READY)
os.makedirs(DEPLOY_READY, exist_ok=True)

# 2. Assemble backend
backend_src = os.path.join(PROJ_ROOT, "backend")
backend_dest = os.path.join(DEPLOY_READY, "backend")
os.makedirs(backend_dest, exist_ok=True)

# 2a. dist/
dist_src = os.path.join(backend_src, "dist")
if not os.path.exists(dist_src) or not os.path.exists(os.path.join(dist_src, "server.js")):
    raise RuntimeError(f"backend/dist/server.js does not exist in {dist_src}")
shutil.copytree(dist_src, os.path.join(backend_dest, "dist"))
print("[OK] backend/dist copied (server.js confirmed)")

# 2b. prisma/
prisma_src = os.path.join(backend_src, "prisma")
prisma_dest = os.path.join(backend_dest, "prisma")
shutil.copytree(
    prisma_src,
    prisma_dest,
    ignore=lambda d, files: [f for f in files if f.endswith(('.db', '.db-journal', '.sqlite'))]
)
print("[OK] backend/prisma copied")

# 2c. assets/
assets_src = os.path.join(backend_src, "assets")
assets_dest = os.path.join(backend_dest, "assets")
if os.path.exists(assets_src):
    shutil.copytree(assets_src, assets_dest)
    print("[OK] backend/assets copied")

# 2d. uploads/
uploads_dest = os.path.join(backend_dest, "uploads")
os.makedirs(uploads_dest, exist_ok=True)
with open(os.path.join(uploads_dest, ".gitkeep"), "w") as f:
    f.write("")
print("[OK] backend/uploads created with .gitkeep")

# 2e. package.json, package-lock.json, .env.example
for fname in ["package.json", "package-lock.json", ".env.example"]:
    src_f = os.path.join(backend_src, fname)
    if os.path.exists(src_f):
        shutil.copy2(src_f, os.path.join(backend_dest, fname))
print("[OK] backend/package.json and package-lock.json copied")

# 3. Assemble public_html (Frontend Production Build)
frontend_dist = os.path.join(PROJ_ROOT, "frontend", "dist")
public_html_src = os.path.join(PROJ_ROOT, "public_html")
public_html_dest = os.path.join(DEPLOY_READY, "public_html")
if os.path.exists(frontend_dist) and os.path.exists(os.path.join(frontend_dist, "index.html")):
    shutil.copytree(frontend_dist, public_html_dest)
    print("[OK] public_html copied from frontend/dist (index.html confirmed)")
elif os.path.exists(public_html_src) and os.path.exists(os.path.join(public_html_src, "index.html")):
    shutil.copytree(public_html_src, public_html_dest)
    print("[OK] public_html copied from hostinger bmts erp/public_html (index.html confirmed)")
else:
    raise RuntimeError(f"Neither frontend/dist nor public_html contains index.html")

# 3a. .htaccess
htaccess_content = """# React single-page app served by Apache / LiteSpeed (Hostinger).

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Never rewrite real files or directories (JS, CSS, images, uploads).
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Everything else is a client-side route -> let React Router handle it.
  RewriteRule ^ index.html [L]
</IfModule>

# index.html must never be cached, or browsers keep loading a stale bundle
# that references deleted hashed assets.
<FilesMatch "^index\\.html$">
  <IfModule mod_headers.c>
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </IfModule>
</FilesMatch>

# Build output is content-hashed, so it can be cached indefinitely.
<FilesMatch "\\.(js|css|woff2?|ttf|eot|svg|png|jpe?g|gif|webp)$">
  <IfModule mod_headers.c>
    Header set Cache-Control "public, max-age=31536000, immutable"
  </IfModule>
</FilesMatch>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
"""
htaccess_path = os.path.join(public_html_dest, ".htaccess")
with open(htaccess_path, "w", newline="\n", encoding="utf-8") as f:
    f.write(htaccess_content)
print("[OK] public_html/.htaccess configured")

# 4. Assemble database
db_dest = os.path.join(DEPLOY_READY, "database")
os.makedirs(db_dest, exist_ok=True)
db_sources = [
    os.path.join(WORKSPACE, "deploy_ready", "database"),
    os.path.join(PROJ_ROOT, "backend")
]
for sql_name in ["database_backup_2026_2027.sql", "school_erp_full.sql", "remark_bank_seed.sql"]:
    for src_dir in db_sources:
        sql_src = os.path.join(src_dir, sql_name)
        if os.path.exists(sql_src):
            shutil.copy2(sql_src, os.path.join(db_dest, sql_name))
            size_kb = os.path.getsize(sql_src) / 1024
            print(f"[OK] database/{sql_name} copied ({size_kb:.1f} KB)")
            break

# 5. Helper config and deploy docs
for fname in ["README_DEPLOY.md", ".env.production.example"]:
    for src_dir in [os.path.join(WORKSPACE, "deploy_ready"), PROJ_ROOT]:
        src_f = os.path.join(src_dir, fname)
        if os.path.exists(src_f):
            shutil.copy2(src_f, os.path.join(DEPLOY_READY, fname))
            break

# Also mirror to PROJ_ROOT/deploy_ready for convenience
proj_deploy_ready = os.path.join(PROJ_ROOT, "deploy_ready")
if proj_deploy_ready != DEPLOY_READY:
    # sync changes without removing database if existing
    shutil.copytree(DEPLOY_READY, proj_deploy_ready, dirs_exist_ok=True)

# 6. Pre-packaging audit
print("\n--- Running Pre-Packaging Verification ---")
prohibited_found = []
for root, dirs, files in os.walk(DEPLOY_READY):
    for d in dirs:
        if d in ("node_modules", ".git", ".vscode", ".idea"):
            prohibited_found.append(os.path.join(root, d))
    for f in files:
        if f == ".env" or f.endswith((".tsbuildinfo", ".sqlite")):
            prohibited_found.append(os.path.join(root, f))

if prohibited_found:
    raise RuntimeError(f"Prohibited files found in deploy_ready: {prohibited_found}")
print("[OK] No node_modules, .git, or secrets found in deploy_ready folder.")

# 7. Create ZIP archive
print(f"\nCreating ZIP archive: {ZIP_OUT}...")
if os.path.exists(ZIP_OUT):
    os.remove(ZIP_OUT)

with zipfile.ZipFile(ZIP_OUT, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zipf:
    for root, dirs, files in os.walk(DEPLOY_READY):
        # Sort for deterministic archiving
        dirs.sort()
        files.sort()
        for f in files:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, DEPLOY_READY)
            # Use forward slashes in zip entry names
            zip_entry_name = rel_path.replace("\\", "/")
            zipf.write(full_path, zip_entry_name)

# Also copy ZIP to PROJ_ROOT
inner_zip = os.path.join(PROJ_ROOT, "hostinger-bmts-erp-clean.zip")
shutil.copy2(ZIP_OUT, inner_zip)

zip_size_mb = os.path.getsize(ZIP_OUT) / (1024 * 1024)
print(f"[OK] ZIP created successfully: {ZIP_OUT} ({zip_size_mb:.2f} MB)")
print(f"[OK] ZIP mirrored to: {inner_zip}")

# 8. Post-creation Verification on ZIP
print("\n--- Verifying ZIP Integrity ---")
with zipfile.ZipFile(ZIP_OUT, "r") as z:
    entries = z.namelist()
    print(f"Total entries in ZIP: {len(entries)}")

    # Checklist verification
    checks = {
        "backend/dist/server.js exists": "backend/dist/server.js" in entries,
        "backend/package.json exists": "backend/package.json" in entries,
        "backend/package-lock.json exists": "backend/package-lock.json" in entries,
        "frontend production files exist": any(e.startswith("public_html/assets/") for e in entries),
        "public_html/index.html exists directly": "public_html/index.html" in entries,
        "public_html/.htaccess exists": "public_html/.htaccess" in entries,
        "database SQL backup exists": any(e.startswith("database/") and e.endswith(".sql") for e in entries),
        "NO node_modules in ZIP": not any("node_modules" in e for e in entries),
        "NO .env with secrets in ZIP": not any(e == ".env" or e.endswith("/.env") for e in entries),
    }

    all_passed = True
    for desc, passed in checks.items():
        symbol = "[PASS]" if passed else "[FAIL]"
        print(f"{symbol} {desc}")
        if not passed:
            all_passed = False

    if not all_passed:
        raise RuntimeError("ZIP verification failed checklist!")

print("\nAll checks PASSED successfully!")
