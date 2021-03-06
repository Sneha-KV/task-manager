// ./node_modules/.bin/env-cmd -f ./config/dev.env node src/index.js
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const sgMail = require('@sendgrid/mail')


// set api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fromMail = 'project14218@gmail.com'
// for a welcome mail
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: fromMail,
        subject: 'Welcome to the Task Application',
        text: `Hello ${name}, Thanks for hopping in! Have a great day!`
    })
}

// for account cancellation
const sendGoodByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: fromMail,
        subject: `Good Bye ${name}!`,
        text: `Hello ${name}, you haave cancelled the application, Let us know if there anything more we could have done`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail
}



// console.log('test2')
// const msg = {
//     to: 'project14218@gmail.com',
//     from: 'project14218@gmail.com',
//     subject: 'This is my first mail',
//     text: 'I hope this one actually gets to you'
//     // html: '<h2> Test Mail </h2>'
// };
// // console.log(msg);
// sgMail.send(msg);
// test.then((res)=> {
//     try {
//         console.log('0---')
//     } catch (e) {
//         console.log('1')
//     }
// }, (e) => {
//     console.log('------HELLOOO------')
//     console.log(e);
// })