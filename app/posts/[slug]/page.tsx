import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PostCard";
import { PostDetail } from "@/components/PostDetail";
import { posts } from "@/lib/data";
export function generateStaticParams(){return posts.map(({slug})=>({slug}))}
const postTitles:Record<string,string>={"sip-smile-ad":"Sip & Smile Ad","business-class":"Business Class","bmw-m5-ride":"BMW M5 Ride"};
const titleFor=(slug:string)=>postTitles[slug]??slug.split("-").map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
export default async function PostPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=posts.find(p=>p.slug===slug);if(!post)notFound();return <><PageHeader title={titleFor(slug)}/><PostDetail post={post}/></>}
