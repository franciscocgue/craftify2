// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const propertiesPath = path.join(__dirname, 'src', 'app-data', process.env.USER_APP_ID, 'properties.json');
const propertiesData = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));

const componentsPath = path.join(__dirname, 'src', 'app-data', process.env.USER_APP_ID, 'components.json');
const componentsData = JSON.parse(fs.readFileSync(componentsPath, 'utf8'));

const variablesPath = path.join(__dirname, 'src', 'app-data', process.env.USER_APP_ID, 'variables.json');
const variablesData = JSON.parse(fs.readFileSync(variablesPath, 'utf8'));

const logicNodesPath = path.join(__dirname, 'src', 'app-data', process.env.USER_APP_ID, 'logicNodes.json');
const logicNodesData = JSON.parse(fs.readFileSync(logicNodesPath, 'utf8'));

const logicEdgesPath = path.join(__dirname, 'src', 'app-data', process.env.USER_APP_ID, 'logicEdges.json');
const logicEdgesData = JSON.parse(fs.readFileSync(logicEdgesPath, 'utf8'));

export default defineConfig({
  plugins: [react()],
  build: {
    // outDir: 'dist/test1/test2', // Customize output directory if needed
    // @TODO: split code / dynamic imports
    // lower threshold to get warning; note: warning interpreted by bullmq worker as error
    chunkSizeWarningLimit: 3000,
    outDir: `dist/${process.env.USER_APP_ID}`,
    // outDir: `dist`
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        // chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') return 'assets/style.css';
          return assetInfo.name as string;
        },
      },
    },
  },
  define: {
    // Inject the JSON data directly as a global constant
    __APP_CONFIG_PROPERTIES__: JSON.stringify(propertiesData),
    __APP_CONFIG_COMPONENTS__: JSON.stringify(componentsData),
    __APP_CONFIG_VARIABLES__: JSON.stringify(variablesData),
    __APP_CONFIG_LOGICNODES__: JSON.stringify(logicNodesData),
    __APP_CONFIG_LOGICEDGES__: JSON.stringify(logicEdgesData),
  },
});
