const SurdataSchema = new Schema ({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    Age :{
        type : Number,
        required : true
    },
    ongoing_prescrip :{
        type : String,
        required : true
    }
}); 

const  Surdata = mongoose.model('Surdata', SurdataSchema)