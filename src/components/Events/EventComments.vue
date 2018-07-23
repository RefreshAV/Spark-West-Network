<template>
  <ul class="comment-section">

    <li class="comment user-comment">

      <div class="info">
        <a href="#">Example User</a>
        <span>4 hours ago</span>
      </div>

      <a class="avatar" href="#">
        <img src="http://via.placeholder.com/35x35" width="35" alt="Profile Avatar" title="Example User" />
      </a>

      <p>Suspendisse gravida sem?</p>

    </li>

    <li class="comment author-comment">

      <div class="info">
        <a href="#">Example User</a>
        <span>3 hours ago</span>
      </div>

      <a class="avatar" href="#">
        <img src="http://via.placeholder.com/35x35" width="35" alt="Profile Avatar" title="Example User" />
      </a>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida sem sit amet molestie portitor.</p>

    </li>

    <li class="comment user-comment">

      <div class="info">
        <a href="#">Example User</a>
        <span>1 hour ago</span>
      </div>

      <a class="avatar" href="#">
        <img src="http://via.placeholder.com/35x35" width="35" alt="Profile Avatar" title="Example User" />
      </a>

      <p>Suspendisse gravida sem sit amet molestie portitor?</p>

    </li>

    <li class="comment author-comment">

      <div class="info">
        <a href="#">Example User</a>
        <span>1 hour ago</span>
      </div>

      <a class="avatar" href="#">
        <img src="http://via.placeholder.com/35x35" width="35" alt="Profile Avatar" title="Example User" />
      </a>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisee gravida sem sit amet molestie porttitor.</p>

    </li>

    <li class="write-new">

      <form action="#" method="post">

        <textarea placeholder="Write your comment here" name="comment" v-model="comment.Message"></textarea>

        <div>
          <img src="http://via.placeholder.com/35x35" width="35" alt="Profile of Bradley Jones" title="example user" />
          <button @click.prevent="submit" class="btn btn-dark">Submit</button>
        </div>

      </form>

    </li>

  </ul>

</template>

<script>
  import db from "../../Firebase/firebaseInit";
  import firebase from "firebase";
  import "firebase/firestore";
  export default {
    data() {
      return {
        comment: {
          userUID: firebase.auth().currentUser.uid,
          timePosted: '',
          Message: ''
        }
      }
    },
    mounted() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();

      if(dd<10) {
        dd = '0'+dd
      }

      if(mm<10) {
        mm = '0'+mm
      }

      this.comment.timePosted = mm + '/' + dd + '/' + yyyy;
    },
    methods: {
      submit() {
        db
          .collection("events")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "==",
            this.$route.params.id
          )
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.set({
                event: {
                  comments: [
                    {
                      userUID: this.comment.userUID,
                      timePosted: this.comment.timePosted,
                      Message: this.comment.Message
                    }
                  ]
                }
              }, {merge: true});
            });
          })
          .then(that.$router.push("/events/event/" + that.id));
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    font: normal 13px sans-serif;
  }

  .comment-section{
    list-style: none;
    max-width: 800px;
    width: 100%;
    margin: 50px auto;
    padding: 10px;
  }

  .comment{
    display: flex;
    border-radius: 3px;
    margin-bottom: 45px;
    flex-wrap: wrap;
  }

  .comment.user-comment{
    color:  #808080;
  }

  .comment.author-comment{
    color:  #60686d;
    justify-content: flex-end;
  }

  /* User and time info */

  .comment .info{
    width: 17%;
  }

  .comment.user-comment .info{
    text-align: right;
  }

  .comment.author-comment .info{
    order: 3;
  }


  .comment .info a{	/* User name */
    display: block;
    text-decoration: none;
    color: #656c71;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px 0 3px 0;
  }

  .comment .info span{	/* Time */
    font-size: 11px;
    color:  #9ca7af;
  }


  /* The user avatar */

  .comment .avatar{
    width: 8%;
  }

  .comment.user-comment .avatar{
    padding: 10px 18px 0 3px;
  }

  .comment.author-comment .avatar{
    order: 2;
    padding: 10px 3px 0 18px;
  }

  .comment .avatar img{
    display: block;
    border-radius: 50%;
  }

  .comment.user-comment .avatar img{
    float: right;
  }





  /* The comment text */

  .comment p{
    line-height: 1.5;
    padding: 18px 22px;
    width: 50%;
    position: relative;
    word-wrap: break-word;
  }

  .comment.user-comment p{
    background-color:  #f3f3f3;
  }

  .comment.author-comment p{
    background-color:  #e2f8ff;
    order: 1;
  }

  .user-comment p:after{
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 2px solid #f3f3f3;
    left: -8px;
    top: 18px;
  }

  .author-comment p:after{
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 2px solid #e2f8ff;
    right: -8px;
    top: 18px;
  }




  /* Comment form */

  .write-new{
    margin: 80px auto 0;
    width: 50%;
  }

  .write-new textarea{
    color:  #444;
    font: inherit;

    outline: 0;
    border-radius: 3px;
    border: 1px solid #cecece;
    background-color:  #fefefe;
    box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.06);
    overflow: auto;

    width:100%;
    min-height: 80px;
    padding: 15px 20px;
  }

  .write-new img{
    border-radius: 50%;
    margin-top: 15px;
  }

  .write-new button{
    float:right;
    background-color:  #87bae1;
    box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    border: 0;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;

    padding: 10px 25px;
    margin-top: 18px;
  }



  /* Responsive styles */

  @media (max-width: 800px){
    /* Make the paragraph in the comments take up the whole width,
    forcing the avatar and user info to wrap to the next line*/
    .comment p{
      width: 100%;
    }

    /* Reverse the order of elements in the user comments,
    so that the avatar and info appear after the text. */
    .comment.user-comment .info{
      order: 3;
      text-align: left;
    }

    .comment.user-comment .avatar{
      order: 2;
    }

    .comment.user-comment p{
      order: 1;
    }


    /* Align toward the beginning of the container (to the left)
    all the elements inside the author comments. */
    .comment.author-comment{
      justify-content: flex-start;
    }


    .comment-section{
      margin-top: 10px;
    }

    .comment .info{
      width: auto;
    }

    .comment .info a{
      padding-top: 15px;
    }

    .comment.user-comment .avatar,
    .comment.author-comment .avatar{
      padding: 15px 10px 0 18px;
      width: auto;
    }

    .comment.user-comment p:after,
    .comment.author-comment p:after{
      width: 12px;
      height: 12px;
      top: initial;
      left: 28px;
      bottom: -6px;
    }

    .write-new{
      width: 100%;
    }
  }

</style>
