import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// ==============================================================================
// DOMAIN & DEPLOYMENT TOGGLE
// ==============================================================================
// Set `TARGET_ENV` to:
//   - 'custom'  : Custom Domain (https://rbsmun.com)
//   - 'github'  : GitHub Pages URL (https://<username>.github.io/<repo-name>/)
//
// You can also set this via command line:
//   $ DEPLOY_TARGET=github npm run build
// ==============================================================================
const TARGET_ENV = process.env.DEPLOY_TARGET || 'custom'; // Set 'custom' or 'github'

// Auto-detect GitHub repository name if building in GitHub Actions
const GITHUB_REPO_FULL = process.env.GITHUB_REPOSITORY || 'Aarkoday/RBSMUN-WEBSITE';
const [githubOwner, githubRepo] = GITHUB_REPO_FULL.split('/');

const configs = {
  custom: {
    site: 'rbsmun.com',
    base: '/',
  },
  github: {
    site: `https://${githubOwner}.github.io`,
    base: `/${githubRepo}/`,
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
