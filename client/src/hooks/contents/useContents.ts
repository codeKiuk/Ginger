import { useAppDispatch } from '@redux/hooks';
import { useBoardType } from './useBoardType'


export const useContents = () => {
    const dispatch = useAppDispatch();
    const { contentSubject } = useBoardType();


}