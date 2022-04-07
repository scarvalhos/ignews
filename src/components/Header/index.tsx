import Image from 'next/image'

import { ActiveLink } from '../ActiveLink';

import { SignInButton } from '../SignInButton'

import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="Ignews" />
                <nav>
                    <ActiveLink activeClassname={styles.active} href="/" passHref shouldMatchExactHref={true}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassname={styles.active} href="/posts" passHref shouldMatchExactHref={false}>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}
