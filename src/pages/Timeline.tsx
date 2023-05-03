import React from 'react';
import { List, Divider, Box } from '@mui/material';
import { Tweet } from '../components/Tweet'
import { RTMMessage, StreamElement, User } from '../model';
import { IuseResourceManager } from '../hooks/useResourceManager';
import { IuseObjectList } from '../hooks/useObjectList';
import { Draft } from '../components/Draft';
import { StreamsBar } from '../components/StreamsBar';

export interface TimelineProps {
    messages: IuseObjectList<StreamElement>;
    userDict: IuseResourceManager<User>;
    messageDict: IuseResourceManager<RTMMessage>;
    currentStreams: string;
    setCurrentStreams: (streams: string) => void;
    reload: () => void;
}

export function Timeline(props: TimelineProps) {

    return (<>
        <StreamsBar 
            currentStreams={props.currentStreams}
            setCurrentStreams={props.setCurrentStreams}
            reload={props.reload}
        />
        <Box sx={{overflowY: "auto", padding: "20px"}}>
            <Box>
                <Draft currentStreams={props.currentStreams} reload={props.reload} />
            </Box>
            <Box sx={{display: 'flex', flex: 1}}>
                <List sx={{flex: 1}}>
                {props.messages.current.map(e =>
                    <React.Fragment key={e.ID}>
                        <Tweet 
                            message={e.Values.id}
                            messageDict={props.messageDict}
                            userDict={props.userDict}
                        />
                        <Divider variant="inset" component="li" sx={{margin: '0 5px'}} />
                    </React.Fragment>
                )}
                </List>
            </Box>
        </Box>
    </>);
}
