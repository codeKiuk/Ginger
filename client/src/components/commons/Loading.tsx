import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export const Loading: React.FC<{}> = () => {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', height: '100%',
        }}>
            <CircularProgress />
        </div>
    )
}