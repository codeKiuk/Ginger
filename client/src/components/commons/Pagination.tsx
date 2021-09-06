import React from 'react'
import { useBoardLoading } from '@hooks/loading/useBoardLoading'
import { usePagination } from '@hooks/pagination/usePagination'

import Button from '@material-ui/core/Button'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'


export const Pagination = () => {
    const classes = useStyles();

    const loading = useBoardLoading();
    const { page, pageList, onBefore, onNext, onPageClick } = usePagination();

    const renderPageList = () => {
        return pageList.map(pageNum => {

            if (pageNum === page) {
                return (
                    <Button color='primary' variant="outlined" onClick={() => onPageClick(pageNum)}>
                        {pageNum}
                    </Button >
                )
            } else {
                return (
                    <Button onClick={() => onPageClick(pageNum)}>
                        {pageNum}
                    </Button >
                )
            }
        })
    }

    return (
        <div className={classes.container}>
            <NavigateBeforeIcon onClick={onBefore} />
            {!loading && renderPageList()}
            <NavigateNextIcon onClick={onNext} />
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex', justifyContent: 'center', alignItems: 'center',
        }
    })
)
