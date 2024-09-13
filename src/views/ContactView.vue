<template>
    <div>
        <div class="card" id="contactsMainDiv">
            <div class="container-fluid">
                <div class="row">
                    <h2>Feel free to reach out to us!</h2>
                    <div class="col-sm-6 lg-12">
                    <div class="formcarry-container">
                        <form @submit.prevent="onSubmit" >
                        <div class="formcarry-block">
                            <label class="form-label" for="name">Full Name</label>
                            <input class="form-control" type="text" required v-model="name" id="name" placeholder="Your first and last name" />
                        </div>
                        <div class="formcarry-block">
                            <label for="email">Your Email Address</label>
                            <input class="form-control" type="email" required v-model="email" id="email" placeholder="john@doe.com" />
                        </div>
                        <div class="formcarry-block">
                            <label for="message">Your message</label>
                            <textarea class="form-control" required v-model="message" id="message" placeholder="Enter your message..."></textarea>
                        </div>
                        <div class="formcarry-block" id="buttons">
                            <button class="btn btn-outline-light" type="submit">
                            send
                            </button>
                            
                            <button class="btn btn-outline-light" type="reset">Clear</button>
                        </div>
                    
                        <div v-if="showNotification" class="formcarry-block">
                            <div :class="`formcarry-message-block fc-${icon} active`">
                            <div class="fc-message-icon"></div>
                            <div class="fc-message-content">{{ errorMessage }}</div>
                            <div class="fc-message-close" @click="resetStates"></div>
                            </div>
                        </div>
                    
                        </form>
                    </div>
                    </div>
                    <div class="col-sm-6 lg-12" id="dets">
                        <h6><label><i class="bi bi-telephone-fill"></i></label> 012 345 6789</h6>
                        <h6><i class="bi bi-envelope-at-fill"></i> comfortcorner@gmail.com</h6>
                        <h5>socials:</h5>
                        <h6><i class="bi bi-whatsapp"></i>  075 678 7654</h6>
                        <h6><i class="bi bi-facebook" ></i>  https://www.facebook.com/comfortcorner</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import SpinnerComp from "../components/SpinnerComp.vue"; 
  export default {
  //   components:{
  //   SpinnerComp
  // },
    data() {
      return {
        name: '',
        email: '',
        message: '',
        error: '',
        submitted: false
      };
    },
    methods: {
      resetStates() {
        this.submitted = false;
        this.error = '';
      },
      resetForm() {
        this.name = '';
        this.email = '';
        this.message = '';
      },
      async onSubmit() {
        this.resetStates();
  
        try {
          const response = await fetch("https://formcarry.com/s/rKSODvoEfoK", {
            method: 'POST',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: this.name, email: this.email, message: this.message })
          });
  
          const data = await response.json();
  
          if (response.ok) {
            this.submitted = true;
            this.resetForm();
          } else {
            this.error = data.message || 'Unknown error occurred.';
          }
        } catch (err) {
          this.error = err.message ? err.message : err;
        }
      }
    },
    computed: {
      showNotification() {
        return this.submitted || this.error;
      },
      icon() {
        return this.error ? 'error' : 'success';
      },
      errorMessage() {
        return this.error ? this.error : "Thanks for reaching out! I'll be sure to get back to you soon.";
      }
    }
  };
  
</script>

<style scoped>
.container-fluid{
  background-color: rgba(255, 255, 255, 0.107);
}
.bi{
    color:#36454F;
}
  #contactsMainDiv{
    text-align: center;
    justify-content: center;
  }
  h2{
    margin-top:70px;
  }
  input,textarea{
    text-align: center;
    border: 5px solid #a4d4a1;
  }
  input:hover,textarea:hover{
    border: 5px solid #36454F;
  }
  .formcarry-container{
    /* margin-top: 100px; */
    width:60%;
    margin-left:100px;
  }
  label{
    font-size:20px ;
  }
  button{
    width:30%;
  }
  #dets{
    margin-top: 50px;
  }
  #dets i{
    color: white;
  }

  @media(max-width:900px){
    #contactsMainDiv{
      margin-left: 100px;
    }
  }

    /* For small screens (max-width: 768px) */
    @media only screen and (max-width: 768px) {
    .formcarry-container {
      width: 100%;
      margin-left: 30px;
    }
    label {
      font-size: 18px;
    }
    input, textarea {
      font-size: 16px;
    }
    button {
      width: 40%;
    }
    
  }

  /* For extra small screens (max-width: 480px) */
  @media only screen and (max-width: 600px) {
    #contactsMainDiv{
      margin: 0px;
    }
    .formcarry-container {
      width: 95%;
      margin-left: 10px;
    }
    label {
      font-size: 16px;
    }
    input, textarea {
      font-size: 14px;
    }
    button {
      width: 50%;
    }
    h2{
      margin-top:10px;
    }
  }
 .card{
    /* background-image: url('https://yolandamatiwane.github.io/socialMediaImg/contact3.jpg');
    background-size:contain;
    background-position: center;
    background-repeat: no-repeat; */
    color: #a4d4a1;
    background-color: #36454F;
    height: 100vh;
 }
 #exampleFormControlInput1, #exampleFormControlTextarea1{
    width:300px;
 }
 .col-12{
    justify-content: center;
 }
    
</style>