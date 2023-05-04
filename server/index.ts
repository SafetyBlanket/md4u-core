import './common/env';
import './common/aws';
import Server from './common/server';
import routes from './routes';

const port = parseInt(process.env.PORT ?? '3000');
export default new Server().router(routes).listen(port);
