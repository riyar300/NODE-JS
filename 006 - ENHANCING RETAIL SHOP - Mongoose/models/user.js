const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref : 'Product'
            },
            quantity:{
                type: Number,
                required: true
            }
        }]
    }
});

userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() == product._id.toString()
    })

    let newQty = 1;

    const updatedItems = [... this.cart.items];
    if(cartProductIndex>=0){
       
        updatedItems[cartProductIndex].quantity +=1;
    }else{
        updatedItems.push({
            productId: new Object(product._id), 
            quantity: newQty
        })
    }

    this.cart = {
        items : updatedItems
    }

    return this.save()
}

userSchema.methods.deleteItemFromCart = function(productId){

    const updatedCartItems  = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    })

    this.cart = {
        items: updatedCartItems
    }

    return this.save()
}

userSchema.methods.clearCart = function(){
    this.cart = {
        items:[]
    }
    
    return this.save()
}

module.exports = mongoose.model('User', userSchema);