import {defineType} from 'sanity'
import {childrenModules} from '../../lib/childrenModules'

export const page = defineType({
  name: 'page',
  type: 'document',
  groups: [
    {
      name: 'view',
      title: 'View',
      default: true,
    },
    {
      name: 'meta',
      title: 'Page Info',
    },
    {
      name: 'og',
      title: 'Social Share Info (Open Graph)',
    },
    {
      name: 'google',
      title: 'Google Config',
    },
    {
      name: 'custom',
      title: 'Custom',
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      group: ['view'],
    },
    {
      name: 'slug',
      type: 'slug',
      group: ['view'],
    },
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: childrenModules,
      group: ['view'],
    },
    {
      type: 'text',
      name: 'description',
      title: 'Describe This Site',
      group: ['meta'],
    },
    {
      type: 'text',
      name: 'ogDescription',
      title: 'Social Share Description',
      group: ['og'],
    },
    {
      type: 'string',
      title: 'Open Graph Page Title',
      name: 'ogTitle',
      description:
        'Set the title Open Graph should use. In most situations, this should be different from the value of the title prop',
      group: ['og'],
    },
    {
      type: 'image',
      title: 'Image',
      name: 'ogImage',
      description:
        'URL of the image that should be used in social media previews. If you define this, you must define two other OG basic properties as well: title and type.',
      group: ['og'],
    },
    {
      type: 'boolean',
      name: 'isGoogleAnalyticsEnabled',
      title: 'Enable Google Analytics?',
      group: ['google'],
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
    {
      type: 'string',
      name: 'googleanalyticsId',
      title: 'Google Analytics ID',
      group: ['google'],
    },
    {
      type: 'string',
      name: 'googleSiteVerificationId',
      title: 'Google site Verification ID',
      group: ['google'],
    },
    {
      type: 'array',
      name: 'custom',
      title: 'Custom Meta for <head>',
      group: ['custom'],
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'name',
              title: 'Name',
            },
            {
              type: 'string',
              name: 'value',
              title: 'Value',
            },
          ],
        },
      ],
    },
  ],
})
