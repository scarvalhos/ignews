import { render, screen } from '@testing-library/react'

import Posts, { getStaticProps } from '../../pages/posts'

import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')

const posts = [
    { slug: 'my-new-post', title: 'My New Post', excerpt: 'Post excerpt',   updatedAt: '31 de março' }
]

describe('Posts Page', () => {
    it('should renders correctly', () => {
        render(
            <Posts posts={posts} />
        )

        expect(screen.getByText('My New Post')).toBeInTheDocument()
    })

    it('should loads initial data', async () => {
        const getPrismicClientMocked = jest.mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: 'my-new-post',
                        data: {
                            title: [
                                { type: 'heading', text: 'My new post' }
                            ],
                            content: [
                                { type: 'paragraph', text: 'Post excerpt' }
                            ],
                        },
                        last_publication_date: '03-31-2022',
                    }
                ]
            })
        } as any )

        const response = await getStaticProps({})

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [{
                        slug: 'my-new-post',
                        title: 'My new post',
                        excerpt: 'Post excerpt',
                        updatedAt: '31 de março de 2022',
                    }]
                }
            })
        )
    })
})
