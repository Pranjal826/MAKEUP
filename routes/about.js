const express = require('express');
const router = express.Router();

router.get('/about',async(req,res)=>{
    if(req.user){
    try{
        console.log(req.user)
        res.render('About',{user:req.user,admin:req.user})
    }catch(e){
        console.log(e)
        res.send(e)
    }
}
else{
    res.redirect('/signin')
}
})

module.exports=router;