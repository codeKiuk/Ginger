import { useAppDispatch, useAppSelector } from '@redux/hooks';

export const useBoardLoading = (): boolean => {
    const dispatch = useAppDispatch();

    const contentsLoading = useAppSelector(state => state.contents.loading)
    const myCommentsLoading = useAppSelector(state => state.myComments.loading)
    const myContentsLoading = useAppSelector(state => state.myContents.loading);
    const loading = contentsLoading || myCommentsLoading || myContentsLoading;

    return loading;
}