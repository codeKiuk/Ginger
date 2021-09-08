import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { ContentSubject, setContentSubject } from '@redux/modules/commons/contentMenu'

export const useBoardType = () => {
    const dispatch = useAppDispatch();

    const contentSubject = useAppSelector(state => state.contentMenu.contentSubject);

    const switchMenu = (subject: ContentSubject) => {
        switch (subject) {
            case ContentSubject.CLUB_CONTENT:
                dispatch(setContentSubject(subject));
                break;
            case ContentSubject.GROUP_CONTENT:
                dispatch(setContentSubject(subject));
                break;
            case ContentSubject.MY_CONTENT:
                dispatch(setContentSubject(subject));
                break;
            case ContentSubject.MY_COMMENT:
                dispatch(setContentSubject(subject));
                break;
            default:
                break;
        }
    }

    return { contentSubject, switchMenu };
}