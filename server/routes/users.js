import * as express from 'express';
import { UserRegister, UserLogin, UserAuth} from '../utils/Auth';

const router = express.Router();


router.post('/register-user', async(req, res) => {
     await UserRegister(req.body, 'user', res)
})

router.post('/register-admin', async(req, res) => {
     await UserRegister(req.body, 'admin', res)
})

router.post('/login-user', async(req, res) => {
     await UserLogin(req.body, 'user', res)
})

router.post('/login-admin', async(req, res) => {
     await UserLogin(req.body, 'admin')
})

router.get('/profile', UserAuth , async(req, res) => {
     res.json(req);
     return res.json('Hello')
})

export default router;