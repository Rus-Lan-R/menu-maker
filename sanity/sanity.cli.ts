import {defineCliConfig} from 'sanity/cli'
import {DATASET, PROJECT_ID} from './sanity.api'

export default defineCliConfig({
  api: {
    projectId: PROJECT_ID,
    dataset: DATASET,
  },
})
