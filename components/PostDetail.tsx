"use client";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShareNetwork } from "@phosphor-icons/react";
import { Post, userBySlug } from "@/lib/data";

export function PostDetail({post}:{post:Post}){
 const user=userBySlug(post.author);const [liked,setLiked]=useState(false);const media=post.images??[];
 return <article className="single-post"><header><Link href={`/users/${user.slug}`}><img src={user.avatar} alt=""/><span><b>{user.username}{user.verified&&<em>✓</em>}</b><small>{post.date}</small></span></Link></header><p>{post.caption}</p>{(post.video||media.length>0)&&<div className={`single-post-media media-${media.length}`}>{post.video?<video src={post.video} poster={media[0]} controls playsInline/>:media.map(src=><img src={src} alt="" key={src}/>)}</div>}<footer><button className={liked?"liked":""} onClick={()=>setLiked(!liked)}><Heart weight={liked?"fill":"regular"}/><span>Like</span></button><button onClick={()=>navigator.share?.({title:post.caption,url:location.href})}><ShareNetwork/><span>Share</span></button></footer></article>
}
