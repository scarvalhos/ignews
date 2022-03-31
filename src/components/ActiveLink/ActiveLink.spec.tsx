import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink Component', () => {
    it('renders correctly', () => {
        render(
            <ActiveLink href='/' activeClassname='active'>
                <a>Home</a>
            </ActiveLink>
        )
    
        expect(screen.getByText('Home')).toBeInTheDocument()
    })
    
    it('adds active class if the link is corrently active', () => {
        render(
            <ActiveLink href='/' activeClassname='active'>
                <a>Home</a>
            </ActiveLink>
        )
    
        expect(screen.getByText('Home')).toHaveClass('active')
    })
})
