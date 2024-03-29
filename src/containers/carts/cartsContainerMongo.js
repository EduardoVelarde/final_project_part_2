import config from '../../config.js'
import mongoose from 'mongoose'
import Product from '../products/containerProducts.js';

const Schema = mongoose.Schema;
const model = mongoose.model;

class Cart{
    constructor(tableReference,tableName){
        // database connection to mongoDB
        mongoose.connect(config.mongoose.database);
        mongoose.connection.on("open",()=>{
         console.log('database connection SUCCESS')
        })
        mongoose.connection.on("error",()=>{
        console.log('database connection ERROR')
        })
        //Note always use the world this for variable declared in the constructor since is require to use the value 
        //thorught the class
        this.cartSchema=new Schema({
            products:[{ type: Schema.Types.ObjectId, ref: tableReference.name }]
        })
    
        this.Cart=model(tableName,this.cartSchema);
    }
    async createCart() {
        let cart1 = new this.Cart()
        let newCart = await cart1.save()
        return newCart;
    }
    async deleteCart(cartId) {
        try{
            let cartDeleted = this.Cart.findByIdAndDelete({_id:id});
            if(!cartDeleted){
                return "Card was not found"
            }
            return "Card has been successfully deleted"
        }catch(err){
            return "Card was not found"
        }
    }
    async showAllItems() {
        try{
            let query = this.Cart.find({}).populate('product')
            return query;
        }catch(err){
            console.log(err)
            return "theres no items yet to display"
        }
        
    }
    async addItems(cartId, product) {
        try{
            let cartFound=await this.Cart.findById({_id:cartId});
            cartFound.products.push(product)
            return await cartFound.save();
        }catch(err){
            return "something went wrong =("
        }
        
    }
    async deleteItem(idCart, product) {
        try{
            let cartFound=await this.Cart.findById({_id:idCart});
            //Populate saves the refference of the product which has already been created
            // in the other route
            cartFound.products=cartFound.products.filter(x=>x.toString()!=product._id.toString())
            return await cartFound.save();
        }catch(err){
            console.log(err)
            return "something went wrong =("
        }
    }
}

export default  Cart