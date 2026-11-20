export default function MediaPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: "\n    /* Lightweight page-local styling for the media grid */\n    .media-card {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-between;\n      height: 100%;\n      min-height: 180px;\n      padding: 24px 18px;\n      border: 1px solid #e5e5e5;\n      border-radius: 8px;\n      transition: all 0.2s ease;\n      background: #fff;\n      text-align: center;\n      gap: 8px;\n    }\n\n    .media-card:hover {\n      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);\n      transform: translateY(-4px);\n      text-decoration: none;\n    }\n\n    .media-icon {\n      font-size: 32px;\n      margin-bottom: 12px;\n      color: #222;\n    }\n\n    .media-card h4 {\n      margin: 8px 0;\n    }\n\n    .media-logo {\n      width: 32px;\n      height: 32px;\n      margin-bottom: 12px;\n      object-fit: contain;\n    }\n  " }} />
      <div className="section-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2 section-container-spacer">
              <div className="text-center">
                <h1 className="h2">07 : Media</h1>
                <p>Connect with Travis Mitchell across social channels.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <a className="media-card" href="https://www.linkedin.com/in/travis-mitchell-tmitchmachine" target="_blank" rel="noopener noreferrer">
                {" "}
                <div className="media-icon">
                  <i className="fa fa-linkedin"></i>
                </div>
                <h4>LinkedIn</h4>
                {" "}
                <span className="btn btn-default btn-sm">Open</span>
                {" "}
              </a>
            </div>
            <div className="col-sm-6 col-md-3">
              <a className="media-card" href="https://www.youtube.com/channel/UCNLZ0IvNxUWLCCa2UsnXlDA" target="_blank" rel="noopener noreferrer">
                {" "}
                <div className="media-icon">
                  <i className="fa fa-youtube-play"></i>
                </div>
                <h4>YouTube</h4>
                {" "}
                <span className="btn btn-default btn-sm">Open</span>
                {" "}
              </a>
            </div>
            <div className="col-sm-6 col-md-3">
              <a className="media-card" href="https://www.tiktok.com/@tmitchmachine" target="_blank" rel="noopener noreferrer">
                {" "}
                <div className="media-icon">
                  <i className="fa fa-music"></i>
                </div>
                <h4>TikTok</h4>
                {" "}
                <span className="btn btn-default btn-sm">Open</span>
                {" "}
              </a>
            </div>
            <div className="col-sm-6 col-md-3">
              <a className="media-card" href="https://www.instagram.com/tmitchmachine/" target="_blank" rel="noopener noreferrer">
                {" "}
                <div className="media-icon">
                  <i className="fa fa-instagram"></i>
                </div>
                <h4>Instagram</h4>
                {" "}
                <span className="btn btn-default btn-sm">Open</span>
                {" "}
              </a>
            </div>
            <div className="col-sm-6 col-md-3">
              <a className="media-card" href="https://www.facebook.com/tmitchmachine/" target="_blank" rel="noopener noreferrer">
                {" "}
                <div className="media-icon">
                  <i className="fa fa-facebook"></i>
                </div>
                <h4>Facebook</h4>
                {" "}
                <span className="btn btn-default btn-sm">Open</span>
                {" "}
              </a>
            </div>
            <div className="col-sm-6 col-md-3">
              <a className="media-card" href="https://x.com/tmitchmachine" target="_blank" rel="noopener noreferrer">
                {" "}
                <div className="media-icon">
                  <i className="fa fa-twitter"></i>
                </div>
                <h4>X (Twitter)</h4>
                {" "}
                <span className="btn btn-default btn-sm">Open</span>
                {" "}
              </a>
            </div>
            <div className="col-sm-6 col-md-3">
              <a className="media-card" href="https://www.snapchat.com/@tmitchmachine" target="_blank" rel="noopener noreferrer">
                {" "}
                <div className="media-icon">
                  <i className="fa fa-snapchat-ghost"></i>
                </div>
                <h4>Snapchat</h4>
                {" "}
                <span className="btn btn-default btn-sm">Open</span>
                {" "}
              </a>
            </div>
            <div className="col-sm-6 col-md-3">
              <a className="media-card" href="https://linktr.ee/tmitchmachine" target="_blank" rel="noopener noreferrer">
                {" "}
                <div>
                  <img className="media-logo" src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linktree.svg" alt="Linktree logo" />
                </div>
                <h4>Linktree</h4>
                {" "}
                <span className="btn btn-default btn-sm">Open</span>
                {" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
