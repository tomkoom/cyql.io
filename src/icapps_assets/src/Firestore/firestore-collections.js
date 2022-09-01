import { collection } from "firebase/firestore";
import { db } from "../../../../firebase/firebase-config";

const projectsCollRef = collection(db, "projects");
const usersCollRef = collection(db, "users");
const usersICCollRef = collection(db, "usersIC");
const submittedProjectsCollRef = collection(db, "submitted_projects");

export { projectsCollRef, usersCollRef, usersICCollRef, submittedProjectsCollRef };
