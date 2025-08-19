
const adminVerification=(req,res,next)=>{
    const token="dummyToken";//mainly we take here req.body.token but for practise we are taking a  dummyToken
    const isAdmin=token==="dummyToken";
    if(!isAdmin){
        res.status(401).send("There  is a error");
    }
    else next();
}

const userVerification=(req,res,next)=>{
    const token="dummyTokenForUser";//mainly we take here req.body.token but for practise we are taking a  dummyToken
    const isUser=token==="dummyTokenForUser";
    if(!isUser){
        res.status(401).send("There  is a error");
    }
    else next();
}
module.exports={adminVerification,userVerification};