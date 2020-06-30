import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

export function goToCreate(historyProp) {
    historyProp.push('/create');
}

export function goToBusinessLookup(historyProp) {
    historyProp.push('/business-look-up');
}

export function gotToHome(historyProp) {
    historyProp.push('/');
}

export function gotToLogin(historyProp) {
    historyProp.push('/login');
}

export function gotToSignUp(historyProp) {
    historyProp.push('/login');
}
