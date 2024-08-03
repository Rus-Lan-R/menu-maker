import {button} from './button'
import {link} from './link'

export const modules = [button, link]

export const moduleNames = modules.map((module) => ({type: module.name}))
