export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const fromBytesToMegabytes = (bytes: number) =>
  Math.round((bytes / 1024 / 1024) * 100) / 100
