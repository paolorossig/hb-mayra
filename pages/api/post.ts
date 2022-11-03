import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { upload } from '@lib/multer'
import { prisma } from '@lib/prisma'

type NextApiRequestWithFormData = NextApiRequest & {
  files?: Express.Multer.File[]
}

const handler = nextConnect()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const posts = await prisma.post.findMany({})

    res.status(200).json(posts)
  })
  .use(upload.array('images'))
  .post(async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
    const files = req.files
    if (!files) throw new Error('Es obligatorio subir al menos 1 imagen')

    const { name, message } = req.body
    const images = files.map((file) => file.path)

    const post = await prisma.post.create({
      data: {
        name,
        message,
        images,
      },
    })

    return res.status(201).json(post)
  })

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
