import {defineField, defineType} from '@sanity/types'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  icon: () => '🦸‍♂️',
  fields: [
    defineField({name: 'title', title: 'Heading', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Contact Us',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
