import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string
    amount: number,
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Inicio | ig.news</title>
      </Head>
      <h1 >

        {product.amount}
    </h1>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1KchISHOpN75BigQwx08xaQj', {
    expand: ['product']
  })
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    }
  }
}
