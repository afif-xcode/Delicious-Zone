import signupImg from "../assets/Images/signupImage.jpg"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join DeliciousZone Today!"
      description1="Create Your Account."
      description2="Unlock a world of culinary delights and exclusive offers. Sign up now to enjoy a host of benefits"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
