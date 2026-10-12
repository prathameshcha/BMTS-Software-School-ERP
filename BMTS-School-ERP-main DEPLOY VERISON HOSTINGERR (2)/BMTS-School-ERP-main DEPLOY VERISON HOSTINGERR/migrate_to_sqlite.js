/**
 * DISABLED — do not run this script.
 *
 * It rewrites backend/prisma/schema.prisma from MySQL to SQLite and strips every
 * @db.Text / @db.LongText annotation. Running it once already broke the project:
 * the schema and migrations became SQLite while docker-compose.yml, both .env
 * examples, the Dockerfile, scripts/build-sql-bundle.mjs and the whole deploy
 * guide stayed on MySQL. The consequences were:
 *
 *   - `prisma migrate deploy` failed with P3019 (datasource provider mismatch),
 *     so the application could not be deployed at all.
 *   - `scripts/build-sql-bundle.mjs` parses backtick-quoted MySQL DDL out of the
 *     migration. SQLite emits double quotes, so it matched zero tables and never
 *     produced deploy_ready/database/school_erp_full.sql — the file Step 1 of
 *     README_DEPLOY.md tells you to import.
 *   - Dropping @db.LongText silently downgrades the report-card JSON snapshot
 *     columns to VARCHAR(191). ReportCardSection.additionalData,
 *     ReportCardVersion.data, AuditLog.beforeData/afterData and Certificate.data
 *     all hold multi-kilobyte payloads and would fail or truncate on write.
 *
 * The schema is MySQL, matching the documented Hostinger deployment target.
 * If you genuinely need a local SQLite database, do not mutate the shared
 * schema — keep a separate schema file and point Prisma at it with --schema.
 */
console.error(
  [
    'migrate_to_sqlite.js is disabled on purpose.',
    '',
    'It converts the Prisma schema to SQLite, which makes the project',
    'undeployable: the migrations stop matching DATABASE_URL, the phpMyAdmin',
    'SQL bundle generator produces nothing, and the LongText report-card',
    'columns silently shrink to VARCHAR(191).',
    '',
    'Read the comment at the top of this file before changing anything.',
  ].join('\n')
);
process.exit(1);
