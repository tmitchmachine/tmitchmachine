export default function HomePage() {
  return (
    <>
      <div className="hero-full-container background-image-container white-text-container" style={{ backgroundImage: "url('./static/assets/images/space.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="hero-full-wrapper">
                <div className="text-content">
                  <h1>
                    <br />
                    {" "}
                    <span id="typed-strings">
                      {" "}
                      <span>Hello, I'm Travis Mitchell</span>
                      {" "}
                      <span>I'm a College Student Researcher</span>
                      {" "}
                    </span>
                    {" "}
                    <span id="typed"></span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
