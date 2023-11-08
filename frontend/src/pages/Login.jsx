import Template from "../components/core/Auth/Template"
import LoginImage from "../assets/Images/loginImage.jpg"

function Login() {
  return (
    <Template
      title="Welcome Back!"
      description1="Login to Your Account"
      description2= "Sign in to access exclusive offers, personalized recommendations, order tracking, and more culinary delights!"
      image = {LoginImage}
      formType="login"
    />
  )
}

export default Login
