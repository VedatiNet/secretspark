import { useRouter } from 'next/router';
export default function Reveal(){const {query}=useRouter();return <main className="reveal"><div className="shootingStar">✦</div><div className="envelope"><div className="seal">✣</div><h1>A SecretSpark is waiting</h1><p>Reveal code: {query.code}</p><a href="/">Create your own</a></div></main>}
