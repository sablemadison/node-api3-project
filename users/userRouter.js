const express = require('express');

const router = express.Router();

const users = require('./userDb');
const posts = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
  users.insert(req.body)
  .then((user)=> {
    res.status(200).json(user)
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).json({errorMessage:"User could not be added to the database"})
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
//  const post = {...req.body, user_id: req.params.id};
 posts.insert(req.body)
 .then((post)=> {
   res.status(200).json(post)
 })
 .catch((err)=> {
   console.log(err);
   res.status(500).json({errorMessage:"Post could not be added."})
 })
});

router.get('/', (req, res) => {
  users.get(req.query)
  .then((users)=> {
    res.status(200).json(users)
  })
  .catch((err)=> {
    res.status(500).json({errorMessage:"Users information could be found."})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  users.getById(req.params.id)
  .then((user)=> {
    res.status(200).json(user)
  })
  .catch((err)=> {
    res.status(500).json({errorMessage:"User could not be found."})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  users.getUserPosts(req.user.id)
  .then((posts)=> {
    res.status(200).json(posts)
  })
  .catch((err)=> {
    res.status(500).json({errorMessage:"The users post could not be found."})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  users.remove(req.user.id)
  .then((deleted)=> {
    
    if(deleted === 1){
      res.status(200).json(req.user)
    }
  })
  .catch((err)=> {
    console.log(err)
    res.status(500).json({errorMessage:"User could not be deleted."})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  let changes = req.body;
  users.update(req.params.id, changes)
  .then((updated)=> {
    res.status(200).json(updated)
  })
  .catch((err)=> {
    res.status(500).json({errorMessage:"User could not be updated."})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  
  users.getById(req.params.id).then((user)=> {
    if(user){
        req.user = user;
        next()
    } else {
        res.status(400).json({message: "invalid user id"})
        
    }
})
}

function validateUser(req, res, next) {
  
 
if (!req.body || !req.body.name){
res.status(400).json({message: "missing required name field"});
} else {
   
  next()
}
}

function validatePost(req, res, next) {
 
  if(!req.body || !req.body.text){
    res.status(400).json({message: "missing required text field"})
} else {
    next()
} 
}

module.exports = router;
