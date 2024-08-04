import {DropIcon, StringIcon} from '@sanity/icons'
import {FunctionComponent} from 'react'
import {BlockStyleProps, defineField, defineType} from 'sanity'
import styled from 'styled-components'

const StyledDescriptor1 = styled.span`
  font-size: 12px !important;
  line-height: 1 !important;
`

const StyledColorPreview = styled.span<{colorPreview: string}>`
  color: ${({colorPreview}) => colorPreview} !important;
`

const Descriptor1: FunctionComponent<BlockStyleProps> = (props) => {
  return <StyledDescriptor1>{props.renderDefault(props)}</StyledDescriptor1>
}

const ColorPreview: FunctionComponent<BlockStyleProps> = (props) => {
  return (
    <StyledColorPreview colorPreview={(props.value as any as {color: string})?.color}>
      {props.renderDefault(props)}
    </StyledColorPreview>
  )
}

export const text = defineType({
  name: 'module.text',
  title: 'Text',
  type: 'object',
  icon: StringIcon,
  fields: [
    defineField({
      name: 'text',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
            annotations: [
              {
                name: 'color',
                title: 'Color',
                type: 'object',
                icon: DropIcon,
                components: {
                  annotation: ColorPreview,
                },
                fields: [
                  {
                    name: 'color',
                    title: 'Color',
                    description: 'HEX, RGBA, etc.',
                    type: 'string',
                  },
                ],
              },
              {
                name: 'font',
                title: 'Font family',
                type: 'object',
                icon: StringIcon,
                fields: [
                  {
                    name: 'font',
                    title: 'Font family',
                    type: 'string',
                    options: {
                      list: [
                        {
                          title: 'Mabry Pro',
                          value: 'mabryPro',
                        },
                        {
                          title: 'Inter',
                          value: 'inter',
                        },
                      ],
                      layout: 'radio',
                    },
                    // The most usefull case for the annotation
                    initialValue: 'inter',
                  },
                ],
              },
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    description: 'Read https://css-tricks.com/use-target_blank/',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
          styles: [
            {
              title: 'Heading 1',
              value: 'h1',
            },
            {
              title: 'Heading 2',
              value: 'h2',
            },
            {
              title: 'Heading 3',
              value: 'h3',
            },
            {
              title: 'Heading 4',
              value: 'h4',
            },
            {
              title: 'Heading 5',
              value: 'h5',
            },
            {
              title: 'Heading 6',
              value: 'h6',
            },
            {
              title: 'Descriptor 1',
              value: 'descriptor1',
              component: Descriptor1,
            },
            {
              title: 'Text 1',
              value: 'text1',
            },
          ],
        },
        {
          type: 'image',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'text',
    },
  },
})
