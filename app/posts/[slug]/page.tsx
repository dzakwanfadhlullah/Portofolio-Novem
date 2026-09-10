import { notFound } from "next/navigation";
import { PageHeader, PostCard } from "@/components/PostCard";
import { posts } from "@/lib/data";
export function generateStaticParams(){return posts.map(({slug})=>({slug}))}
export default async function PostPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=posts.find(p=>p.slug===slug);if(!post)notFound();return <><PageHeader title="Post" back/><div className="feed detail-feed"><PostCard post={post} detail/>{post.threads?<div className="thread-line"><span/><p>{post.threads} {post.threads===1?"reply":"replies"}</p></div>:null}</div></>}
