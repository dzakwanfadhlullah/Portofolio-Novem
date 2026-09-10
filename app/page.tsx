import { PageHeader, PostCard } from "@/components/PostCard";
import { posts } from "@/lib/data";
export default function Home(){return <><PageHeader title="Posts"/><div className="feed">{posts.map(post=><PostCard key={post.slug} post={post}/>)}</div><div className="spinner"/></>}
