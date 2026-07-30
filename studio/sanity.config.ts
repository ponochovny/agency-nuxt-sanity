import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'nuxt-portfolio',

  projectId: 'bmqu0baz',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),

    presentationTool({
      previewUrl: {
        origin: 'http://localhost:3000?preview=true',
        previewMode: {
          enable: '/api/draft/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
