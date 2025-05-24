import { USER_TITLE, SYSTEM_NAME } from "../config/constants"

const User = () => {

  document.title = USER_TITLE + ' | ' + SYSTEM_NAME
  
  return (
    <h1>User</h1>
  )
}

export default User