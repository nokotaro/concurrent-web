import { Navigate, useLocation } from 'react-router-dom'

interface Props {
    component: React.ReactNode
    redirect: string
}

export const LoginGuard = (props: Props): JSX.Element => {
    const domain = localStorage.getItem('Domain') ?? ''
    const prvkey = localStorage.getItem('PrivateKey') ?? ''

    if (domain === '' || prvkey === '') {
        if (location.pathname === '/stream' && location.hash !== '') {
            return <Navigate to={'/guest/' + location.hash} state={{ from: useLocation() }} replace={true} />
        }
        return <Navigate to={props.redirect} state={{ from: useLocation() }} replace={true} />
    }

    return <>{props.component}</>
}