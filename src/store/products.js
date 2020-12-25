import firebase from 'firebase/app'
import Product from './products_help.js'
export default {

    state: {
        selectedPost: {},
        timeInLastPost: null,
        products: [],
        uploadImgValue: null,
        minPrice:0,
        maxPrice:0,
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload;
        },
        setMinPrice(state, payload) {
            state.minPrice = payload;
        },
        setMaxPrice(state, payload) {
            state.maxPrice = payload;
        },
        setPricesForFilter(state, payload){
            state.minPrice = payload.min;
            state.maxPrice = payload.max;
        }
    },
    actions: {
        async getProducts({ commit }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                let  products = await firebase.database().ref('products').once('value')
                 products = products.val();
                let productsArray = [];
                let minPrice = -1; 
                let maxPrice = 0; 
                Object.keys(products).forEach(key => {
                    const p = products[key]
                    productsArray.push(
                        new Product(
                            p.title,
                            p.description,
                            p.imageUrl,
                            p.price,
                            p.location,
                            key,
                        )
                    )
                    
                    if((p && minPrice>p.price)||minPrice==-1) minPrice=p.price
                    if(p && maxPrice<p.price) maxPrice=p.price
                })

                // postsArray = postsArray.sort((a, b) => a.time < b.time ? 1 : -1)
                commit('setPricesForFilter', {min:minPrice,max:maxPrice})
                commit('setProducts',  productsArray)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async saveProduct({ commit}, payload) {
            commit('clearError')
            commit('setLoading', true)
            const price = +((+payload.price).toFixed(2))                        
            if(isNaN(price)){
                commit('setError', 'price error')
                return
            }
            try {
                const storageRef = firebase.storage().ref(`images/${Date.now()}/`).put(payload.imageData);
                storageRef.on("state_changed",
                    (snapshot) => {
                    },
                    (error) => {
                        console.log(error.message);
                    },
                    () => {
                        storageRef.snapshot.ref.getDownloadURL().then((urlImg) => {
                            const newProduct = new Product(
                                payload.title,
                                payload.description,
                                urlImg,
                                price,
                                payload.location,
                                null
                                //firebase.database.ServerValue.TIMESTAMP
                            );
                            firebase.database().ref('products').push(newProduct);
                            console.log('ok')
                        });
                    }
                );
              
                commit('setLoading', false);
               
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async uploadImg({ commit, getters, dispatch }, payload) {
            console.log('startUpload')
            try {
                
            } catch (error) {
                throw error
            }

         },
      
    },

    getters: {
        products: state => {
            return state.products
        },
        minPrice: state => {
            return state.minPrice
        },
        maxPrice: state => {
            return state.maxPrice
        },
    }
}