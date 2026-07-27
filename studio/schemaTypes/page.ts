import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page Builder',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({name: 'title', title: 'Page Title', type: 'string'}),
    defineField({name: 'slug', title: 'URL (Slug)', type: 'slug', options: {source: 'title'}}),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {type: 'block'}, // Standard text editor (paragraphs, bold text)
        {type: 'heroBlock'}, // Our custom block!
        {type: 'textImageBlock'}, // Our custom block!
        {type: 'featuresBlock'}, // Our custom block!
        {type: 'ctaBlock'}, // Our custom block!
        // Here you can add more custom blocks like { type: 'galleryBlock' } and so on
      ],
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
})
