import { collection } from "firebase/firestore";
import { db } from "../../../../firebase/firebase-config";

const projectsColRef = collection(db, "projects");
const usersColRef = collection(db, "users");
const usersICColRef = collection(db, "usersIC");
const submittedProjectsColRef = collection(db, "submitted_projects");

export { projectsColRef, usersColRef, usersICColRef, submittedProjectsColRef };
