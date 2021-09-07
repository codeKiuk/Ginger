import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@dispatch'
import { useFetchPage } from './useFetchPage';

export const usePagination = () => {
    const { getPapers } = useFetchPage();

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const totalDocs = useAppSelector(state => state.pagination.totalDocs);
    const totalPages = Math.ceil(totalDocs / perPage);
    // 몇 쪽씩 페이지네이션 보여줄지 => ex. 10이면 1~10 11~20 => 나중에 pagination 유저가 설정 바꿀 수 있도록 useState사용
    const [perPageList, setPerPageList] = useState(10);
    const [pageList, setPageList] = useState(Array(0));

    useEffect(() => {
        if (totalDocs === -1) {
            return;
        }
        settingPageList(totalPages);

    }, [totalDocs])

    useEffect(() => {
        if (page % perPageList === 1) {
            settingPageList(totalPages);
        }
        else if (page % perPageList === 0) {
            setPageList(Array.from(new Array(perPageList).keys()).map(x => x + page - perPageList + 1))
        }
    }, [page])

    const settingPageList = (totalPages: number) => {
        if (totalPages < page + (perPageList - 1)) {
            setPageList(Array.from(new Array(totalPages - page + 1).keys()).map(x => x + page));
        } else {
            setPageList(Array.from(new Array(perPageList).keys()).map(x => x + page));
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