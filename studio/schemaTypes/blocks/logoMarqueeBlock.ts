import {defineField, defineType} from '@sanity/types'

export const logoMarqueeBlock = defineType({
  name: 'logoMarqueeBlock',
  title: 'Logo Marquee Section',
  type: 'object',
  icon: () => '⬅️',
  fields: [
    defineField({name: 'title', title: 'Heading', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
    defineField({
      name: 'speed',
      title: 'Scroll Speed',
      type: 'string',
      initialValue: '24s',
      description: 'Animation duration for one full scroll loop',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'logo', title: 'Logo', type: 'image'}),
            defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
