import { SETTING_TITLE, SYSTEM_NAME } from "../config/constants"

const Setting = () => {

    document.title = SETTING_TITLE + ' | ' + SYSTEM_NAME

  return (
    <div>Setting</div>
  )
}

export default Setting