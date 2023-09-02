// nanoid https://github.com/ai/nanoid
import { customAlphabet } from "nanoid"

const alphabet = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
const numbers = "0123456789"
const size = 12
export const projectId: () => string = customAlphabet(alphabet + numbers, size)
