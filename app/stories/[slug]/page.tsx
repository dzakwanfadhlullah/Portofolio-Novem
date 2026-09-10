import { notFound } from "next/navigation";
import { StoryViewer } from "@/components/StoryViewer";
import { stories } from "@/lib/data";
export function generateStaticParams(){return stories.map(({slug})=>({slug}))}
export default async function StoryPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const story=stories.find(s=>s.slug===slug);if(!story)notFound();return <StoryViewer story={story}/>}
