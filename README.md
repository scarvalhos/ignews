## Ignews

This is a blog project developed on Rocketseat's Ignite program.

## Technologies

-[Typescript.js](https://www.typescriptlang.org/)
-[Next.js](https://nextjs.org/)
-[Next-Auth](https://next-auth.js.org/)
-[Stripe](https://stripe.com/br)
-[Prismic.io](https://prismic.io/docs)
-[Faunadb](https://fauna.com/)
-[Axios](https://axios-http.com/docs/intro)
-[SASS](https://sass-lang.com/)


## Features

-In the home page the user can subscribe to the blog being directed to the stripe payments api or sign in the with github account;

![Home Page](https://github.com/[scarvalhos]/[ignews]/blob/[main]/assets/home.png?raw=true)

-In the posts page, the user will see a list of all the post on the blog.

![Posts Page](https://github.com/[scarvalhos]/[ignews]/blob/[main]/assets/posts.png?raw=true)

-in the specific post page, if the user does not have a subscription or is not logged in, he will see a small snippet of the post. If not, he will see the full post.

![Post Page](https://github.com/[scarvalhos]/[ignews]/blob/[main]/assets/interna-nao-logado.png?raw=true)

![Post Page](https://github.com/[scarvalhos]/[ignews]/blob/[main]/assets/interna-de-post.png?raw=true)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Then, you need run the stripe webhooks server:

(In this case I need to download the stripe cli and add a new script to package.json to run it)

```bash
    "scripts": {
        "stripe": "stripe-cli/stripe listen  --forward-to http://localhost:3000/api/webhooks",
    }
```

```bash
npm run stripe
# or
yarn stripe
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.