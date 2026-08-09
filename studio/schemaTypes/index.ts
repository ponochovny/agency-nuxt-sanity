import page from './page'
import blockContent from './blockContent'
import {heroBlock} from './blocks/heroBlock'
import {featuresBlock} from './blocks/featuresBlock'
import {textImageBlock} from './blocks/textImageBlock'
import {ctaBlock} from './blocks/ctaBlock'
import {logoMarqueeBlock} from './blocks/logoMarqueeBlock'
import siteSettings from './siteSettings'
import post from './post'
import project from './project'
import service from './service'

export const schemaTypes = [
  siteSettings,
  // documents
  page,
  post,
  project,
  service,
  // blocks
  blockContent,
  heroBlock,
  featuresBlock,
  textImageBlock,
  ctaBlock,
  logoMarqueeBlock,
]
