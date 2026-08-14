import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import path from 'path';

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
    site: 'https://rbsmun.com',
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
  integrations: [
    react(), 
    tailwind(), 
    sitemap({
      filter: (page) => 
        !page.includes('/tools/') && 
        !page.includes('/conference_backup')
    })
  ],
  vite: {
    plugins: [
      {
        name: 'save-image-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const urlPath = req.url ? req.url.split('?')[0] : '';
            if (req.method === 'POST' && urlPath.endsWith('/tools/save-image.json')) {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  const { imgSrc, base64, id, type, group, filename, mode } = data;
                  
                  if (!imgSrc || !base64) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: "Missing parameters" }));
                    return;
                  }
                  
                  const cleanPathIndex = imgSrc.indexOf('/images/');
                  if (cleanPathIndex === -1) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, error: "Invalid path structure" }));
                    return;
                  }
                  const cleanPath = imgSrc.substring(cleanPathIndex).split('?')[0].replace(/^\//, '');
                  
                  const absolutePath = path.resolve(process.cwd(), 'public', cleanPath);
                  
                  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
                  const buffer = Buffer.from(base64Data, 'base64');
                  
                  fs.writeFileSync(absolutePath, buffer);

                  // Update the corresponding JSON database file
                  if (type === 'committee') {
                    const filePath = path.resolve(process.cwd(), 'src', 'data', 'committee-dais.json');
                    if (fs.existsSync(filePath)) {
                      const db = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                      if (db[group]) {
                        const member = db[group].find(m => m.img === filename);
                        if (member) {
                          if (mode === 'card') {
                            delete member.card_position;
                            delete member.card_zoom;
                          } else if (mode === 'popup') {
                            delete member.img_position;
                            delete member.img_zoom;
                          }
                          fs.writeFileSync(filePath, JSON.stringify(db, null, 4), 'utf8');
                        }
                      }
                    }
                  } else if (type === 'team') {
                    const filePath = path.resolve(process.cwd(), 'src', 'data', 'teams.json');
                    if (fs.existsSync(filePath)) {
                      const db = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                      if (db[group]) {
                        const teamObj = db[group];
                        const searchArrays = [teamObj.heads || [], teamObj.core || []];
                        let found = false;
                        for (const arr of searchArrays) {
                          const member = arr.find(m => m.img === filename);
                          if (member) {
                            if (mode === 'card') {
                              delete member.card_position;
                              delete member.card_zoom;
                            } else if (mode === 'popup') {
                              delete member.img_position;
                              delete member.img_zoom;
                            }
                            found = true;
                            break;
                          }
                        }
                        if (found) {
                          fs.writeFileSync(filePath, JSON.stringify(db, null, 4), 'utf8');
                        }
                      }
                    }
                  } else if (type === 'group') {
                    const filePath = path.resolve(process.cwd(), 'src', 'data', 'committees.json');
                    if (fs.existsSync(filePath)) {
                      const db = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                      const committee = db.find(c => c.id === group);
                      if (committee) {
                        delete committee.group_position;
                        delete committee.group_zoom;
                        fs.writeFileSync(filePath, JSON.stringify(db, null, 4), 'utf8');
                      }
                    }
                  } else if (type === 'team-group') {
                    const filePath = path.resolve(process.cwd(), 'src', 'data', 'teams.json');
                    if (fs.existsSync(filePath)) {
                      const db = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                      if (db[group]) {
                        delete db[group].group_position;
                        delete db[group].group_zoom;
                        fs.writeFileSync(filePath, JSON.stringify(db, null, 4), 'utf8');
                      }
                    }
                  }
                  
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, path: cleanPath }));
                } catch (e) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: e.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ]
  }
});
