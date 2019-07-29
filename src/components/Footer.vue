<template>
  <div class="px-5 bg-light border text-center">
    <div class="row my-3">
      <div class="col text-center">
        <p class="mb-0 font-weight-bold">Check out our newsletter:</p>
      </div>
    </div>
    <div class="row mt-3 d-flex justify-content-center">
      <div class="col-md-8">
        <form class="mb-3">
          <div class="input-group mb-3">
            <input type="email" class="form-control" placeholder="Email" required>
            <input type="text" class="form-control" placeholder="Name" required>
          </div>

          <input type="submit" value="Sign up" class="btn btn-block btn-success">
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>
          Created by
          <a class="text-info" href="https://github.com/cuppajoeman" target="blank">Callum</a>,
          <a class="text-info" href="https://www.github.com/jellycream" target="blank">Max</a>
          <a class="text-info nathaniel" href="https://nathfreder.dev" target="blank"><span class="sr-only"> & Nathaniel</span></a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.col-md-8 {
  max-width: 800px;
}

.nathaniel {
  text-indent :-9999px
}
</style>
