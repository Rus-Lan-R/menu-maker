import {SquareIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {adminTitle} from '../fields/adminTitle'
import {childrenModules} from '../../lib/childrenModules'

export const button = defineType({
  name: 'module.button',
  title: 'Button',
  type: 'object',
  icon: SquareIcon,
  fields: [
    adminTitle('Button'),
    defineField({
      name: 'content',
      title: 'Modules',
      type: 'array',
      of: childrenModules,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'string',
    }),
    defineField({
      name: 'size',
      type: 'string',
      options: {
        direction: 'horizontal',
        layout: 'radio',
        list: [
          {value: 'big', title: 'Big'},
          {value: 'small', title: 'Small'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      type: 'string',
      options: {
        direction: 'horizontal',
        layout: 'radio',
        list: [
          {value: 'dark', title: 'Dark'},
          {value: 'orange', title: 'Orange'},
          {value: 'white', title: 'White'},
          {value: 'transparentGray', title: 'Transparent Gray'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
