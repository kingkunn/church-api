import events from "./events";
import sermons from "./sermons";
import auth from './auth';
import members from './members'
import upload from "./image_upload";

const routes = {
    events,
    sermons,
    members,
    auth,
    upload
}

export default routes;