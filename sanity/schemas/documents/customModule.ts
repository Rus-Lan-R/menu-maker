import {defineField, defineType} from 'sanity'
import {moduleNames} from '../modules/_index'
import client from '../../lib/client'

export const customModule = defineType({
  name: 'customModule',
  title: 'Custom Module',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom(async (title, context) => {
          const documents: {_id: string}[] = await client.fetch(
            `*[_type == "customModule" && title == "${title}"]`
          )

          if (
            documents.length > 1 ||
            (documents.length === 1 &&
              documents[0]._id !== context.document?._id?.split('drafts.').join(''))
          ) {
            return 'Title needs to be unique'
          } else {
            return true
          }
        }),
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        ...moduleNames,
        {
          type: 'reference',
          to: [{type: 'customModule'}],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
})
