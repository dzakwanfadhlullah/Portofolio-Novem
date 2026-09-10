import Link from "next/link";
import { Bell, Cube, Flag, GraduationCap, MapPin, Money, User } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/PostCard";
import { notifications } from "@/lib/data";
const Icons={cube:Cube,pin:MapPin,image:Bell,flag:Flag,money:Money,app:Bell,user:User,cap:GraduationCap};
export default function Notifications(){return <><PageHeader title="Notifications"/><div className="notification-list">{notifications.map(([title,age,kind],i)=>{const Icon=Icons[kind];return <Link href={i===2?"/articles/i-worked-in-an-ad-for-sip-smile":i===3?"/store/learn-framer-full-course":"#"} className="notification" key={title}><span className={`notification-icon kind-${kind}`}><Icon weight="fill"/></span><span><b>{title}</b><small>{age}</small></span><i>›</i></Link>})}</div></>}
