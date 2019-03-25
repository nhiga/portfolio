import React from "react";

function Experience() {
  return (
    <>
      <div className="section__sub-section">
        <div className="experience__header">
          <h2>
            <span className="section--highlight">
              Senior Software Engineer{" "}
            </span>
            <span>Esurance</span>
          </h2>
          <h4>September 2015 - October 2018</h4>
          <h5>San Francisco</h5>
        </div>
        <div className="experience__items">
          <ul>
            <li>Full-stack JavaScript engineer</li>
            <li>
              Designed and developed a platform for creating a library of
              reusable React components that can be integrated into non-React
              legacy applications
            </li>
            <li>
              Developed client-facing e-commerce site and customer service agent
              web applications
            </li>
          </ul>
        </div>
      </div>
      <div className="section__sub-section">
        <div className="experience__header">
          <h2>
            <span className="section--highlight">
              Software Developer & Consultant{" "}
            </span>
            <span>Hewlett-Packard</span>
          </h2>
          <h4>August 2008 – September 2015</h4>
          <h5>San Francisco</h5>
        </div>
        <div className="experience__items">
          <ul>
            <li>Web and applications developer</li>
            <li>Microsoft Dynamics CRM developer</li>
            <li>
              Developed various applications for the Public Sector and Financial
              industry, as well as Customer Engagement Management and Warranty
              Claims Management systems
            </li>
          </ul>
        </div>
      </div>
      <div className="section__sub-section">
        <div className="experience__header">
          <h2>
            <span className="section--highlight">Software Developer </span>
            <span>Electronic Data Systems</span>
          </h2>
          <h4>April 2004 - July 2008</h4>
          <h5>Los Angeles</h5>
        </div>
        <div className="experience__items">
          <ul>
            <li>Web and applications developer</li>
            <li>Developed various applications for the airline industry</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Experience;
