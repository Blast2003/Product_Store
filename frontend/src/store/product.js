import {create} from "zustand"

export const useProductStore = create((set) =>({ // do something => return the  object
    products: [],
    setProduct: (products) => set({products}),

    createProduct: async(newProduct)=>{
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return  {
                success: false,   msg: "Please fill all the fields"
            }
        }
        // important
            const res = await fetch("/api/product/create", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            })
            const data = await res.json();
            console.log(data)
            if(data.success === true){
                set((state) => ( {products: [...state.products, data.data]}) )
                return  {
                    success: true,   msg: "Product created successfully"
                } 
            } else{
                return  {
                    success: false,   msg: `Server error when creating product`
                }
            }
    
    },

    fetchProducts: async()=>{
        // important
            const res = await fetch("/api/product/getAllProducts")
            const data = await res.json();
            console.log(data)
            if(data.success === true){
                set({ products: data.data });  // only get => don't change state => don't set state
                return  {
                    success: true,   msg: "Get All Product Successfully"
                } 
            } else{
                return  {
                    success: false,   msg: `Server error when getting all product`
                }
            }
    
    },

    deleteProduct: async(id)=>{
        // important
            const res = await fetch(`/api/product/delete/${id}`, {
                method: "DELETE",

            })
            const data = await res.json();
            console.log(data)
            if(data.success === true){
                set((state) => ( {products: state.products.filter(product => product._id !== id) } ))
                return  {
                    success: true,   msg: "Delete Product Successfully"
                } 
            } else{
                return  {
                    success: false,   msg: data.msg
                }
            }
    
    },

    updateProduct: async(id, updatedProduct)=>{
        // important
            const res = await fetch(`/api/product/update/${id}`, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),

            })
            const data = await res.json();
            console.log(data)
            if(data.success === true){
                set((state) => ({
                    // check id (from frontend) === with product._id (from middle man in this function which has been fetch from backend server)
                    products: state.products.map((product) => (product._id === id ? data.data : product))
                }));
                return  {
                    success: true,   msg: "Update Product Successfully"
                } 
            } else{
                return  {
                    success: false,   msg: data.msg
                }
            }
    
    },



}))
