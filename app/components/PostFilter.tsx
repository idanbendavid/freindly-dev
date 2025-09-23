import type { PostFilter } from "~/Types/PostFilterProps";

const PostsFilter = ({ searchQuery, onSearchChange }: PostFilter) => {
    return (
        <div className="mb-6">
            <input placeholder="Search Posts" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} type="text" className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus: outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
    );
}

export default PostsFilter;