import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setPage } from '@redux/modules/commons/pagination'
import { ContentSubject } from '@redux/modules/commons/contentMenu'
import contents, { getClubContents, getGroupContents } from '@redux/modules/home/contents'
import { getMyContents } from '@redux/modules/myPage/myContents'
import { getMyComments } from '@redux/modules/myPage/myComments'

import Button from '@material-ui/core/Button'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex', justifyContent: 'center', alignItems: 'center',
        }
    })
)

export const Pagination = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const contentsLoading = useAppSelector(state => state.contents.loading)
    const myCommentsLoading = useAppSelector(state => state.myComments.loading)
    const myContentsLoading = useAppSelector(state => state.myContents.loading);

    const loading = contentsLoading || myCommentsLoading || myContentsLoading;
    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);
    const userID = useAppSelector(state => state.auth.userID);
    // const page = useAppSelector(state => state.pagination.page);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    // const perPage = useAppSelector(state => state.pagination.perPage);
    const totalDocs = useAppSelector(state => state.pagination.totalDocs);
    // const [totalPages, setTotalPages] = useState(1);
    const totalPages = Math.ceil(totalDocs / perPage);

    const [pageList, setPageList] = useState(Array(0));

    useEffect(() => {
        console.log('PAGINATION MOUNTED')
        // setTotalPages(Math.ceil(totalDocs / perPage));
        console.log('page: ', page)
        console.log('total docs: ', totalDocs);
        console.log('total pages: ', totalPages);
        if (totalDocs === -1) {
            return;
        }
        if (page % 10 === 1) {
            // page === 1 or 11 or 21 ... 
            settingPageList(totalPages);
        }

    }, [totalDocs, contentSubject, page])

    const settingPageList = (totalPages: number) => {
        if (totalPages < page + 9) {
            setPageList(Array.from(new Array(totalPages - page + 1).keys()).map(x => x + page));
        } else {
            setPageList(Array.from(new Array(10).keys()).map(x => x + page));
        }
    }

    const onPageClick = (pageNum: number) => {

        switch (contentSubject) {
            case ContentSubject.CLUB_CONTENT:
                dispatch(getClubContents({ page: pageNum, perPage: perPage }));
                break;
            case ContentSubject.GROUP_CONTENT:
                dispatch(getGroupContents({ page: pageNum, perPage: perPage }));
                break;
            case ContentSubject.MY_CONTENT:
                dispatch(getMyContents({ userID: userID, page: pageNum, perPage: perPage }));
                break;
            case ContentSubject.MY_COMMENT:
                dispatch(getMyComments({ userID: userID, page: pageNum, perPage: perPage }));
                break;
            default:
                break;
        }

        setPage(pageNum);
    }

    const onBefore = () => {
        console.log('onBefore page: ', page)
        if (page - 1 === 0) {
            return;
        }
        onPageClick(page - 1);
        setPage(page - 1);

    }

    const onNext = () => {
        if (page + 1 > totalPages) {
            return;
        }
        onPageClick(page + 1);
        setPage(page + 1);
    }

    const renderPageList = () => {
        console.log('pageList.length(): ', pageList.length)
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
            {/* {loading && <Loading />} */}
            {loading && <div></div>}
            {!loading &&
                <>
                    <NavigateBeforeIcon onClick={onBefore} />
                    {renderPageList()}
                    <NavigateNextIcon onClick={onNext} />
                </>
            }
        </div>
    )
}
