import { useParams } from '@solidjs/router'
import { createResource } from 'solid-js'

export default function Product() {
  const params = useParams<{ id: string }>()
  const [data, { mutate, refetch }] = createResource(
    params.id,
    id => {
      return `Data of product ${id}`
    },
    {
      name: `resource:product:${params.id}`,
    }
  )

  return <>{data}</>
}
