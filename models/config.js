const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/makeup')
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err)
})
