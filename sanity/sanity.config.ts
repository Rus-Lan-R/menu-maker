import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas/index'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {API_VERSION, DATASET, PREVIEW_URL, PROJECT_ID} from './sanity.api'
import {locate} from './lib/locate'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'menu-maker',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    structureTool(),
    visionTool({defaultApiVersion: API_VERSION}),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: `${PREVIEW_URL}/api/draft`,
        },
      },
    }),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },
})
