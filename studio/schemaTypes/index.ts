import page from './page'
import {heroBlock} from './blocks/heroBlock'
import {featuresBlock} from './blocks/featuresBlock'
import {textImageBlock} from './blocks/textImageBlock'
import {ctaBlock} from './blocks/ctaBlock'
import {logoMarqueeBlock} from './blocks/logoMarqueeBlock'
import post from './post'

export const schemaTypes = [
  // documents
  page,
  post,
  // blocks
  heroBlock,
  featuresBlock,
  textImageBlock,
  ctaBlock,
  logoMarqueeBlock,
]
