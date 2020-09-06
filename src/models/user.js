const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Task = require('./task')

// pass the schema -> the second paramenter to model is converted to Schema by mongoose
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
          
             if(value.toLowerCase().includes('password')) {
                throw new Error('Password should not include the word - password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Negative age is not allowed')
            }
        }
    },

    tokens: [{
        token: {
            type: String,
        required: true
        }
    }]
}, {
    timestamps: true
})

// Create a virtual relation between user and Tasks
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// JWT tokens
userSchema.methods.generateAuthToken = async function () {

    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;

}

// Send only necessary info to back to the users. Password, tokens not needed

userSchema.methods.toJSON =  function () {
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// Login setup
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to Login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) { throw new Error('Unable to Login'); }

    return user;
 }


// hash the password before saving the value/ user -> Middleware in mongoose
userSchema.pre('save', async function(next) {
    const user = this;
    console.log('Hashing the pwd');
    // hash the password only if it is unhashed
    if(user.isModified('password')) {
        user.password =  await bcrypt.hash(user.password, 8);
    }
    next(); // Must run next fn so that the next actions after this fn gets executed
})

// Delete User tasks when user is deleted
userSchema.pre('remove', async function (next) {
    const user = this;
    
    await Task.deleteMany({owner: user._id})

    next();
})

// create Model (constructor)
const User = mongoose.model('User', userSchema)

// export the module
module.exports = User;
