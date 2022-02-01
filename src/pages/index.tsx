import { GetStaticProps } from 'next'
import Head from 'next/head'
import { FaHeart } from 'react-icons/fa'

import { stripe } from '../services/stripe'
import { SubscribeButton } from '../components/SubscribeButton'

import styles from '../styles/home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Início | Ignews</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span><FaHeart color="#eba417" /> Hey, Welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all publications <br/>
            <span>For {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JkGGXL1pgaJXKwg8pJ7OBHI')

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
    },
    revalidate: 60 * 60 / 24 // 24hours
  }
}