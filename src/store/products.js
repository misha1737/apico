import firebase from 'firebase/app'
import Product from './products_help.js'
export default {

    state: {
        selectedPost: {},
        timeInLastPost: null,
        products: [],
        uploadImgValue: null,
    },
    mutations: {
        // loadPosts(state, payload) {
        //     payload.forEach(key => {
        //         state.posts.push(key)
        //     });
        //     state.timeInLastPost = payload[payload.length - 1].time;
        //     state.posts.pop();
        // },
        setProducts(state, payload) {
            state.products = payload;
        },
        // updateImg(state, payload) {
        //     state.selectedPost.url = payload;
        // },
        // uploadImgValue(state, payload){
        //     state.uploadImgValue=payload;
        // }

    },
    actions: {
        async getProducts({ commit, getters }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                let  products = await firebase.database().ref('products').once('value')
                 products = products.val();
                let productsArray = [];
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
                })

                // postsArray = postsArray.sort((a, b) => a.time < b.time ? 1 : -1)
                commit('setProducts',  productsArray)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async saveProduct({ commit, dispatch }, payload) {
            commit('clearError')
            commit('setLoading', true)
             
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
                                payload.price,
                                payload.location,
                                null
                                //firebase.database.ServerValue.TIMESTAMP
                            );
                            firebase.database().ref('products').push(newProduct);
                            console.log('ok')
                        });
                    }
                );
              
                
               // commit('savePost', newProduct);
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
        // async removePost({ commit,dispatch, getters }, payload) {
        //     commit('clearError')
        //     commit('setLoading', true)
        //     try {
        //         //logic
                
        //         await firebase.database().ref('posts/' + payload).remove();
        //         dispatch('removeImage');
        //         commit('setLoading', false);
        //     } catch (error) {
        //         commit('setLoading', false);
        //         commit('setError', error.message);
        //         throw error
        //     }
        // },

        // async updatePost({ commit, getters }, payload) {
        //     commit('clearError')
        //     commit('setLoading', true)
        //     try {
        //         //logic
        //         const updatedPost = new Post(
        //             payload.postName,
        //             payload.postContent,
        //             payload.description,
        //             getters.user.id,
        //             null,
        //             payload.url,
        //             payload.category,
        //             payload.publish,
        //             firebase.database.ServerValue.TIMESTAMP
        //         );
        //         await firebase.database().ref('posts/' + payload.id).update(
        //             updatedPost
        //         );
        //         commit('setLoading', false)
        //     } catch (error) {
        //         commit('setLoading', false)
        //         commit('setError', error.message)
        //         throw error
        //     }
        // },




    },

    getters: {
        products: state => {
            return state.products
        },
        // selectedPost: state => {
        //     return state.selectedPost
        // },
        // posts: state => filter => {
        //     return state.posts.filter(item => {
        //         return item.category === filter
        //     })
        // },
        // post: state => id => {
        //     state.selectedPost = state.posts.find(state => state.id === id);
        //     return state.selectedPost
        // },
        // timeInLastPost: state => {
        //     return state.timeInLastPost
        // },
        // uploadImgValue: state => {
        //     return state.uploadImgValue
        // },
        
    }
}