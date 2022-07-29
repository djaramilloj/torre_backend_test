import people from '../components/people/routing';

const routes = (app: any) => {
    app.use('/people', people);
}

export default routes;