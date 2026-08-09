import {defineField, defineType} from '@sanity/types'

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
    defineField({
      name: 'promoBanner',
      title: 'Promo banner',
      type: 'object',
      description:
        'Promo banner settings — shown on top of all pages for promotions, important announcements, or special offers.',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show banner',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'bannerType',
          title: 'Banner type',
          type: 'string',
          options: {
            list: [
              {title: 'Info', value: 'info'},
              {title: 'Promo', value: 'promo'},
              {title: 'Announcement', value: 'announcement'},
              {title: 'Urgent', value: 'urgent'},
            ],
            layout: 'radio',
          },
          initialValue: 'info',
        }),
        defineField({
          name: 'message',
          title: 'Message',
          type: 'text',
          rows: 2,
          description:
            'Short text for the banner. For example: “Spring promo - free website audit for orders placed before May 31st”.',
        }),
        defineField({
          name: 'ctaUrl',
          title: 'CTA URL',
          type: 'string',
          description: 'Link to the promo page or detailed information.',
        }),
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
