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

	const { data, pending, error } = await useSanityQuery<PageQueryResult>(
		pageQuery,
		{
			slug,
		},
		{ key: `page-${slug}` },
	)

	return { data, pending, error }
}