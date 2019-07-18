/**
 * Homepage scripts
 */
import Common from "../common.js";
import FirebaseComponent from "../components/firebase.js";

const HomePage = {
  init() {
    Common.init();

    this.getPosts();
  },

  /**
   * Sign up
   * @param {String} email email
   * @param {String} password password
   */
  signUp(email, password) {
    let self = this;

    FirebaseComponent.signUp(email, password)
      .then(function(data) {
        self.sigUpSuccess(email, data.user.uid);
      })
      .catch(function(error) {
        self.signUpFailed(error.message);
      });
  },

  /**
   * Sign up success
   * @param {String} email email
   * @param {String} id id of account just sign up
   */
  sigUpSuccess(email, id) {
    console.log("Sign up success", email, id);
  },

  /**
   * Sign up failed
   * @param {String} error error when sign up
   */
  signUpFailed(error) {
    console.log("Sign up failed", error);
  },

  /**
   * Sign in
   * @param {String} email email
   * @param {String} password password
   */
  signIn(email, password) {
    let self = this;

    FirebaseComponent.signIn(email, password)
      .then(function(data) {
        self.sigInSuccess(email, data.user.uid);
      })
      .catch(function(error) {
        self.signInFailed(error.message);
      });
  },

  /**
   * Sign in success
   * @param {String} email email
   * @param {String} id id of account just sign in
   */
  sigInSuccess(email, id) {
    console.log("Sign In success", email, id);
  },

  /**
   * Sign in failed
   * @param {String} error error when sign in
   */
  signInFailed(error) {
    console.log("Sign In failed", error);
  },

  /**
   * Create post
   * @param {Object} post
   */
  createPost(post) {
    FirebaseComponent.add("posts", post);
  },

  /**
   * Get a single post by ID
   * @param {String} id
   */
  getPost(id) {
    FirebaseComponent.get(
      "posts",
      id,
      function(snapshot) {
        console.log(snapshot.val());
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  },

  /**
   * Get all posts
   */
  getPosts() {
    FirebaseComponent.getAll(
      "posts",
      function(snapshot) {
        let posts = FirebaseComponent.convertData(snapshot.val());
        console.log(posts);
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  },

  /**
   * Update a post by ID
   * @param {String} id
   * @param {Object} postUpdated
   */
  updatePost(id, postUpdated) {
    FirebaseComponent.update("posts", id, postUpdated);
  },

  /**
   * Remove a post by ID
   * @param {String} id
   */
  removePost(id) {
    FirebaseComponent.remove("posts", id);
  }
};

HomePage.init();
