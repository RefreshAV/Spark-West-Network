<template>
  <div class="container">
    <div class="jumbotron p-3 p-md-5 text-white rounded bg-dark">
      <div class="col-md-6 px-0">
        <h1 class="display-4">Event of the Day</h1>
        <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.</p>
        <p class="lead mb-0"><router-link to="/events/3/detail" tag="a" class="text-white font-weight-bold">Continue reading...</router-link></p>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-md-6">
        <div class="card flex-md-row mb-4 box-shadow h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
            <strong class="d-inline-block mb-2 text-primary">Event 1</strong>
            <h3 class="mb-0">
              <a class="text-dark" href="#">Event example</a>
            </h3>
            <div class="mb-1 text-muted">Nov 12</div>
            <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            <router-link to="/events/3/detail" tag="a" active-class="nav-item">Continue reading...</router-link>

          </div>
          <img class="card-img-right flex-auto d-none d-md-block" src="http://via.placeholder.com/200x250" alt="Card image cap">
        </div>
      </div>
      <div class="col-md-6">
        <div class="card flex-md-row mb-4 box-shadow h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
            <strong class="d-inline-block mb-2 text-success">Event 2</strong>
            <h3 class="mb-0">
              <a class="text-dark" href="#">Event example</a>
            </h3>
            <div class="mb-1 text-muted">Nov 11</div>
            <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            <router-link to="/events/3/detail" tag="a" active-class="nav-item">Continue reading...</router-link>
          </div>
          <img class="card-img-right flex-auto d-none d-md-block" src="http://via.placeholder.com/200x250" alt="Card image cap">
        </div>
      </div>
    </div>
    <div class="text-center">
      <router-link to="/events/list" tag="button" class="btn btn-dark">Check Out All Events!</router-link>
    </div>
  </div>
</template>

<script>
  export default {

  }

</script>

<style scoped>
  /* stylelint-disable selector-list-comma-newline-after */

  .blog-header {
    line-height: 1;
    border-bottom: 1px solid #e5e5e5;
  }

  .blog-header-logo {
    font-size: 2.25rem;
  }

  .blog-header-logo:hover {
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
  }

  .display-4 {
    font-size: 2.5rem;
  }
  @media (min-width: 768px) {
    .display-4 {
      font-size: 3rem;
    }
  }

  .nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
  }

  .nav-scroller .nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  .nav-scroller .nav-link {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: .875rem;
  }

  .card-img-right {
    height: 100%;
    border-radius: 0 3px 3px 0;
  }

  .flex-auto {
    -ms-flex: 0 0 auto;
    -webkit-box-flex: 0;
    flex: 0 0 auto;
  }

  .h-250 { height: 250px; }
  @media (min-width: 768px) {
    .h-md-250 { height: 250px; }
  }

  .border-top { border-top: 1px solid #e5e5e5; }
  .border-bottom { border-bottom: 1px solid #e5e5e5; }

  .box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }

  /*
   * Blog name and description
   */
  .blog-title {
    margin-bottom: 0;
    font-size: 2rem;
    font-weight: 400;
  }
  .blog-description {
    font-size: 1.1rem;
    color: #999;
  }

  @media (min-width: 40em) {
    .blog-title {
      font-size: 3.5rem;
    }
  }

  /* Pagination */
  .blog-pagination {
    margin-bottom: 4rem;
  }
  .blog-pagination > .btn {
    border-radius: 2rem;
  }

  /*
   * Blog posts
   */
  .blog-post {
    margin-bottom: 4rem;
  }
  .blog-post-title {
    margin-bottom: .25rem;
    font-size: 2.5rem;
  }
  .blog-post-meta {
    margin-bottom: 1.25rem;
    color: #999;
  }

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
