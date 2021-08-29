import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
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
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const totalDocs = useAppSelector(state => state.pagination.totalDocs);
    const totalPages = Math.ceil(totalDocs / perPage);
    const perPageList = 10; // 몇 쪽씩 페이지네이션 보여줄지 => ex. 10이면 1~10 11~20 / 5면 1~5 6~11 등

    const [pageList, setPageList] = useState(Array(0));

    useEffect(() => {
        // console.log('PAGINATION MOUNTED')
        // console.log('page: ', page)
        // console.log('total docs: ', totalDocs);
        // console.log('total pages: ', totalPages);
        if (totalDocs === -1) {
            return;
        }

        settingPageList(totalPages);

    }, [totalDocs, contentSubject])

    useEffect(() => {
        // page === 1, 11, 21, 31 ... 등 각 pageList (perPageList === 10) 의 첫 번쩨 쪽일때
        if (page % perPageList === 1) {
            settingPageList(totalPages);
        }
        // page === 10, 20, 30 ... 등 각 pageList (perPageList === 10) 의 마지막 쪽일때
        else if (page % perPageList === 0) {
            setPageList(Array.from(new Array(perPageList).keys()).map(x => x + page - perPageList + 1))
        }
        // 1 - 10 에서 첫번째와 마지막 쪽이 아닌 쪽들의 경우 => pageList 변화 필요 없다
        else {

        }
    }, [page])

    const settingPageList = (totalPages: number) => {
        if (totalPages < page + (perPageList - 1)) {
            setPageList(Array.from(new Array(totalPages - page + 1).keys()).map(x => x + page));
        } else {
            setPageList(Array.from(new Array(perPageList).keys()).map(x => x + page));
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
