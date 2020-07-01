import firebase from '../firebase';
import { IndexDB } from './IndexDB';

import {
    ICreateBusinessProps,
    ICreateBusinessResponse,
    IGetBusinessResponse,
    IGetBusinessProps,
} from '../../typings/functions';

export class Functions {
    static async createBusiness(
        props: ICreateBusinessProps
    ): Promise<ICreateBusinessResponse> {
        const createBusiness = firebase
            .functions()
            .httpsCallable('createBusiness');
        const response = await createBusiness(props);
        return response.data;
    }

    static async getBusiness(
        props: IGetBusinessProps
    ): Promise<IGetBusinessResponse> {
        const getBusiness = firebase.functions().httpsCallable('getBusiness');

        const cached = await IndexDB.getBusinessFromCache(props);
        if (cached) {
            return {
                result: cached,
                fromCache: true,
            };
        } else {
            const response = await getBusiness(props);
            IndexDB.setBusinessInCache({
                id: props.id,
                business: response.data.result,
            });
            return response.data;
        }
    }
}
