import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { fromBytesToMegabytes } from '@lib/utils'

import CloseIcon from './icons/CloseIcon'
import UploadIcon from './icons/UploadIcon'

type ExtendedFile = File & { preview: string; path?: string }

interface DropzoneProps {
  setValue?: (...args: any[]) => void
  maxFiles?: number
}

interface PreviewImageProps {
  files: ExtendedFile[]
  onRemove: (fileName: string) => void
}

const PreviewImages = ({ files, onRemove }: PreviewImageProps) => {
  return (
    <ul
      className={clsx(
        'my-4 flex gap-4 overflow-x-auto',
        !files.length && 'hidden'
      )}
    >
      {files.map((file) => (
        <li key={file.preview} className="grid place-content-center text-white">
          <picture className="group relative h-64 w-64 overflow-hidden rounded-lg">
            <div className="absolute top-0 z-10 hidden h-full w-full flex-col items-center bg-black/40 text-white opacity-100 group-hover:flex">
              <button
                onClick={() => onRemove(file.name)}
                className="mt-2 mr-2 self-end"
              >
                <CloseIcon className="h-6 w-6 hover:text-red-500" />
              </button>
              <p className="flex flex-1 items-center">
                {file.path} - {fromBytesToMegabytes(file.size)} MB
              </p>
            </div>
            <Image
              src={file.preview}
              alt={file.name}
              fill
              onLoad={() => {
                URL.revokeObjectURL(file.preview)
              }}
              className="object-cover"
            />
          </picture>
        </li>
      ))}
    </ul>
  )
}

const Dropzone = ({ setValue, maxFiles = 3 }: DropzoneProps) => {
  const [files, setFiles] = useState<ExtendedFile[]>([])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setValue && setValue('images', acceptedFiles)

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      )
    },
    maxFiles,
  })

  const removePreview = (fileName: string) => {
    const newFiles = files.filter((file) => file.name !== fileName)
    setFiles(newFiles)
    setValue && setValue('images', newFiles)
  }

  return (
    <>
      <div
        {...getRootProps()}
        className={clsx(
          'group my-4 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-white',
          'focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-90',
          isDragActive && 'ring ring-primary ring-opacity-90',
          files.length > 0 && 'hidden'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-gray-500">
          <UploadIcon className="mb-3 h-6 w-6 animate-ping" />
          <p className="mb-1 max-w-[15ch] text-center text-sm">
            Sube hasta
            <span className="special-underline font-bold">
              {` ${maxFiles} fotos `}
            </span>
            con la cumpleañera
          </p>
        </div>
      </div>
      <PreviewImages files={files} onRemove={removePreview} />
    </>
  )
}

export default Dropzone
