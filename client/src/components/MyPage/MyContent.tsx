import React, { useEffect } from 'react'
import { Header } from '@components/commons/Header'
import { SideBar } from '@components/commons/SideBar'
import Copyright from '@components/commons/Copyright'
import { RouteComponentProps } from 'react-router'
import { withPaperContainer } from '@hoc/withPaperContainer'
import { useAppSelector } from '@redux/hooks'
import { useFetchPage } from '@hooks/pagination/useFetchPage'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const MyContent: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();

    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);
    const PaperContainer = withPaperContainer('my-page', contentSubject);
    const { getPapers } = useFetchPage();

    useEffect(() => {
        getPapers(1);
    }, [contentSubject])

    return (
        <main className={classes.main}>
            <Header {...props} />
            <PaperContainer {...props} />
            <SideBar {...props} />
            <Copyright />
        </main>
    )
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', alignItems: 'center',
            overflow: 'auto',
        },
    })
)

export default MyContent