import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas/index'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {DATASET, PROJECT_ID} from './sanity.api'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'menu-maker',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [structureTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],

  schema: {
    types: schemaTypes,
  },
})
