import type { Product } from '@/api'
import { useParams } from '@solidjs/router'
import { Heart, Loader2, ShoppingCart } from 'lucide-solid'
import { Match, Switch, createResource } from 'solid-js'
import lightBulb from '/Simple_light_bulb_graphic.png'

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const [data /* , { mutate, refetch } */] = createResource(
    params.id,
    id => {
      // todo: implement source
      const p: Product = {
        id: Number.parseInt(params.id),
        model: `model-of-${id}`,
        sku: `sku-of-${id}`,
        mpn: `mpn-of-${id}`,
        quantity: Math.floor(Math.random() * 999),
        stock_status_id: Math.floor(Math.random() * 999),
        image_url: lightBulb,
        manufacturer_id: Math.floor(Math.random() * 999),
        price: Number.parseFloat((Math.random() * 100).toFixed(2)),
        weight_grams: Math.floor(Math.random() * 1000),
        sold_count: Math.floor(Math.random() * 999),
        date_available: new Date(),
        date_added: new Date(),
        date_modified: new Date(),
      }
      return p
    },
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
            <div class='text-4xl'>{data()?.model} · </div>
            <div>sku: {data()?.sku}</div>
            <div> · mpn: {data()?.mpn}</div>
          </div>
          <div class='flex'>
            <img
              class='basis-1/2 max-h-[50vh] object-contain'
              src={data()?.image_url}
              alt='Product Img'
            />
            <div class='basis-1/2 flex flex-col gap-y-2'>
              <div class='font-bold text-4xl'>${data()?.price}</div>
              <div class='font-medium '>{data()?.weight_grams} gram(s)</div>
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
                {data()?.sold_count} sold, {data()?.quantity} left
              </div>
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  )
}
