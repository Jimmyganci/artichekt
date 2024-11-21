import Image from 'next/image'
import Link from 'next/link'

function SeeAll({path, classname}: {path: string; classname?: string}) {
  return (
    <Link
      className={`text-2xl w-fit mx-auto flex items-center gap-4 justify-center ${classname}`}
      href={path}
    >
      <span className="font-bold">{'tout voir'}</span>
      <span>
        <Image
          src={'./assets/icons/arrow-right.svg'}
          width={50}
          height={50}
          alt="arrow right"
        />
      </span>
    </Link>
  )
}

export default SeeAll
