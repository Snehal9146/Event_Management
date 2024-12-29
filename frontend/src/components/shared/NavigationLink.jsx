import { Link } from "react-router-dom"

                                    

const NavigationLink = ( prop ) => {
  return (
    <Link
     onClick={prop.onClick}
     className="nav-link" to={prop.to} style={{ background: prop.bg, color:prop.textColor }}>
       { prop.text }
    </Link>
  )
}

export default NavigationLink