<template>
  <div class="login">
  

  <b-modal id="login" class="modal" centered title="Welcome" hide-footer>
    <b-tabs pills card>
      <b-tab title="Login" active>
        <h5 class="text-center">Login Please</h5>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>

                             <div class="form-group">
                                <button class="btn btn-primary" @click="login">Login</button>
                            </div>

      </b-tab>
      
      <b-tab title="Sign Up">
         <h5 class="text-center">Create New Account</h5>
                             
                            <div class="form-group">
                                <label for="name">Your name</label>
                                <input type="text" v-model="name" class="form-control" id="name" placeholder="Your nice name">
                            </div>

                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email"  v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary" @click="register">Signup</button>
                            </div>

        </b-tab>
    </b-tabs>
  </b-modal>
  
</div>
</template>

<script>
import {fb,db} from '../firebase'
export default {
  name: 'Login',
 data(){
      return {
          name:null,
          email:null,
          password:null
          
      }
  },
  methods: {
      login(){
        fb.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
            this.$router.replace('admin');
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
                console.log(error);
        });
      },           
      register(){
        fb.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
           db.collection("profiles").doc(user.user.uid).set({
                name: this.name
                
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
            this.$router.replace('admin');
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
      }
  }
}
</script>


