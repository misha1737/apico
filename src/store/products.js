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
        getProducts(state, payload) {
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
                commit('getProducts',  productsArray)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },

        // async loadPosts({ commit, getters }) {
        //     commit('clearError')
        //     commit('setLoading', true)
        //     try {
        //         let post;
        //         if (!getters.timeInLastPost)
        //             post = await firebase.database().ref('posts').orderByChild('time').startAt(0).limitToLast(11).once('value')
        //         else
        //             post = await firebase.database().ref('posts').orderByChild('time').endAt(getters.timeInLastPost).limitToLast(11).once('value')

        //         const posts = post.val();
        //         let postsArray = [];

        //         Object.keys(posts).forEach(key => {
        //             const p = posts[key]
        //             postsArray.push(
        //                 new Post(
        //                     p.postName,
        //                     p.postContent,
        //                     p.description,
        //                     p.userId,
        //                     key,
        //                     p.url,
        //                     p.category,
        //                     p.publish,
        //                     p.time
        //                 )
        //             )
        //         })

        //         postsArray = postsArray.sort((a, b) => a.time < b.time ? 1 : -1)
        //         commit('loadPosts', postsArray)
        //         commit('setLoading', false)
        //     } catch (error) {
        //         commit('setLoading', false)
        //         commit('setError', error.message)
        //         throw error
        //     }
        // },


        // async savePost({ commit, getters }, payload) {
        //     commit('clearError')
        //     commit('setLoading', true)
        //     try {
        //         //logic

        //         const newPost = new Post(
        //             payload.postName,
        //             payload.postContent,
        //             payload.description,
        //             getters.user.id,
        //             null,
        //             null,
        //             payload.category,
        //             payload.publish,
        //             firebase.database.ServerValue.TIMESTAMP
        //         );
        //         const post = await firebase.database().ref('posts').push(newPost);
                
        //         commit('savePost', newPost);
        //         commit('setLoading', false);
        //         return post.key;
        //     } catch (error) {
        //         commit('setLoading', false)
        //         commit('setError', error.message)
        //         throw error
        //     }
        // },


        // async removeImage({ commit, getters }) {
        //     try {
        //         firebase.storage().ref("posts/").child(getters.selectedPost.id).listAll()
        //         .then(function (result) {
        //             result.items.forEach((item) => {
        //                 firebase.storage().ref(item.location.path_).delete();
        //             });
        //         });
        //         commit('updateImg', null);


        //     }catch (error) {
                
        //         commit('setError', error.message)
        //         throw error
        //     }
        // },


        // async uploadImg({ commit, getters, dispatch }, payload) {
        //     commit('clearError')
        //     commit('setLoading', true)
        //     try {
        //         dispatch('removeImage');
        //         const storageRef = firebase.storage().ref(`posts/${getters.selectedPost.id}/${payload.name}`).put(payload);
        //         storageRef.on("state_changed",
        //             (snapshot) => {
        //                 let uploadValue=0;
        //                 uploadValue=((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        //                 commit('uploadImgValue', uploadValue);
        //             },
        //             (error) => {
        //                 console.log(error.message);
        //             },
        //             () => {
        //                 storageRef.snapshot.ref.getDownloadURL().then((urlImg) => {
        //                     commit('updateImg', urlImg);
        //                     firebase.database().ref('posts/' + getters.selectedPost.id).update(
        //                         {url:urlImg}
        //                     );
        //                     commit('uploadImgValue', null);
        //                 });
        //             }
        //         );
        //         commit('setLoading', false)
        //     } catch (error) {
        //         commit('setLoading', false)
        //         commit('setError', error.message)
        //         throw error
        //     }

        // },
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