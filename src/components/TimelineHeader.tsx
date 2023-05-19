import { type RefObject, useContext, useEffect, useState } from 'react'
import { Paper, IconButton, Box, useTheme, Button } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { Link, type Location as ReactLocation } from 'react-router-dom'
import { ApplicationContext } from '../App'
import { ConcurrentLogo } from './ConcurrentLogo'
import type { ConcurrentTheme } from '../model'

export interface TimelineHeaderProps {
    location: ReactLocation
    scrollParentRef: RefObject<HTMLDivElement>
    setMobileMenuOpen: (state: boolean) => void
}

export function TimelineHeader(props: TimelineHeaderProps): JSX.Element {
    const appData = useContext(ApplicationContext)
    const theme = useTheme<ConcurrentTheme>()

    const [title, setTitle] = useState<string>('')

    useEffect(() => {
        if (!props.location.hash || props.location.hash === '#') {
            setTitle('Home')
            return
        }
        Promise.all(
            props.location.hash
                .replace('#', '')
                .split(',')
                .map((e) => appData.streamDict.get(e))
        ).then((a) => {
            setTitle(
                a
                    .map((e) => e.meta)
                    .filter((e) => e)
                    .map((e) => JSON.parse(e).name)
                    .join(', ')
            )
        })
    }, [props.location.hash])

    const iconColor =
        appData.websocketState === 1
            ? theme.palette.background.contrastText
            : theme.palette.text.disabled

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: theme.palette.primary.main
            }}
        >
            <Box sx={{ background: 'white' }}></Box>
            <Box
                sx={{
                    p: { xs: '', sm: '2px 2px 2px 16px' },
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: '9999px',
                    background: 'none'
                }}
            >
                <IconButton
                    sx={{
                        p: '8px',
                        visibility: { xs: 'inherit', sm: 'hidden' }
                    }}
                    onClick={() => {
                        props.setMobileMenuOpen(true)
                    }}
                >
                    <ConcurrentLogo
                        size="25px"
                        upperColor={iconColor}
                        lowerColor={iconColor}
                        frameColor={iconColor}
                    />
                </IconButton>
                <Button
                    sx={{
                        width: 1,
                        justifyContent: 'flex-left',
                        color: 'primary.contrastText',
                        p: '0',
                        m: '-2px -2px -2px -16px'
                    }}
                    onClick={() => {
                        props.scrollParentRef.current?.scroll({
                            top: 0,
                            behavior: 'smooth'
                        })
                    }}
                    disableRipple
                >
                    <b>{title}</b>
                </Button>
                <IconButton
                    sx={{ p: '8px' }}
                    component={Link}
                    to={`/streaminfo${props.location.hash}`}
                >
                    <InfoIcon sx={{ color: 'primary.contrastText' }} />
                </IconButton>
            </Box>
        </Box>
    )
}
