import type { NextPage } from 'next'
import Layout from '@components/Layout'
import Dropzone from '@components/Dropzone'
import { useForm } from 'react-hook-form'

interface FormValues {
  name: string
  message: string
  images?: FileList
}

const CreatePage: NextPage = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    if (!data?.images?.length) {
      return alert('Debes seleccionar al menos una imagen')
    }

    console.log(data)
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
            className="h-24"
          />
        </div>
        <Dropzone setValue={setValue} />
        <button
          type="submit"
          className="rounded-lg bg-blue-500 py-2 px-3 text-white"
        >
          Crear
        </button>
      </form>
    </Layout>
  )
}

export default CreatePage
