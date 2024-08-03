import {moduleNames} from './_index'
import {asyncObject} from '../../lib/asyncObject'

export const asyncModuleNames = asyncObject(() => moduleNames, []) as {type: string}[]
