import {defineField, defineType} from 'sanity'

export const featuresBlock = defineType({
  name: 'featuresBlock',
  title: 'Features Section',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Heading', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
    defineField({
      name: 'items',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
            {name: 'icon', title: 'Icon', type: 'image'},
          ],
        },
      ],
    }),
  ],
})
