import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@dispatch'
import { useFetchPage } from './useFetchPage';
import { ContentSubject } from '@redux/modules/commons/contentMenu';

export const usePagination = () => {
    const { getPapers } = useFetchPage();

    const contentsCount = useAppSelector(state => state.contents.contentsCount);
    const myContentsCount = useAppSelector(state => state.myContents.contentsCount);
    const myCommentsCount = useAppSelector(state => state.myComments.commentsCount);
    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);

    const [page, setPage] = useState(1);
    const perPage = useAppSelector(state => state.pagination.perPage);
    // const totalDocs = useAppSelector(state => state.pagination.totalDocs);
    const [totalDocs, setTotalDocs] = useState(-1);
    const totalPages = Math.ceil(totalDocs / perPage);
    // 몇 쪽씩 페이지네이션 보여줄지 => ex. 10이면 1~10 11~20 => 나중에 pagination 유저가 설정 바꿀 수 있도록 useState사용
    const [perPageList, setPerPageList] = useState(10);
    const [pageList, setPageList] = useState(Array(0));

    useEffect(() => {
        if (totalDocs === -1) {
            return;
        }

        if (page === 1) {
            settingPageList(totalPages);
        }
        else {
            setPage(1);
        }
    }, [totalDocs])

    useEffect(() => {
        switch (contentSubject) {
            case ContentSubject.CLUB_CONTENT:
                setTotalDocs(contentsCount);
                break;
            case ContentSubject.GROUP_CONTENT:
                setTotalDocs(contentsCount);
                break;
            case ContentSubject.MY_CONTENT:
                setTotalDocs(myContentsCount);
                break;
            case ContentSubject.MY_COMMENT:
                setTotalDocs(myCommentsCount);
                break;
            default:
                break;
        }
    }, [contentsCount, myContentsCount, myCommentsCount])

    useEffect(() => {
        setPage(1);
    }, [contentSubject])

    useEffect(() => {
        settingPageList(totalPages);
    }, [page])

    const settingPageList = (totalPages: number) => {
        if (page % perPageList === 1) {
            if (totalPages <= page + (perPageList - 1)) {
                setPageList(Array.from(new Array(totalPages - page + 1).keys()).map(x => x + page));
            }
            else {
                setPageList(Array.from(new Array(perPageList).keys()).map(x => x + page));
            }
        }
        else if (page % perPageList === 0) {
            setPageList(Array.from(new Array(perPageList).keys()).map(x => x + page - perPageList + 1))
        }
        else {
            const gap = Math.floor(page / perPageList);
            const startIdx = gap * perPageList + 1;
            if (totalPages <= startIdx + perPageList - 1) {
                setPageList(Array.from(new Array(totalPages - startIdx + 1).keys()).map(x => x + startIdx));
            }
            else {
                setPageList(Array.from(new Array(perPageList).keys()).map(x => x + startIdx));
            }

        }
    }

    const onPageClick = async (pageNum: number) => {
        setPage(pageNum);
        getPapers(pageNum);
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

    return { page, perPage, pageList, onBefore, onNext, onPageClick }
}