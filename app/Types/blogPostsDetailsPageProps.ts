import type { PostsMeta } from "./postsMeta"

export type BlogPostsDetailsPageProps= {
    loaderData:{
        postsMeta: PostsMeta,
        markdown: string
    }
}