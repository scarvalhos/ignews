import { render, screen } from '@testing-library/react'
import { getSession } from 'next-auth/react'

import Post, { getServerSideProps } from '../../pages/posts/[slug]'

import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')
jest.mock('next-auth/react')

const post = {
    slug: 'my-new-post',
    title: 'My New Post',
    content: '<p>Post excerpt</p>',
    updatedAt: '31 de março'
}

describe('Post Page', () => {
    it('should renders correctly', () => {
        render(
            <Post post={post} />
        )

        expect(screen.getByText('My New Post')).toBeInTheDocument()
        expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    })

    it('should redirect user if no subscription if found', async () => {
        const getSessionMocked = jest.mocked(getSession)
        
        getSessionMocked.mockReturnValueOnce(null)

        const response = await getServerSideProps({
            params: {
                slug: 'my-new-post'
            }
        } as any )

        expect(response).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining({
                    destination: '/'
                })
            })
        )
    })

    it('should load initial data', async () => {
        const getSessionMocked = jest.mocked(getSession)
        const getPrismicClientMocked = jest.mocked(getPrismicClient)

        getSessionMocked.mockReturnValueOnce({
            activeSubscription: 'fake-active-subscription'
        } as any )

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [
                        { type: 'heading', text: 'My new post' }
                    ],
                    content: [
                        { type: 'paragraph', text: 'Post content' }
                    ],
                },
                last_publication_date: '03-31-2022',
            }),
        } as any )

        const response = await getServerSideProps({
            params: {
                slug: 'my-new-post'
            }
        } as any )

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My new post',
                        content: '<p>Post content</p>',
                        updatedAt: '31 de março de 2022',
                    }
                }
            })
        )
    })
})
