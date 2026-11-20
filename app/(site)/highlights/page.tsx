export default function HighlightsPage() {
  return (
    <>
      <div className="section-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2 section-container-spacer">
              <div className="text-center">
                <h1 className="h2">02 : Highlights</h1>
                <p>Selected deals and speaking engagements.</p>
              </div>
            </div>
            <div className="col-md-12">
              <div id="myCarousel" className="carousel slide projects-carousel">
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="row">
                      <div className="col-sm-4 col-sm-offset-2">
                        <a href="./deals001" title="" className="black-image-project-hover">
                          {" "}
                          <img src="./static/assets/images/work01-hover.jpg" alt="" className="img-responsive" />
                          {" "}
                        </a>
                        {" "}
                        <div className="card-container card-container-lg">
                          <h4>August 2023</h4>
                          <h3>Katy Perry Deal</h3>
                          <p>
                            Helped the parent company of New Living Style sign a distribution deal to carry Katy Perry Footwear Collections.
                          </p>
                          {" "}
                          <a href="./deals001" title="" className="btn btn-default">Discover</a>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <a href="./events001" title="" className="black-image-project-hover">
                          {" "}
                          <img src="./static/assets/images/fresh_fire.jpg" alt="" className="img-responsive" />
                          {" "}
                        </a>
                        {" "}
                        <div className="card-container card-container-lg">
                          <h4>July 22nd 2023</h4>
                          <h3>Fresh Fire Conference</h3>
                          <p>Spoke at Salvation Army sharing the mission behind Heavenya.</p>
                          {" "}
                          <a href="./events001" title="" className="btn btn-default">More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {" "}
          {" "}
        </div>
      </div>
    </>
  );
}
