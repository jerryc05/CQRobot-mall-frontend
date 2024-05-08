import { product_detail } from '@/api'
import { useParams } from '@solidjs/router'
import { Heart, Loader2, ShoppingCart } from 'lucide-solid'
import { Match, Switch, createResource } from 'solid-js'

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const [data /* , { mutate, refetch } */] = createResource(
    () => product_detail(Number.parseInt(params.id)),
    {
      name: `resource:products:${params.id}`,
    }
  )

  return (
    <Switch>
      <Match when={data.loading}>
        <Loader2 size='70' class='m-auto animate-spin' />
      </Match>
      <Match when={data.error}>Error: {data.error}</Match>
      <Match when={1}>
        <div class='mx-5'>
          <div class='my-5 flex items-center whitespace-pre'>
            <div class='text-4xl'>
              <span data-test='model'>{data()?.model}</span> ·{' '}
            </div>
            <div>
              sku: <span data-test='sku'>{data()?.sku}</span>
            </div>
            <div>
              {' '}
              · mpn: <span data-test='mpn'>{data()?.mpn}</span>
            </div>
          </div>
          <div class='flex'>
            <img
              class='basis-1/2 max-h-[50vh] object-contain'
              data-test='image_el'
              src={`/cache/${data()?.image_url}`}
              alt='Product Img'
            />
            <div class='basis-1/2 flex flex-col gap-y-2'>
              <div class='font-bold text-4xl'>
                $<span data-test='price'>{data()?.price}</span>
              </div>
              <div class='font-medium '>
                {' '}
                <span data-test='weight_grams'>
                  {data()?.weight_grams}
                </span>{' '}
                gram(s)
              </div>
              <div class='flex items-center gap-x-2'>
                <input
                  type='number'
                  class='w-14 h-10 border-2 border-gray-400 rounded'
                />
                <button type='button' class='p-1 bg-gray-300 rounded'>
                  <ShoppingCart class='inline-block' />
                  Add to Cart
                </button>
                <button type='button' class='p-1 bg-gray-300 rounded'>
                  <Heart />
                </button>
              </div>
              <div>
                <span data-test='sold_count'>{data()?.sold_count}</span> sold,{' '}
                <span data-test='quantity'>{data()?.quantity}</span> left
              </div>
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  )
}
