const ctypto=require('ctypto');
crypto.randomBytes(256).toString('hex');
module.exports={
    uri:'mongodb://localhost:27017/smart-blog',
    secret:crypto,
    db:'smart-blog'
};

