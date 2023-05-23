import Link from 'next/link';

export default function top() {
  return (
    <div className="text-3xl">
      top
      <br />
      <Link className="text-xl"
        href="/top/register"
      >
        e-mailとpasswordによる認証
      </Link>
    </div>
  )
}