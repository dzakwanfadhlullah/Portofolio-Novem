"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookmarkSimple, CaretLeft, CaretRight, ChatCircle, DotsThree, Heart, PaperPlaneTilt, PushPin, X } from "@phosphor-icons/react";
import { Post, userBySlug } from "@/lib/data";

export function PostCard({post,detail=false}:{post:Post;detail?:boolean}){
 const user=userBySlug(post.author);const [liked,setLiked]=useState(false);const [saved,setSaved]=useState(false);const [open,setOpen]=useState(false);const [index,setIndex]=useState(0);const media=post.images??[];
 return <article className={`post-card${detail?" post-detail-card":""}`}>
  <header className="post-head"><Link href={`/users/${user.slug}`}><img src={user.avatar} alt=""/><span><b>{user.username}{user.verified&&<em>✓</em>}</b><small>{post.pinned&&<><PushPin weight="fill"/> Pinned · </>}{post.date}</small></span></Link><button aria-label="More"><DotsThree weight="bold"/></button></header>
  <p className="caption">{post.caption}</p>
  {(post.video||media.length>0)&&<button className={`post-media media-${media.length}${post.fill?" fill":""}`} onClick={()=>setOpen(true)} aria-label="Open media">
   {post.video?<video src={post.video} poster={media[0]} muted loop autoPlay playsInline/>:media.map((src,i)=><img src={src} alt="" key={src+i}/>)}
   {media.length>1&&<span className="media-count">1/{media.length}</span>}
  </button>}
  <footer className="post-actions"><div><button className={liked?"liked":""} onClick={()=>setLiked(!liked)}><Heart weight={liked?"fill":"regular"}/><span>{liked?"76":"75"}</span></button><Link href={`/posts/${post.slug}`}><ChatCircle/><span>{post.threads??0}</span></Link><button><PaperPlaneTilt/></button></div><button className={saved?"saved":""} onClick={()=>setSaved(!saved)}><BookmarkSimple weight={saved?"fill":"regular"}/></button></footer>
  {post.threads?<Link className="view-thread" href={`/posts/${post.slug}`}>View {post.threads===1?"thread":`${post.threads} threads`}</Link>:null}
  <AnimatePresence>{open&&<motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}><button className="close" onClick={()=>setOpen(false)}><X/></button><div onClick={e=>e.stopPropagation()}>{post.video?<video src={post.video} controls autoPlay playsInline/>:<img src={media[index]} alt=""/>}{media.length>1&&<><button className="prev" onClick={()=>setIndex((index-1+media.length)%media.length)}><CaretLeft/></button><button className="next" onClick={()=>setIndex((index+1)%media.length)}><CaretRight/></button></>}</div></motion.div>}</AnimatePresence>
 </article>
}

export function PageHeader({title,back}:{title:string;back?:boolean}){return <header className="page-header">{back&&<Link href="/" aria-label="Back"><CaretLeft/></Link>}<h1>{title}</h1></header>}
