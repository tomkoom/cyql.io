import { collection } from "firebase/firestore";
import { db } from "../../../../firebase/firebase-config";

const projectsCollRef = collection(db, "projects");
const submittedProjectsCollRef = collection(db, "submitted_projects");

export { projectsCollRef, submittedProjectsCollRef };
