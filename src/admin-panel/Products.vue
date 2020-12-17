<template>
  <div class="products">
    <div class="container">
     <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Products Page</h3>
                    
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="../assets/img/products.svg" alt="" class="img-fluid">
              </div>
            </div>
          </div>
     
<hr>
    <div class="product-test">
    

    <h3 class="d-inline-block">Product List</h3>
    <button class="btn btn-primary float-right" @click="addNew" v-b-modal.product>Add Product</button>
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
          <tr :key="product.id" v-for="product in products">
                        <td>
                          {{ product.name }}
                        </td>
                        <td>
                          {{ product.price }}
                        </td>

                        <td>

                          <button class="btn btn-primary" @click="editProduct(product)" v-b-modal.product>Edit</button>
                          <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
                        </td>

          </tr>


        </tbody>
      </table>
    </div>
    
    </div>
      <b-modal id="product" size="xl" title="Edit Product" hide-footer>
            <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                      
                      <div  class="d-flex">
                        <p :key="tag.id" v-for="tag in product.tags">
                            <span class="p-1">{{tag}}</span>
                        </p>

                      </div>
                    </div>
                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1" :key="index.id" v-for="(image, index) in product.images">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>
                  </div>
            </div>  
      <div class="form-group">
          <button type="button" class="btn btn-primary float-right" @click="addProduct()" v-if="modal === 'new'">Save Changes</button>
          <button type="button" class="btn btn-primary float-right" @click="updateProduct()" v-if="modal === 'edit'">Apply Changes</button>
      </div>
      </b-modal>
    </div>
 </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import {fb,db} from '../firebase';

export default {
  name: 'Products',
  components: {
    VueEditor
  },
  data(){
    return {
      products: [],
       product: {
          name:null,
          description:null,
          price:null,
          tags:[],
          images: []
        },
      activeItem: null,
      modal: null,
      tag: null
     
    }
  },
  firestore(){
    return {
      // Collection
        products: db.collection('products'),
    }
  },
  methods: {
    
    deleteImage(img,index){
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index,1);
      image.delete().then(() => {
        console.log('image deleted');
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log('an error occurred');
      });
    },

    addTag(){
      this.product.tags.push(this.tag);
      this.tag = "";
    },

    uploadImage(e){
      if(e.target.files[0]){
        
          let file = e.target.files[0];
    
          var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
            });
          });
      }

  },

   

    reset(){
      this.product = {
          name:null,
          description:null,
          price:null,
          tags:[],
          images:[]
      }
    },

    updateProduct() {
       this.$firestore.products.doc(this.product.id).update(this.product);
       
       Toast.fire({
            type: 'success',
            title: 'Updated  successfully'
          })
          
  },

    editProduct(product){
        this.modal = 'edit'
        this.product = product;    
        
  },
    
    deleteProduct(doc) {
       Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete()
          Toast.fire({
            type: 'success',
            title: 'Deleted  successfully'
          })
        
        }
      })

  },
    readData(){
       
  },

    addProduct(){
       this.$firestore.products.add(this.product);
       Toast.fire({
            type: 'success',
            title: 'Added  successfully'
          })
          
  },
    addNew(){
    this.modal = 'new';
    this.reset();
    
  }  
}
 
  
 
}
</script>


