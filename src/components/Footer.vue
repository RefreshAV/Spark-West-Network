<template>
  <footer class="blog-footer">
    <form action="" class="form-inline justify-content-center">
      <div class="form-group">
        <label class="sr-only">Name</label>
        <input type="text" class="form-control" placeholder="Name">
      </div>
      <div class="form-group">
        <label class="sr-only">Email</label>
        <input type="text" class="form-control" placeholder="email">
      </div>
      <button type="submit" class="btn btn-dark ">Sign up for Newsletter!</button>
    </form>
    <p> <a href="https://google.com">Nova Obsido</a> by <a href="https://google.com">@ Callum & Max</a>.</p>
    <p>
      <a href="#">Back to top</a>
    </p>
  </footer>
</template>

<script>
  export default {

  }
</script>

<style scoped>

  /*
 * Footer
 */
  .blog-footer {
    padding: 2.5rem 0;
    color: #999;
    text-align: center;
    background-color: #f9f9f9;
    border-top: .05rem solid #e5e5e5;
  }
  .blog-footer p:last-child {
    margin-bottom: 0;
  }

</style>
