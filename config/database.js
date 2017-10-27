const crypto=require('crypto');
crypto.randomBytes(256).toString('hex');
module.exports={
    uri:'mongodb://localhost/smart-blog',
    secret:crypto,
    db:'smart-blog'
};

