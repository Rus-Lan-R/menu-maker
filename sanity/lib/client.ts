import {createClient} from '@sanity/client'
import {API_VERSION, DATASET, PROJECT_ID, USE_CDN} from '../sanity.api'

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: USE_CDN,
  apiVersion: API_VERSION,
})

export default client
