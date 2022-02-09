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
import {FiMail, FiLock} from 'react-icons/fi';

//auth and redux
import {connect} from 'react-redux';
import {loginUser} from "./../auth/actions/userActions";
import {useHistory} from "react-router-dom";

const Login = ({loginUser}) => {
    const history = useHistory();
  return (
    <div>
      <StyledFormArea>
        <Avatar image={Logo} />
        <StyledTitle color={colors.red} size={30}>
          Login
        </StyledTitle>

        <Formik
          initialValues = {{
            email: "",
            password: "",
          }}

          validationSchema ={
            Yup.object({
              email: Yup.string().email("Invalid Email Address").required("Email is required"),
              password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("password required"),

            })
          }

          onSubmit = {(values, {setSubmitting, setFieldError}) => {
            console.log(values);
            loginUser(values, history, setFieldError, setSubmitting);
          }}
        >
          {() => (
            <Form>

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

              <ButtonGroup>
              <StyledFormButton type="submit">
                Login
              </StyledFormButton>
              </ButtonGroup>

            </Form>
          )}
        </Formik>

        <ExtraText>
          Don't have an account? <TextLink to="/register"> Register </TextLink>
        </ExtraText>

      </StyledFormArea>
    </div>
  )
}

export default connect(null, {loginUser})(Login);
