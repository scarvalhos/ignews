import { render, screen } from '@testing-library/react'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'

import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')
jest.mock('next-auth/react')
jest.mock('next/router')

const post = {
    slug: 'my-new-post',
    title: 'My New Post',
    content: '<p>Post excerpt</p>',
    updatedAt: '31 de março'
}

describe('Post preview Page', () => {
    it('should renders correctly', () => {
        const useSessionMocked = jest.mocked(useSession)

        useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })

        render(<Post post={post} />)

        expect(screen.getByText('My New Post')).toBeInTheDocument()
        expect(screen.getByText('Post excerpt')).toBeInTheDocument()
        expect(screen.getByText('Wanna Continue Reading?')).toBeInTheDocument()
    })

    it('should redirect user for full post when user is scubscribed', async () => {
        const useSessionMocked = jest.mocked(useSession)
        const useRouterMocked = jest.mocked(useRouter)
        const pushMock = jest.fn();
        
        useSessionMocked.mockReturnValueOnce({
            data: {
                activeSubscription: 'fake-subscription',
            },
            status: 'unauthenticated',
        } as any );

        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any )

        render(<Post post={post} />)
        
        expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
    })

    it('should load initial data', async () => {
        const getPrismicClientMocked = jest.mocked(getPrismicClient)

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

        const response = await getStaticProps({
            params: {
                slug: 'my-new-post'
            }
        })

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
