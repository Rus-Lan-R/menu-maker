import {asyncModuleNames} from '../schemas/modules/_asyncIndex'
import {asyncObject} from './asyncObject'

export const childrenModules = asyncObject(
  () => [
    {
      type: 'reference',
      to: [{type: 'customModule'}],
    },
  ],
  asyncModuleNames,
) as {type: string}[]
