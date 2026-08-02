import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{type: 'service'}],
      description: 'Choose service from the list',
    }),
    defineField({
      name: 'task',
      title: 'Task',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'caption', type: 'string', title: 'Caption'}],
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'seoGroup',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({name: 'metaTitle', title: 'Meta Title', type: 'string'}),
        defineField({name: 'metaDescription', title: 'Meta Description', type: 'text'}),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image (Recommended: 1200x630)',
          type: 'image',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'coverImage',
    },
  },
})

//       title: 'Title',
//       type: 'string',
//     }),
//   ],

//   preview: {
//     select: {
//       title: 'title',
//       author: 'author.name',
//       media: 'mainImage',
//     },
//     prepare(selection) {
//       const {author} = selection
//       return {...selection, subtitle: author && `by ${author}`}
//     },
//   },
// })
