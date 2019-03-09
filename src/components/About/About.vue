<template>
  <!-- Page Content -->
  <div class="container">

    <!-- Page Heading/Breadcrumbs -->
    <h1 class="mt-4 mb-3">
      About
    </h1>
    <hr>

    <!-- Intro Content -->
    <div class="row">
      <div class="col-lg-6">
        <img
          class="img-fluid rounded mb-4"
          style="width:100%"
          src="../../assets/LogoMediumREN.png"
          alt="">
      </div>
      <div class="col-lg-6">
        <h2>About Us</h2>
        <p>
          <b>Spark West Network</b> is an umbrella marketing platform that draws together, assists, and coordinates the various organizations, events, and people that define our region’s unique entrepreneurial opportunities. The Spark West website aims to act as a platform for hosting the unique events and opportunities that make up western Nova Scotia’s entrepreneurial ecosystem. 
        </p>
        <p>
          Our vision is to create a unified voice for entrepreneurship in the rural areas of western Nova Scotia. We want to make our region a friendlier place for entrepreneurs to connect with each other, get advice, become noticed, and build up their businesses and skill sets.
        </p>
      </div>
    </div>

    <hr>

    <!-- Team Members -->
    <h2>The <span id="dream" data-toggle="modal" data-target="#edddModal">Dream</span> Team</h2>

    <div class="d-flex justify-content-center">
      <div class="card-group mb-3 d-flex justify-content-center">
      <button class="card px-0 mb-3 rounded" data-toggle="modal" data-target="#alexModal">
        <img class="card-img rounded-0" src="../../assets/alex.png" alt="Card image">
        <div class="card-body">
          <h5 class="card-title">Alex Petkov</h5>
          <p class="card-text">position</p>
        </div>
      </button>
      <button class="card px-0 mb-3 rounded" data-toggle="modal" data-target="#emmaModal">
        <img class="card-img rounded-0" src="../../assets/emma.png" alt="Card image">
        <div class="card-body">
          <h5 class="card-title">Emma He</h5>
          <p class="card-text">position</p>
        </div>
      </button>
      <button class="card px-0 mb-3 rounded" data-toggle="modal" data-target="#maxModal">
        <img class="card-img rounded-0" src="../../assets/max.png" alt="Card image">
        <div class="card-body">
          <h5 class="card-title">Max Caplan</h5>
          <p class="card-text">position</p>
        </div>
      </button>
      <button class="card px-0 mb-3 rounded" data-toggle="modal" data-target="#hoangModal">
      <img class="card-img rounded-0" src="../../assets/hoang.png" alt="Card image">
        <div class="card-body">
          <h5 class="card-title">Hoang Bun</h5>
          <p class="card-text">position</p>
        </div>
      </button>
    </div>
    </div>

    <!-- Modals -->
    <div class="modal fade" id="alexModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Alex Petkov</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="modalImg" src="../../assets/alex.png" alt="Alex">
            <hr>
            <p>
              My name is Alexander Plamenov Petkov. I am 15 years old and in the 10th grade attending Horton high school. I am interested in computer hardware and software and am knowledgable with Raspberry Pi's and the Python programming language. I hope to become a computer engineer, or a petroleum engineer, or a nautical archaeologist, or a theme park engineer, or a surgeon. I really don't know. By creating Spark West Network, along with my other group members, I hope to gain valuable knowledge and experience in entrepreneurship, as well as in figuring out what I want to do in the future. Even if Spark West fails as a business, the experiences and lessons I have learned will greatly benefit me in the future, and that, to me, is a great success.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="emmaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Emma He</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="modalImg" src="../../assets/emma.png" alt="Alex">
            <hr>
            <p>
              您好! My name is Emma, a grade 11 student studying at Horton High School. I was originally from China, and now I proudly call Nova Scotia my second home. Entrepreneurship had always been an area of interest to me. Spark West Network is a project that allows me to explore this field in a hands-on way. We have an idea, we have a team, and we have passion, so now it's time to realize our vision! With my teamates, I hope to make my contribution to the Nova Scotia business world as a passionate youth!
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="maxModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Max Caplan</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="modalImg" src="../../assets/max.png" alt="Alex">
            <hr>
            <p>
              Hello, I'm Max, a grade 12 student attending Horton High. Ever since I went to the pitches for a local business ideation competition, Start It Up, I've been engaged and interested in local entrepreneurship. With a background in computer science and more artistic endeavors, I have competed in 4 Business ideation competitions placing both 2nd and 1st on two different occasions. I have always wanted to extend my entrepreneurship passion to my family friends and other members of my community, and I believe Spark West Network is the way to do that
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="hoangModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Hoang Bun</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="modalImg" src="../../assets/hoang.png" alt="Alex">
            <hr>
            <p>
              My name is Hoang Quoc Bun, a grade 12 student studying at Horton High School. I am an international student from Vietnam. Although I am new for these kinds of project, joining Spark West Network is a great honor for me as an international student. I don’t have any background of coding nor experiences in business, but with the help of Spark West team, I have gone a long way. I have a great interest in computer and business at the same time,  that’s why I’m trying all my best to help Spark West Network and the team itself 
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="edddModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Eddd</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="modalImg" src="../../assets/eddd.png" alt="Alex">
            <hr>
            <p>
              The famous Eddd, the true founder of <i>Spark West Network</i>
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <!-- Our Customers -->
    <h2>Our Customers</h2>
    <div class="row">
      <div class="col-lg-2 col-sm-4 mb-4">
        <img
          class="img-fluid"
          src="https://picsum.photos/500/300/?random"
          alt="">
      </div>
      <div class="col-lg-2 col-sm-4 mb-4">
        <img
          class="img-fluid"
          src="https://picsum.photos/500/300/?random"
          alt="">
      </div>
      <div class="col-lg-2 col-sm-4 mb-4">
        <img
          class="img-fluid"
          src="https://picsum.photos/500/300/?random"
          alt="">
      </div>
      <div class="col-lg-2 col-sm-4 mb-4">
        <img
          class="img-fluid"
          src="https://picsum.photos/500/300/?random"
          alt="">
      </div>
      <div class="col-lg-2 col-sm-4 mb-4">
        <img
          class="img-fluid"
          src="https://picsum.photos/500/300/?random"
          alt="">
      </div>
      <div class="col-lg-2 col-sm-4 mb-4">
        <img
          class="img-fluid"
          src="https://picsum.photos/500/300/?random"
          alt="">
      </div>
    </div>
    <!-- /.row -->

  </div>
</template>

<script>
export default {
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "About",
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "Learn about Spark West Network, our customers, and the awesome"
      }
    ]
  }
};
</script>

<style scoped>
body {
  padding-top: 54px;
}

@media (min-width: 992px) {
  body {
    padding-top: 56px;
  }
}

.portfolio-item {
  margin-bottom: 30px;
}

.card-deck .card {
  max-width: 20rem;
  min-width: 18rem;
  padding: 0;
}

.modalImg {
  width: 100%;
}

#dream {
  cursor: pointer;
}
</style>
