import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// ==============================================================================
// DOMAIN & DEPLOYMENT TOGGLE
// ==============================================================================
// Set `TARGET_ENV` to:
//   - 'custom'  : Custom Domain (https://rbsmun.com)
//   - 'github'  : GitHub Pages URL (https://<username>.github.io/RBSMUN/)
//
// You can also set this via command line:
//   $ DEPLOY_TARGET=github npm run build
// ==============================================================================
const TARGET_ENV = process.env.DEPLOY_TARGET || 'github'; // Change 'custom' to 'github' to test GitHub Pages

const GITHUB_USERNAME = 'Aarkoday'; // Your GitHub Username / Org
const GITHUB_REPO_NAME = 'RBSMUN';   // Your GitHub Repository Name

const configs = {
  custom: {
    site: 'https://rbsmun.com',
    base: '/',
  },
  github: {
    site: `https://${GITHUB_USERNAME}.github.io`,
    base: `/${GITHUB_REPO_NAME}/`, // Set to '/' if deploying to username.github.io root
  },
};

const activeConfig = configs[TARGET_ENV] || configs.custom;

console.log(`🚀 Build Target: [${TARGET_ENV.toUpperCase()}] -> Site: ${activeConfig.site} | Base: ${activeConfig.base}`);

// https://astro.build/config
export default defineConfig({
  site: activeConfig.site,
  base: activeConfig.base,
  integrations: [react(), tailwind(), sitemap()],
});
