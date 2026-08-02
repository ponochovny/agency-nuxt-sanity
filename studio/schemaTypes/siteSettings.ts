import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({name: 'siteTitle', title: 'Site title', type: 'string'}),
    defineField({name: 'email', title: 'Email for contact', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', title: 'Platform', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'email',
    },
  },
})
