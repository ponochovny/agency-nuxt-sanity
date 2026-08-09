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
      "seo": { title, description }
    }
  `)

	const {data, pending, error} = await useSanityQuery<PostBySlugQueryResult>(postBySlugQuery, {
		slug,
	})

	return {data, pending, error}
}
