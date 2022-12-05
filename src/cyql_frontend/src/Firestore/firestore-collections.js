import { collection } from "firebase/firestore";
import { db } from "../../../../firebase/firebase-config";

// const projectsColRef = collection(db, "projects");
const pColRef = collection(db, "projects_upd");
const submittedProjectsCollRef = collection(db, "submitted_projects");

export { /* projectsColRef */ pColRef, submittedProjectsCollRef };
