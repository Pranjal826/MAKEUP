const mongoose=require('mongoose')
mongoose.connect(
    'mongodb+srv://pranjalshukla245:RgiDeemJ5JkE7DGt@cluster0.vtjn0jv.mongodb.net/Makeup-Site?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
    }
  )
.then(()=>{
    console.log('connected to db')
}
)
.catch((err)=>{
    console.log(err)
})
