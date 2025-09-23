import ReactMarkdown from 'react-markdown';
import type { Route } from './+types';
import type { PostsMeta } from '~/Types/postsMeta';
import axios from 'axios';
import type { BlogPostsDetailsPageProps } from '~/Types/blogPostsDetailsPageProps';
import { Link } from 'react-router';

export async function loader({ request, params }: Route.LoaderArgs) {

    const { slug } = params as { slug: string };
    const url = new URL('/posts-meta.json', request.url);

    try {
        const response = await axios.get(url.href);
        const index = response.data;

        if (!index) {
            throw new Error('Failed to fetch index');
        }

        const postsMeta = index.find((post: PostsMeta) => post.slug === slug);

        if (!postsMeta) throw new Response('Not Found', { status: 404 });

        // dynamically import raw markdown

        const markdown = await import(`../../posts/${slug}.md?raw`)
        return {
            postsMeta,
            markdown: markdown.default
        }
    }

    catch (error) {
        console.error('Error loading project:', error);
        throw error;
    }
}


const BlogDetailsPage = ({ loaderData }: BlogPostsDetailsPageProps) => {

    const { postsMeta, markdown } = loaderData;

    return (
        <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
            <h1 className="text-3xl font-bold text-blue-400 mb-2">
                {postsMeta.title}
            </h1>

            <p className="text-sm text-gray-400 mb-6">
                {new Date(postsMeta.date).toLocaleDateString()}
            </p>

            <div className="prose prose-invert max-w-none mb-12">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>

            <Link to='/blog' className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>Back To Posts</Link>
        </div>
    );
}

export default BlogDetailsPage;