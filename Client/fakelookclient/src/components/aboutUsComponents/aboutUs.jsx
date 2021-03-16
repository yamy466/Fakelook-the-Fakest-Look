import React from "react";
import fakelookLogo from "../../logo/logo_transparent.png";
function AboutUs() {
  return (
    <div>
      <div>
        <p>
          FakeLook is the fakest social network on earth... seriously it's fake as Duck, it's just a
          small project
        </p>
        <img src={fakelookLogo} height={100} width={100} />
      </div>
    </div>
  );
}
export default AboutUs;
