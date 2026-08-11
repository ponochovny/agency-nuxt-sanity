import {defineField, defineType} from 'sanity'

export const textImageBlock = defineType({
  name: 'textImageBlock',
  title: 'Text with Image Section',
  type: 'object',
  icon: () => '🖼️',
  fields: [
    defineField({name: 'title', title: 'Heading', type: 'string'}),
    defineField({name: 'text', title: 'Text', type: 'text'}),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          {value: 'left', title: 'Left'},
          {value: 'right', title: 'Right'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text',
      media: 'image',
    },
  },
})
