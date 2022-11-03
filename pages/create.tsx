import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Layout from '@components/Layout'
import Dropzone from '@components/Dropzone'

interface FormValues {
  name: string
  message: string
  images?: FileList
}

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { register, handleSubmit, setValue } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    if (!data?.images?.length) {
      return alert('Debes seleccionar al menos una imagen')
    }

    const formData = new FormData()
    const keys = Object.keys(data) as Array<keyof FormValues>

    keys.forEach((key) => key !== 'images' && formData.append(key, data[key]))
    Array.from(data.images).forEach((image) => formData.append('images', image))

    const response = await fetch('/api/post', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      return alert('Ha ocurrido un error. Vuelve a intentarlo')
    }

    return router.push('/')
  }

  return (
    <Layout>
      <h2 className="mb-2 text-xl font-semibold">Crea tu publicación</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <div className="flex flex-col">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            autoComplete="off"
            {...register('name', { required: true })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message">Mensaje</label>
          <textarea
            {...register('message', { required: true })}
            className="h-28"
          />
        </div>
        <Dropzone setValue={setValue} />
        <button
          type="submit"
          className="rounded-lg bg-primary py-2 px-3 text-white"
        >
          Crear
        </button>
      </form>
    </Layout>
  )
}

export default CreatePage
