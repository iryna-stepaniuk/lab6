var express = require('express');
var router = express.Router();

const firebase = require("firebase");
var firebaseConfig = {
    apiKey: "AIzaSyBcL-yamLqcZDi76rpu2Vb050U1qgl2yRg",
    authDomain: "lab6-4dffe.firebaseapp.com",
    databaseURL: "https://lab6-4dffe.firebaseio.com",
    projectId: "lab6-4dffe",
    storageBucket: "lab6-4dffe.appspot.com",
    messagingSenderId: "962302703525",
    appId: "1:962302703525:web:133444baf7469d002d1a4c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

function getPosts() {
    return firestore.collection('posts').get().then(function(postObj){
        const posts = postObj.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        return posts
    });
}

function getPost(posts, postId) {
    const post = posts.find(doc => {
        return doc.id == postId
    });

    return post
}

router.get('/', function (req, res, next) {
    getPosts().then(posts => {
        res.render('index', {posts});
    });
});

router.get('/posts/:postId', function (req, res, next) {
    getPosts().then(posts => {
        const post = getPost(posts, req.params.postId);
        console.log(post);
        res.render('post', {posts, post});
    });
});

module.exports = router;
