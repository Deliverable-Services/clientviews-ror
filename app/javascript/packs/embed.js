import "../embed/style.css";
import React from "react";
import { render } from "react-dom";
import { Modal } from "../embed/components/Modal";
import yoha from "../embed/yoha";

window._clientviews = _clientviews;
// window._clientviewsQueue = window._clientviewsQueue || [];

function _clientviews(name, params) {
  return clientviews[name](params);
}

const App = ({ surveyId, scriptSrc, visitorId }) => (
  <Modal id={surveyId} scriptSrc={scriptSrc} visitorId={visitorId} />
);

let loadEvent = "DOMContentLoaded";

if (typeof Turbolinks === "object" && Turbolinks.supported) {
  loadEvent = "turbolinks:load";
} else if (typeof Turbo === "object" && Turbo.supported) {
  loadEvent = "turbo:load";
}

document.addEventListener(loadEvent, async () => {
  if (window?.clientviews?.setup?.id == null) {
    console.error(
      "Please copy code snippet from the Dashboard to include survey setup"
    );
    return;
  }

  if (document.getElementById("u-wrapper")) {
    if (document.getElementById("u-wrapper").dataset.noJs === "true") {
      return;
    }
  }
  let scriptSrc = "http://localhost:5150";
  if (!document.getElementById("clientviews-js")) {
    return;
  }
  const scriptUrlPath = new URL(document.getElementById("clientviews-js").src);
  let host = scriptUrlPath.host;
  if (host.match("assets")) {
    host = "app.clientviews.com";
  }
  scriptSrc = `${scriptUrlPath.protocol}//${host}`;

  const visitorId = yoha.getVisitorId();

  const htmlBody = document.body;
  const uWrapper = document.createElement("div");
  uWrapper.id = "u-wrapper";
  htmlBody.append(uWrapper);
  render(
    <App
      surveyId={window.clientviews.setup.id}
      scriptSrc={scriptSrc}
      visitorId={visitorId}
    />,
    document.getElementById("u-wrapper")
  );

  yoha.configure({
    visitsUrl: `${scriptSrc}/u/c/visits`,
    identifyUrl: `${scriptSrc}/u/c/identify`,
    eventsUrl: `${scriptSrc}/u/c/events`,
  });

  yoha.createVisit(window.clientviews.setup.id);
});

window.clientviews.display = (id) => {
  const event = new Event(`survey.${id}.display`);
  window.dispatchEvent(event);
};

window.clientviews.hide = (id) => {
  const event = new Event(`survey.${id}.hide`);
  window.dispatchEvent(event);
};

window.clientviews.identify = (data) => {
  yoha.identify(data);
};

window.clientviews.event = (event) => {
  yoha.createEvent(event);
};
