import mongoose from "mongoose"

const tourSchema = mongoose.Schema({
    title:String,
    desc:String,
    user:Object,
    created_by:String,
    tags:[String],
    image:String,
    created_at:{
        type:Date,
        default:new Date()
    },
    likes:{
        type:Number,
        default: 0
    }
})

export default mongoose.model("Tour",tourSchema)