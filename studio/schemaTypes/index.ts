import blockContent from './blockContent'
import page from './page'
import {heroBlock} from './blocks/heroBlock'
import {ctaBlock} from './blocks/ctaBlock'
import {featuresBlock} from './blocks/featuresBlock'
import {textImageBlock} from './blocks/textImageBlock'
import {logoMarqueeBlock} from './blocks/logoMarqueeBlock'
import siteSettings from './siteSettings'
import project from './project'
import post from './post'
import service from './service'

export const schemaTypes = [
  siteSettings,
  blockContent,
  page,
  post,
  project,
  service,
  heroBlock,
  textImageBlock,
  featuresBlock,
  ctaBlock,
  logoMarqueeBlock,
]
