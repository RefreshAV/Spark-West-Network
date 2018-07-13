<template>
  <section id="contact">
    <div class="container">
      <div class="well well-sm">
        <h3><strong>Contact Us</strong></h3>
      </div>

      <div class="row">
        <div class="col-md-7">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22534.894807880497!2d-64.37648732789971!3d45.08859451133002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b585508649b3e03%3A0xb991fdcccab87245!2sWolfville%2C+NS!5e0!3m2!1sen!2sca!4v1531401712394" width="100%" height="315" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>

        <div class="col-md-5">
          <h4><strong>Get in Touch</strong></h4>
          <form>
            <div class="form-group">
              <input type="text" class="form-control" name="" value="" placeholder="Name">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" name="" value="" placeholder="E-mail">
            </div>
            <div class="form-group">
              <input type="tel" class="form-control" name="" value="" placeholder="Phone">
            </div>
            <div class="form-group">
              <textarea class="form-control" name="" rows="3" placeholder="Message"></textarea>
            </div>
            <button class="btn btn-default" type="submit" name="button">
              <i class="fa fa-paper-plane-o" aria-hidden="true"></i> Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
  export default {

  }
</script>

<style>
  #contact{
    background-color:#f1f1f1;
  }

  #contact .well{
    margin-top:30px;
    border-radius:0;
  }

  #contact .form-control{
    border-radius: 0;
    border:2px solid #1e1e1e;
  }

  #contact button{
    border-radius:0;
    border:2px solid #1e1e1e;
  }

  #contact .row{
    margin-bottom:30px;
  }

  @media (max-width: 768px) {
    #contact iframe {
      margin-bottom: 15px;
    }

  }
</style>
