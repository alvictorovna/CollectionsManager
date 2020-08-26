import Users from '../models/Users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SECRET = 'wertyuio';

export const UserRegister =  async (UserDets, role, res) => {
    const password = await bcrypt.hash(UserDets.password, 12)
    let usernameNotTaken =  await ValidateUsername(UserDets.username);
    if(!usernameNotTaken){
        return res.status(400).json({
            message: `Username is already taken`,
            success: false
        })
    }

    let emailNotTaken =  await ValidateEmail(UserDets.username);
    if(!emailNotTaken){
        return res.status(400).json({
            message: `Email is already taken`,
            success: false
        })
    }

    let newUser = new Users({
        ...UserDets,
        password,
        role,
    })
    await newUser.save();
    return res.status(201).json({
        message: `You are registered!**`,
        success: true
    })

}

export const UserLogin = async (userData, role, res) => {
    let {username, password} = userData;

    const user = await Users.findOne({ username })
    if(!user){
        return res.status(400).json({
            message: `Username is not found`,
            success: false
        })   
        
    }

    if(user.role !== role){
        return res.status(400).json({
            message: `Please make sure you are logging in from the right portal.`,
            success: false
        })
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        const token = jwt.sign({
            user_id: user.id,
            email: user.email,
            role: user.role,
            username: user.username,
        },
        SECRET,
        {expiresIn: '3 days'}
        )

        let result = {
            username: user.username,
            email: user.email,
            role: user.role,
            token,
            expiresIn: 168
        };

        return res.status(200).json({
            ...result,
            message: 'You are now logged in',
            success: true
        })

    } else {
        return res.status(400).json({
            message: 'Incorrect password',
            success: false
        })
    }
}

const ValidateUsername = async username => {
    console.log(username)
    let user = await Users.findOne({ username })
    console.log(user)
    return user ? false : true
}

const ValidateEmail = async email => {
    let user = await Users.findOne({ email })
    return user ? false : true
}
