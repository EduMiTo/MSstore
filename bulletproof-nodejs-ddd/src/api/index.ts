import { Router } from 'express';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import auth from './routes/userRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);	
	return app
}