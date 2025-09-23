import axios from "axios";
import type { Route } from "./+types";
import type { PostsMeta } from "~/Types/postsMeta";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import { useState } from "react";
import PostsFilter from "~/components/PostFilter";

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostsMeta[] }> {
    const url = new URL('/posts-meta.json', request.url);
    try {
        const response = await axios.get(url.href);
        const data = response.data;

        if (!data) {
            throw new Error('Failed to fetch data');
        }

        data.sort((a: PostsMeta, b: PostsMeta) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })

        return { posts: data }
    }

    catch (error) {
        console.error('Error loading project:', error);
        throw error;
    }
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const postPerPage = 3;

    const { posts } = loaderData;

    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query)
        )
    })

    const totalPages = Math.ceil(posts.length / postPerPage);
    const indexOfLast = currentPage * postPerPage;
    const indexOfFirst = indexOfLast - postPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

    return (
        <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
            <h2 className="text-3xl text-white font-bold mb-8">
                blogs
            </h2>

            <PostsFilter searchQuery={searchQuery} onSearchChange={(query) => {
                setSearchQuery(query);
                setCurrentPage(1);
            }} />


            <div className="space-y-8">
                {currentPosts.length === 0 ? (
                    <p className="text-gray-400 text-center">No Posts Found</p>
                ) : (
                    currentPosts.map((post) => (
                        <PostCard post={post} key={post.slug} />
                    )))}
            </div>

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
            )}
        </div>
    );
}

export default BlogPage; ``