export const usePage = async (slug: string) => {
	const pageQuery = groq`*[_type == "page" && slug.current == $slug][0] {
        title,
        content[] {
            ...,
            _type == "textImageBlock" => {
                ...,
                "imageUrl": image.asset->url
            },
            _type == "logoMarqueeBlock" => {
                ...,
                "logos": logos[] {
                alt,
                "url": logo.asset->url
                }
            }
            },
            seoGroup {
            metaTitle,
            metaDescription,
            ogImage {
                "imageUrl": ogImage.asset->url
            }
        }
    }`

	const {data, pending, error} = await useSanityQuery<PageQueryResult>(
		pageQuery,
		{
			slug,
		},
		{key: `page-${slug}`},
	)

	return {data, pending, error}
}

export const useSiteSettings = async () => {
	const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
    siteTitle,
    email,
    phone,
    socialLinks,
    promoBanner {
      enabled,
      bannerType,
      message,
      ctaUrl
    }
  }`

	const {data, pending, error} = await useSanityQuery<SiteSettingsQueryResult>(siteSettingsQuery)

	return {data, pending, error}
}

export const usePosts = async () => {
	const allPostsQuery = defineQuery(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "coverUrl": coverImage.asset->url
    }
  `)

	const {data, pending, error} = await useSanityQuery<AllPostsQueryResult>(allPostsQuery)

	return {data, pending, error}
}

export const usePost = async (slug: string) => {
	const postBySlugQuery = defineQuery(`
    *[_type == "post" && slug.current == $slug][0] {
        _id,
      title,
      publishedAt,
      "coverUrl": coverImage.asset->url,
      content,
      "seo": {
        "title": seo.title,
        "description": seo.description
      }
  }
    `)

	const {data, pending, error} = await useSanityQuery<PostBySlugQueryResult>(postBySlugQuery, {
		slug,
	})

	return {data, pending, error}
}

export const useProjects = async () => {
	const allProjectsQuery = defineQuery(`*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    "coverUrl": coverImage.asset->url
  }`)

	const {data, pending, error} = await useSanityQuery<AllProjectsQueryResult>(allProjectsQuery)

	return {data, pending, error}
}

export const useProject = async (slug: string) => {
	const singleProjectQuery = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
    title,
    client,
    task,
    result,
    "coverUrl": coverImage.asset->url,
    "gallery": gallery[] {
      "url": asset->url,
      caption
    },
    service-> {
      title,
      "slug": slug.current,
      badge
    },
    seoGroup {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url
    }
  }`)

	const {data, pending, error} = await useSanityQuery<SingleProjectQueryResult>(
		singleProjectQuery,
		{
			slug,
		},
	)

	return {data, pending, error}
}

export const useServices = async () => {
	const allServicesQuery = defineQuery(`*[_type == "service"] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    badge,
    price,
    timeframe,
    excerpt,
    "coverUrl": coverImage.asset->url
  }`)

	const {data, pending, error} = await useSanityQuery<AllServicesQueryResult>(allServicesQuery)

	return {data, pending, error}
}

export const useService = async (slug: string) => {
	const singleServiceQuery = defineQuery(`*[_type == "service" && slug.current == $slug][0] {
    title,
    badge,
    price,
    timeframe,
    excerpt,
    benefits,
    "coverUrl": coverImage.asset->url,
    "relatedCases": *[_type == "project" && references(^._id)] {
      _id,
      title,
      "slug": slug.current,
      client,
      "coverUrl": coverImage.asset->url
    },
    content[] {
      ...,
      _type == "textImageBlock" => {
        ...,
        "imageUrl": image.asset->url      },
      _type == "logoMarqueeBlock" => {
        ...,
        "logos": logos[] {
          alt,
          "url": logo.asset->url
        }      }
    }
  }`)

	const {data, pending, error} = await useSanityQuery<SingleServiceQueryResult>(
		singleServiceQuery,
		{
			slug,
		},
	)

	return {data, pending, error}
}
