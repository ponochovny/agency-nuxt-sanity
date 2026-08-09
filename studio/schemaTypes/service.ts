import {defineField, defineType} from '@sanity/types'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: () => '💼',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'badge', title: 'Category / Tag (e.g., Design, Dev)', type: 'string'}),
    defineField({name: 'price', title: 'Cost (e.g., "from $2,500")', type: 'string'}),
    defineField({name: 'timeframe', title: 'Timeframe (e.g., "2–4 weeks")', type: 'string'}),
    defineField({name: 'excerpt', title: 'Brief Description (for card)', type: 'text', rows: 3}),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'benefits',
      title: 'Key Benefits (Grid)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
          ],
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Detailed Description and Blocks (Page Builder)',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'heroBlock'},
        {type: 'featuresBlock'},
        {type: 'textImageBlock'},
        {type: 'ctaBlock'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'coverImage',
    },
  },
})
