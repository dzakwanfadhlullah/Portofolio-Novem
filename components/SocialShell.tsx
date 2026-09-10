"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Article, Bell, CaretRight, Heart, House, MagnifyingGlass, MapPin, PaperPlaneTilt, Storefront, UserCircle } from "@phosphor-icons/react";
import { articles, currentUser, notifications, products, stories, users } from "@/lib/data";

const links=[
 {href:"/",label:"Home",icon:House},
 {href:"/?search=1",label:"Search",icon:MagnifyingGlass},
 {href:"/notifications",label:"Notifications",icon:Heart},
 {href:"/articles",label:"Articles",icon:Article},
 {href:"/store",label:"Store",icon:Storefront},
 {href:"/users/iradesai",label:"Profile",icon:UserCircle},
];

function Sidebar({onSearch}:{onSearch:()=>void}){
 const pathname=usePathname(); const [time,setTime]=useState("17:53");
 useEffect(()=>{const tick=()=>setTime(new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:"Asia/Kolkata"}).format(new Date()));tick();const id=setInterval(tick,30000);return()=>clearInterval(id)},[]);
 return <aside className="sidebar">
   <Link href="/users/iradesai" className="identity"><img src={currentUser.avatar} alt="Ira Desai"/><span><b>Ira Desai</b><small>Design & Software</small></span></Link>
   <nav className="side-links">{links.map(({href,label,icon:Icon})=>{const active=label==="Home"?pathname==="/":label==="Profile"?pathname.startsWith("/users"):label==="Search"?false:pathname.startsWith(href);return label==="Search"?<button key={label} onClick={onSearch}><Icon weight="bold"/><span>{label}</span></button>:<Link key={label} className={active?"active":""} href={href}><Icon weight={active?"fill":"bold"}/><span>{label}</span></Link>})}</nav>
   <div className="clock"><strong>{time}</strong><span>IND</span><b><i>Sep</i>10</b></div>
 </aside>
}

function Aside(){return <aside className="aside">
 <div className="story-strip">{stories.map(s=><Link href={`/stories/${s.slug}`} key={s.slug}><span><img src={s.cover} alt=""/></span><small>{s.title}</small></Link>)}</div>
 <div className="aside-rule"/>
 <section className="aside-card"><header><b>Articles</b><Link href="/articles"><CaretRight/></Link></header>{articles.filter(a=>a.featured).slice(0,2).map(a=><Link className="aside-row" href={`/articles/${a.slug}`} key={a.slug}><img src={a.thumbnail} alt=""/><span><b>{a.title}</b><small>{a.caption}</small></span></Link>)}</section>
 <section className="aside-card"><header><b>Notifications</b><Link href="/notifications"><CaretRight/></Link></header>{notifications.slice(0,2).map(([title,age,kind])=><div className="aside-row" key={title}><span className="mini-icon">{kind==="pin"?<MapPin weight="fill"/>:<Bell weight="fill"/>}</span><span><b>{title}</b><small>{age}</small></span></div>)}</section>
 <section className="aside-card chat"><header><b>Let&apos;s talk</b></header><div className="bubble"><img src={currentUser.avatar} alt=""/><span>If you like my work then I am open to opportunities :) ✌️</span></div><div className="message-box"><span>Send Message</span><PaperPlaneTilt weight="fill"/></div></section>
 </aside>}

function BottomNav(){const pathname=usePathname();const items=links.filter(l=>l.label!=="Search");return <nav className="bottom-nav">{items.map(({href,label,icon:Icon})=>{const active=href==="/"?pathname==="/":pathname.startsWith(href);return <Link href={href} className={active?"active":""} key={label}><Icon weight={active?"fill":"bold"}/><span>{label}</span></Link>})}</nav>}

function SearchOverlay({close}:{close:()=>void}){const [query,setQuery]=useState("");const q=query.toLowerCase();const results=[...users.map(x=>({label:x.name,sub:`@${x.username}`,href:`/users/${x.slug}`,image:x.avatar})),...articles.map(x=>({label:x.title,sub:"Article",href:`/articles/${x.slug}`,image:x.thumbnail})),...products.map(x=>({label:x.title,sub:x.type,href:`/store/${x.slug}`,image:x.image}))].filter(x=>q&&`${x.label} ${x.sub}`.toLowerCase().includes(q)).slice(0,7);return <motion.div className="search-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={close}><motion.div initial={{scale:.97,y:-8}} animate={{scale:1,y:0}} onClick={e=>e.stopPropagation()}><header><MagnifyingGlass/><input autoFocus placeholder="Search" value={query} onChange={e=>setQuery(e.target.value)}/><button onClick={close}>Cancel</button></header><section>{query&&!results.length?<p>No results found.</p>:results.map(r=><Link href={r.href} onClick={close} key={r.href}><img src={r.image} alt=""/><span><b>{r.label}</b><small>{r.sub}</small></span><CaretRight/></Link>)}</section></motion.div></motion.div>}

export function SocialShell({children}:{children:ReactNode}){const pathname=usePathname();const [search,setSearch]=useState(false);return <div className="social-shell"><div className="shell-grid"><Sidebar onSearch={()=>setSearch(true)}/><AnimatePresence mode="wait"><motion.main className="main-column" key={pathname} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.18,ease:"easeOut"}}>{children}</motion.main></AnimatePresence><Aside/></div><BottomNav/><AnimatePresence>{search&&<SearchOverlay close={()=>setSearch(false)}/>}</AnimatePresence></div>}
