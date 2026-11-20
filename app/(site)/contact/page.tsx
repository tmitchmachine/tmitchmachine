export default function ContactPage() {
  return (
    <>
      <div className="section-container">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="section-container-spacer text-center">
                <h1 className="h2">04 : Contact</h1>
              </div>
              {" "}
              <li>
                <span className="fa-icon">
                  {" "}
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  {" "}
                </span>
                {" "}
                <a href="tel:+16503822478">+1 (650) 382-2478</a>
              </li>
              {" "}
              <li>
                <span className="fa-icon">
                  {" "}
                  <i className="fa fa-at" aria-hidden="true"></i>
                  {" "}
                </span>
                {" "}
                <a href="mailto:contact@tmitchmachine.com">contact@tmitchmachine.com</a>
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
