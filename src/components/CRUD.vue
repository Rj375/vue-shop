<template>
<!-- THIS IS THE EXAMPLE OF CRUD -->
  <div class="products">
      <h1>Basic CRUD opreation with firebase</h1>

    <div class="product-test">
      <div class="form-group">
          <input type="text" class="form-control" v-model="product.name" placeholder="Product Name">
      </div>

      <div class="form-group">
          <input type="text" @keyup.enter="saveData" class="form-control" v-model="product.price" placeholder="Price">
      </div>

      <div class="form-group">
          <button class="btn btn-primary" @click="saveData">Save Data</button>
      </div>
    <hr>

    <h3>Product List</h3>

    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Modify</th>
            
          </tr>
        </thead>
      
        <tbody>
          <tr :key="index" v-for="(product, index) in products">
            <td> {{product.data().name}} </td>
            <td> {{product.data().price}} </td>
            <td>
              <button @click="editProduct(product)" v-b-modal.edit class="btn btn-primary">Edit</button>
              <button  @click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>
            </td>
            
            
          </tr>

        </tbody>
      </table>
    </div>
    
    </div>
      <b-modal id="edit" size="lg" title="Edit Product" hide-footer>
           <div class="form-group">
          <input type="text" class="form-control" v-model="product.name" placeholder="Product Name">
      </div>

      <div class="form-group">
          <input type="text" @keyup.enter="saveData" class="form-control" v-model="product.price" placeholder="Price">
      </div>

      <div class="form-group">
          <button class="btn btn-primary" @click="updateProduct()">Save Changes</button>
      </div>
      </b-modal>
    
 </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
  name: 'Products',
  data(){
    return {
      products: [],
      product: {
        name: null,
        price: null
        
      },
      activeItem: null
     
    }
  },
  methods: {

    watcher(){
      db.collection("products").onSnapshot((querySnapshot) => {
          this.products = [];
          querySnapshot.forEach((doc) => {
              this.products.push(doc);
          });
          
      });
    },

    updateProduct() {
       db.collection("products").doc(this.activeItem).update(this.product)
        .then(() => {
          this.watcher();
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    },

    editProduct(product){
        this.product = product.data();
        this.activeItem = product.id;
    },
    
    deleteProduct(doc) {
        db.collection("products").doc(doc).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

    },
    readData(){
        db.collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.products.push(doc);
      });
    });
    },
    saveData(){
        // Add a second document with a generated ID.
          db.collection("products").add(this.product)
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
              this.readData();
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
        
    },
    reset() {
      //Object.assign(this.$data, this.$options.data.apply(this));
    }
  },
  created(){
    this.readData
    
  }
  
 
}
</script>
