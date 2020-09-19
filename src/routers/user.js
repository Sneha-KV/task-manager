const express = require('express');
const multer = require('multer');

const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendGoodByeEmail } = require('../emails/account');

const router = new express.Router();



// User post request - create user
router.post('/users', async (req, res)=> {
    const user = new User(req.body);
    console.log(req.body);
    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken()
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error)
    }

    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((error)=> {
    //     res.status(400).send(error)
        
    // });
})

// log in 
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.send({ user, token});
    } catch (error) {
        res.status(400).send('Unable to Login')
    }
 })


 // Log out 
router.post('/users/logout',auth, async (req, res) => {
    try {
        // search for the token of that session and log out of that
        req.user.tokens = req.user.tokens.filter((token)=> {
            return token.token !== req.token;
        });

        await req.user.save();
        res.send()
    } catch(error) {
        res.send('User already logged out');
    }
})

// Logout of all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send('Successfully logged out of all the sessions');

    } catch(error) {
        res.status(500).send(error);
    }
})


// Read -> Get all USERS
// router.get('/users', async (req, res)=> {
//     const getUsers = await User.find({});
//     try {
//         res.send(getUsers);
//     } catch(error) {
//         res.status(500).send('Service Down');
//     }
// });

// read my profile, Authentication using middle ware
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})
// Read -> Get one user

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const findUser = await User.findById(_id);
        if(!findUser) {
                    return res.status(404).send('User not found');
                }
        
        res.send(findUser);
    } catch(error) {
        res.status(404).send('Sommething is wrong with the search, try again');
    }

})

// Update a user - Only your profile
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if(!isValidOperation) {
        return res.status(400).send('Invalid Updates')
    }
    try {
        // if pwd is updated, hash it first  -> for that we perform save operation instead of update
        // const user = await User.findById(_id);
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});

        res.send(req.user);
    } catch(error) {
        res.status(400).send(error)
    }
})

//Delete User
router.delete('/users/me',auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        
        await req.user.remove();
        // send good bye email once removed
        sendGoodByeEmail(req.user.email, req.user.name);
        
        res.send(req.user);
    } catch (error) {
        res.status(500).send()
    }
})


const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) return cb(new Error('Please upload images'));

        return cb(undefined, true)
    }
})
// upload profile picture
router.post('/users/me/avatar',auth, upload.single('avatar'), async (req, res) => {
    // if dest is not set in multer, it will pass img data to this function
    req.user.avatar = req.file.buffer;
    // const buffer = await (req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer(); -> with sharp
    
    await req.user.save();
// <img src="data:image/png;base64,Binary-data"/> -> access the image like this, Binary-data is in avatar field
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

// Delete profile picture
router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send()
    } catch(error) {
        res.status(500).send(error);
    }
   
})

// View profile picture 
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar) throw new Error();

        res.set('Content-Type', 'image/jpg');
        // res.set('Content-Type', 'image/png'); -> after sharp is installed
        res.send(user.avatar);
    } catch(error){
        res.status(400).send();
    }
})

module.exports = router;
