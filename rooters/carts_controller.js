import express from 'express'
import {productDao,cartsDao} from '../src/daos/index.js'

const {Router}=express

const router=new Router()

router.post("/createCart",async(req,res)=>{
    const cart=await cartsDao.createCart()
    res.send({mesg:'SUCCESS',data:cart})
})
router.delete("/deleteCart",async(req,res)=>{
    const cart=await cartsDao.deleteCart()
    res.send({mesg:'SUCCESS',data:cart})
})
router.get("/showAllItems",async(req,res)=>{
    const cart=await cartsDao.showAllItems()
    res.send({mesg:'SUCCESS',data:cart})
})
router.post("/addItems",async(req,res)=>{
    let {id,idProduct}=req.query
    const product= await productDao.getById(idProduct)
    const cart=await cartsDao.addItems(id,product)
    res.send({mesg:'SUCCESS',data:cart})
})
router.delete("/deleteItems",async(req,res)=>{
    let {id,idProduct}=req.query
    const product= await productDao.getById(idProduct)
    const cart=await cartsDao.deleteItem(id,product)
    res.send({mesg:'SUCCESS',data:cart})
})

export default router