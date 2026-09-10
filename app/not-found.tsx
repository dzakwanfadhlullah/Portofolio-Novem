import Link from "next/link";
import { X } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/PostCard";
export default function NotFound(){return <><PageHeader title="Not found"/><div className="empty-state"><span><X weight="bold"/></span><h2>Page not found</h2><p>This link might be broken or the page must<br/>have been removed.</p><Link href="/">Home</Link></div></>}
