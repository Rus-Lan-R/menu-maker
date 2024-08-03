import {defineField, defineType} from 'sanity'
import {childrenModules} from '../../lib/childrenModules'

export const link = defineType({
  name: 'module.link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'children',
      title: 'Children',
      type: 'array',
      description: 'For example: /1',
      of: childrenModules,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      description:
        'Link to another page. Write iternal links with a slash (/) without the domain name. For example: /about',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'newTab',
      title: 'Open in new tab',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
      initialValue: false,
    }),
  ],
})
