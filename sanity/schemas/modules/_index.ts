import {button} from './button'
import {link} from './link'
import {text} from './text'

export const modules = [button, link, text]

export const moduleNames = modules.map((module) => ({type: module.name}))
