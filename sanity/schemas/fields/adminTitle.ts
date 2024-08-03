import {defineField} from 'sanity'

export function adminTitle(initialValue: string) {
  return defineField({
    name: 'title',
    title: 'Title',
    description: 'Visible only in Admin panel',
    type: 'string',
    initialValue,
    validation: (Rule) => Rule.required(),
  })
}
