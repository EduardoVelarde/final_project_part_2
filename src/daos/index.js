import DaoProductsFirebase from './products/DaoProductsFirebase.js'

let productDao
let cartsDao
switch('firebase'){
    case 'json':
            const { default:DaoCartFiles}=await import('./carts/DaoCartsFiles.js')
            const { default:DaoProductsFiles}=await import('./products/DaoProductsFiles.js')
            productDao= new DaoProductsFiles()
            cartsDao=new DaoCartFiles()
            break
        case 'mongo':
            const { default:DaoCartsMongo}=await import('./carts/DaoCartMongo.js')
            const { default:DaoProductsMongo}=await import('./products/DaoProductsMongo.js')
            productDao= new DaoProductsMongo()
            cartsDao=new DaoCartsMongo()
            break
            case 'firebase':
                const { default:DaoCartsFirebase}=await import('./carts/DaoCartFirebase.js')
                const { default:DaoProductsFirebase}=await import('./products/DaoProductsFirebase.js')
                productDao= new DaoProductsFirebase()
                cartsDao=new DaoCartsFirebase()
                break
}

export {productDao,cartsDao}