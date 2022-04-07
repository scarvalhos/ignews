import { ReactElement, cloneElement } from 'react'
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link'

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassname: string;
    shouldMatchExactHref?: boolean;
}

export function ActiveLink({ children, shouldMatchExactHref, activeClassname, ...rest }: ActiveLinkProps) {
    const { asPath } = useRouter();

    let isActive = false

    if(shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
        isActive = true;
    }

    if(!shouldMatchExactHref
        && (asPath.startsWith(String(rest.href))
        || (asPath.startsWith(String(rest.as)))
    )) {
        isActive = true;
    }

    const className = isActive ? activeClassname : '';

    return (
        <Link {...rest}>
            {cloneElement(children, {
                className,
            })}
        </Link>
    )
}
