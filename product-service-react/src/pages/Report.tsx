import { REPORT_TITLE, SYSTEM_NAME } from "../config/constants"

const Report = () => {

    document.title = REPORT_TITLE + ' | ' + SYSTEM_NAME

  return (
    <div>Report</div>
  )
}

export default Report