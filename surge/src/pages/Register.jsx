//styled components
import {StyledTextInput, StyledFormArea, StyledFormButton, StyledLabel, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink} from './../components/Styles';

//logo
import Logo from "./../assets/logo.png";

//formik
import {Formik, Form} from 'formik';
import {TextInput} from './../components/FormLib';

//importing vakidation components
import * as Yup from 'yup';

//icons
import {FiMail, FiLock, FiUser, FiUserCheck} from 'react-icons/fi';

//auth and redux
import {connect} from 'react-redux';
import {registerUser} from "./../auth/actions/userActions";
import {useHistory} from "react-router-dom";

const Register = ({registerUser}) => {
  const history = useHistory();
  return (
    <div>
      <StyledFormArea>
        <Avatar image={Logo} />
        <StyledTitle color={colors.red} size={30}>
          Register
        </StyledTitle>

        <Formik
          initialValues = {{
            email: "",
            password: "",
            repeatPassword: "",
            name: "",
            userName:"",
          }}

          validationSchema ={
            Yup.object({
              email: Yup.string().email("Invalid Email Address").required("Email is Required"),
              password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Password is Required"),
              // name: Yup.string().required("Required"),
              name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Full name is required"),
              userName: Yup.string().min(2, "Too Short!").max(10, "Too Long!").required("Username is required"),
              repeatPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Password must match"),

            })
          }

          onSubmit = {(values, {setSubmitting, setFieldError}) => {
            registerUser(values, history, setFieldError, setSubmitting);
          }}
        >
          {() => (
            <Form>

              <TextInput
                name ="name"
                type = "text"
                label = "Full Name"
                placeholder = "James Cameron"
                icon = { <FiUser/> }
              />

              <TextInput
                name ="userName"
                type = "text"
                label = "Username"
                placeholder = "cameron"
                icon = { <FiUserCheck/> }
              />

              <TextInput
                name ="email"
                type = "text"
                label = "Email Address"
                placeholder = "abc@example.com"
                icon = { <FiMail/> }
              />

              <TextInput
                name ="password"
                type = "password"
                label = "Password"
                placeholder = "******"
                icon = { <FiLock/> }
              />

              <TextInput
                name ="repeatPassword"
                type = "password"
                label = "Confirm Password"
                placeholder = "******"
                icon = { <FiLock/> }
              />

              <ButtonGroup>
              <StyledFormButton type="submit">
                Register
              </StyledFormButton>
              </ButtonGroup>

            </Form>
          )}
        </Formik>

        <ExtraText>
          Already have an account? <TextLink to="/login"> Login </TextLink>
        </ExtraText>

      </StyledFormArea>
    </div>
  )
}

export default connect(null, {registerUser})(Register);
