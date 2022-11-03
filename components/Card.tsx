import type { Post } from '@prisma/client'
import Image from 'next/image'

const Card = ({ post }: { post: Post }) => {
  return (
    <article className="block rounded-xl bg-white p-4 shadow-md transition duration-300 hover:shadow-lg">
      <figure className="relative h-56 w-56">
        <Image
          src={post.images[0]}
          alt={post.name}
          fill
          className="rounded-lg object-cover"
        />
      </figure>
      <div className="flex flex-col py-2">
        <h2 className="text-xl font-semibold text-gray-800">{post.name}</h2>
        <p className="mt-2 text-sm text-gray-600">{post.message}</p>
      </div>
    </article>
  )
}

export default Card
