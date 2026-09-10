import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/PostCard";
import { articles } from "@/lib/data";
export default function Articles(){return <><PageHeader title="Articles"/><div className="listing-tools"><label><MagnifyingGlass/><input placeholder="Search..."/></label><span>{articles.length} Articles</span></div><div className="article-list">{articles.map(a=><Link className="article-row" href={`/articles/${a.slug}`} key={a.slug}><img src={a.thumbnail} alt=""/><span><b>{a.title}</b><small>{a.caption}</small></span></Link>)}</div></>}
