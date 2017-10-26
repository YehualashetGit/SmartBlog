const ctypto=require('ctypto');
crypto.randomBytes(256).toString('hex');
module.exports={
    uri:'mongodb://localhost:27017'+this.db,
    secret:ctypto,
    db:'smart-blog'
};

