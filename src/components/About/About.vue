<template>
  <!-- Page Content -->
  <div class="container mt-5">
    <!-- Intro Content -->
    <div class="row mb-5">
      <div class="col">
        <div class="card shadow border-0 animated fadeIn">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6 d-flex justify-content-center align-items-center">
                <img
                  class="img-fluid rounded mb-4"
                  style="width:100%"
                  src="../../assets/LogoMediumREN.png"
                  alt
                />
              </div>
              <div class="col-lg-6">
                <h1>About Us</h1>
                <p>
                  <b>Spark West Network</b> is an umbrella marketing platform that draws together, assists, and coordinates the various organizations, events, and people that define our region’s unique entrepreneurial opportunities. The Spark West website aims to act as a platform for hosting the unique events and opportunities that make up western Nova Scotia’s entrepreneurial ecosystem.
                </p>
                <br />
                <p>Our vision is to create a unified voice for entrepreneurship in the rural areas of western Nova Scotia. We want to make our region a friendlier place for entrepreneurs to connect with each other, get advice, become noticed, and build up their businesses and skill sets.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Members -->
    <h1 class="text-center">
      The
      <b id="dream" data-toggle="modal" data-target="#edddModal">Dream</b> Team
    </h1>

    <div id="swoosh">
      <div class="row d-flex justify-content-center animated fadeIn">
        <div class="col-lg-auto col-sm">
          <!-- Max Caplan -->
          <a class="card p-3 text-dark mb-3 team" data-toggle="modal" data-target="#maxModal" href>
            <div class="card-body">
              <div class="row">
                <div class="col text-center">
                  <img src="../../assets/max.png" alt="max caplan" class="headshot mb-3 shadow-sm" />
                </div>
              </div>
              <div class="row text-center">
                <div class="col">
                  <h3 class="card-title">Max Caplan</h3>
                  <i class="card-text text-info">Lead Developer</i>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-auto col-sm">
          <!-- Emma He -->
          <a class="card p-3 text-dark mb-3 team" data-toggle="modal" data-target="#emmaModal" href>
            <div class="card-body">
              <div class="row">
                <div class="col text-center">
                  <img src="../../assets/emma.png" alt="emma he" class="headshot mb-3 shadow-sm" />
                </div>
              </div>
              <div class="row text-center">
                <div class="col">
                  <h3 class="card-title">Emma He</h3>
                  <i class="card-text text-info">Social Media Lead</i>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-auto col-sm">
          <!-- Alex Petkov -->
          <a class="card p-3 text-dark mb-3 team" data-toggle="modal" data-target="#alexModal" href>
            <div class="card-body">
              <div class="row">
                <div class="col text-center">
                  <img
                    src="../../assets/alex.png"
                    alt="alex petkov"
                    class="headshot mb-3 shadow-sm"
                  />
                </div>
              </div>
              <div class="row text-center">
                <div class="col">
                  <h3 class="card-title">Alex Petkov</h3>
                  <i class="card-text text-info">Lead Moderator</i>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-auto col-sm">
          <!-- Hoang Bun -->
          <a
            class="card p-3 text-dark mb-3 team"
            data-toggle="modal"
            data-target="#hoangModal"
            href
          >
            <div class="card-body">
              <div class="row">
                <div class="col text-center">
                  <img src="../../assets/hoang.png" alt="hoang bun" class="headshot mb-3 shadow-sm" />
                </div>
              </div>
              <div class="row text-center">
                <div class="col">
                  <h3 class="card-title">Hoang Bun</h3>
                  <i class="card-text text-info">Social Media Lead</i>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <hr class="mt-lg-5" />

    <!-- Customers -->
    <h1 class="text-center">Our Customers</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-lg-2 col-3 customer mb-4">
        <img class="img-fluid" src="https://picsum.photos/500/300/?random" alt />
      </div>
      <div class="col-lg-2 col-3 customer mb-4">
        <img class="img-fluid" src="https://picsum.photos/500/300/?random" alt />
      </div>
      <div class="col-lg-2 col-3 customer mb-4">
        <img class="img-fluid" src="https://picsum.photos/500/300/?random" alt />
      </div>
      <div class="col-lg-2 col-3 customer mb-4">
        <img class="img-fluid" src="https://picsum.photos/500/300/?random" alt />
      </div>
      <div class="col-lg-2 col-3 customer mb-4">
        <img class="img-fluid" src="https://picsum.photos/500/300/?random" alt />
      </div>
      <div class="col-lg-2 col-3 customer mb-4">
        <img class="img-fluid" src="https://picsum.photos/500/300/?random" alt />
      </div>
    </div>

    <!-- Modals -->
    <div
      class="modal fade"
      id="alexModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col">
                <button
                  type="button"
                  class="close float-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="fas fa-times fa-lg"></i>
                </button>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-lg-8 col">
                <img class="modalImg" src="../../assets/alex.png" alt="Alex Petkov" />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col text-center">
                <h1 class="modalName">Alexander Petkov</h1>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <hr />
                <p>Alexander Petkov is a high school student who attends Horton High School and is one of the co-founders of Spark West Network, a non-profit organization that aims to pull together the diverse organizations, events, and opportunities present in the Annapolis Valley. He is also the Chief Marketing Officer for Refresh Annapolis Valley. Upon meeting Alex, many people describe him as robotic because they say he looks and acts very serious. This is far from the truth. In fact, Alex behaves very humanly and has many human-like interests and engages in many human-like activities. He is an intermediate-level Python programmer and enjoys tinkering with electronics. He is also passionate about entrepreneurship, computer engineering, and world history. In his free time, he engages in typical human-like recreational activities such as watching YouTube or Netflix or playing video games. Also, Alex can and will kick your ass in any hack and slash, stealth, or grand strategy game.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="emmaModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col">
                <button
                  type="button"
                  class="close float-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="fas fa-times fa-lg"></i>
                </button>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-lg-8 col">
                <img class="modalImg" src="../../assets/emma.png" alt="Emma He" />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col text-center">
                <h1 class="modalName">Emma He</h1>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <hr />
                <p>您好! My name is Emma, a grade 11 student studying at Horton High School. I was originally from China, and now I proudly call Nova Scotia my second home. Entrepreneurship had always been an area of interest to me. Spark West Network is a project that allows me to explore this field in a hands-on way. We have an idea, we have a team, and we have passion, so now it's time to realize our vision! With my teamates, I hope to make my contribution to the Nova Scotia business world as a passionate youth!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="maxModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col">
                <button
                  type="button"
                  class="close float-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="fas fa-times fa-lg"></i>
                </button>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-lg-8 col">
                <img class="modalImg" src="../../assets/max.png" alt="Max Caplan" />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col text-center">
                <h1 class="modalName">Max Caplan</h1>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <hr />
                <p>Hello, I'm Max, an Acadia University Computer Science student. Ever since I went to the pitches for a local business ideation competition, Start It Up, I've been engaged and interested in local entrepreneurship. With a background in computer science and more artistic endeavors, I have competed in 4 Business ideation competitions placing both 2nd and 1st on two different occasions. I have always wanted to extend my entrepreneurship passion to my family friends and other members of my community, and I believe Spark West Network is the way to do that</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="hoangModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col">
                <button
                  type="button"
                  class="close float-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="fas fa-times fa-lg"></i>
                </button>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-lg-8 col">
                <img class="modalImg" src="../../assets/hoang.png" alt="Alex" />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col text-center">
                <h1 class="modalName">Hoang Bun</h1>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <hr />
                <p>My name is Hoang Quoc Bun, a grade 12 student studying at Horton High School. I am an international student from Vietnam. Although I am new for these kinds of project, joining Spark West Network is a great honor for me as an international student. I don’t have any background of coding nor experiences in business, but with the help of Spark West team, I have gone a long way. I have a great interest in computer and business at the same time, that’s why I’m trying all my best to help Spark West Network and the team itself</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="edddModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col">
                <button
                  type="button"
                  class="close float-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="fas fa-times fa-lg"></i>
                </button>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-lg-8 col">
                <img class="modalImg" src="../../assets/eddd.png" alt="Eddd" />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col text-center">
                <h1 class="modalName">Eddd</h1>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <hr />
                <p>
                  The famous Eddd, the true founder of
                  <i>Spark West Network</i>, and our beloved maskot
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
.card {
  border-radius: 12px;
}

#swoosh {
  padding: 200px;
  margin: -200px;
  background: url(../../assets/backdrop05.svg) center no-repeat;
  background-size: 100%;
}

@media (max-width: 991px) {
  #swoosh {
    background: url(../../assets/backdrop06.svg) center no-repeat;
    padding: 100px;
    margin: -100px;
    background-size: contain;
  }
}

@media (max-width: 575px) {
  #swoosh {
    background: url(../../assets/backdrop07.svg) center no-repeat;
    padding: 50px;
    margin: -50px;
    background-size: contain;
  }
}

.headshot {
  width: 160px;
  border-radius: 100%;
}

.team {
  text-decoration: none !important;
  transition: 0.5s;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25) !important;
}

.team:hover {
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.25) !important;
  transform: translateY(-10px);
}

.modalImg {
  max-width: 100%;
  border-radius: 12px;
}

#dream {
  cursor: pointer;
  font-family: "Nunito", sans-serif;
  font-size: 1.2em;
  background: -webkit-linear-gradient(
    45deg,
    #2ab7ca,
    #fd4260,
    #fed766
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    45deg,
    #2ab7ca,
    #fd4260,
    #fed766
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 200%;
  background-position: 0%;
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: 0.5s;
}

#dream:hover {
  background-position: 100%;
}

.customer {
  min-width: 160px;
}

.customer img {
  border-radius: 12px;
}

.modal-content {
  border-radius: 12px;
}

.modalName {
  background: -webkit-linear-gradient(
    45deg,
    #2ab7ca,
    #fd4260,
    #fed766
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    45deg,
    #2ab7ca,
    #fd4260,
    #fed766
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
  background-clip: text;
  background-position: center;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>
