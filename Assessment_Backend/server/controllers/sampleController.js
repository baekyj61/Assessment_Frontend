const SampleModel = require('../models').SampleModel;
const PostModel = require('../models').PostModel;
const db = require("../models/index");

const sampleEndpoint = async (req, res) => {
  // console.log(res);
  // console.log(req);
  console.log(PostModel)
  res.send("This Works")
}

let allPosts = [];
let counter = 1;

const getAllPosts = async (req, res) => {
  // PostModel.findAll().then(posts => {
  //   // Send All Posts to Client
  //   console.log(posts)
  //   res.sendStatus(200)
  //   // res.json(posts.sort(function(p1, p2){return p1.id - p2.id}));
  // }).catch(err => {
  //   console.log(err);
  //   res.status(500).json({msg: "error", details: err});
  // });
  res.send(allPosts);
}

const postNewPost = async (req, res) => {
  // PostModel.create({
  //   "textField": req.body.textField, 
  //   "likes": req.body.likes
  // }).then(post => {		
  //     // Send created post to client
  //     res.json(post);
  // }).catch(err => {
  //     console.log(err);
  //     res.status(500).json({msg: "error", details: err});
  // });
  let postsSize = allPosts.length; 
  let newPost = {id: counter, textField: req.body.textField, likes: req.body.likes};
  allPosts.push(newPost);
  counter++;
  if (allPosts.length > postsSize) {
    res.send({message: "Success"});
  } else {
    res.send({message: "Failed"});
  }
}

const deletePost = async (req, res) => {
  // const id = req.params.id;
	// Posts.destroy({
	// 		where: { id: id }
	// 	}).then(() => {
	// 		res.status(200).json( { msg: 'Deleted Successfully -> Post Id = ' + id } );
	// 	}).catch(err => {
	// 		console.log(err);
	// 		res.status(500).json({msg: "error", details: err});
  // 	});
  let postsSize = allPosts.length; 
  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].id == req.params.id) {
      allPosts.splice(i,1);
      counter--;
      break;
    }
  }
  if (allPosts.length < postsSize) {
    res.send({message: "Success"});
  } else {
    res.send({message: "Failed"});
  }
}

const updatePost = async (req, res) => {
  // const id = req.body.id;
  // Posts.update( req.body, 
  //   { where: {id: id} }).then(() => {
  //     res.status(200).json( { mgs: "Updated Successfully -> Customer Id = " + id } );
  //   }).catch(err => {
  //     console.log(err);
  //     res.status(500).json({msg: "error", details: err});
  //   });
  let postsSize = allPosts.length; 
  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].id == req.body.id) {
      allPosts[i].likes++;
      break;
    }
  }
  if (allPosts.length == postsSize) {
    res.send({message: "Success"});
  } else {
    res.send({message: "Failed"});
  }
}

module.exports = {
    sampleEndpoint,
    getAllPosts,
    postNewPost,
    deletePost,
    updatePost,
};