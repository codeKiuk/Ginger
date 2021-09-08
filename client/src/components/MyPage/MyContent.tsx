import React, { useEffect } from 'react'
import Copyright from '@components/commons/Copyright'
import Header from '@commons/Header';
import SideBar from '@components/commons/SideBar';
import { RouteComponentProps } from 'react-router'
import { Pagination } from '@components/commons/Pagination'
import { withPaperContainer } from '@hoc/withPaperContainer'
import { useAppSelector } from '@redux/hooks'
import { useFetchPage } from '@hooks/pagination/useFetchPage'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const MyContent: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();

    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);
    const PaperContainer = withPaperContainer(contentSubject);
    const { getPapers } = useFetchPage();

    useEffect(() => {
        getPapers(1);
    }, [contentSubject])

    return (
        <main className={classes.main}>
            <Header {...props} />
            <PaperContainer {...props} />
            <Pagination />
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