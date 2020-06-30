import firebase from '../firebase';
import {
    ICreateBusinessProps,
    ICreateBusinessResponse,
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
}
