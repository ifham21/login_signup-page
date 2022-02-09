import {useState} from 'react';
import {useField} from 'formik';
import {StyledTextInput, StyledLabel, StyledIcon, ErrorMessage} from './../components/Styles';

//Eye icons for password field
import {FiEyeOff, FiEye} from 'react-icons/fi';

export const TextInput = ({icon, ...props}) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);

  return(
    <div style={{position: "relative"}}>
      <StyledLabel htmlFor = {props.name}>
      {props.label}
      </StyledLabel>

      {props.type !=="password" && <StyledTextInput {...field} {...props}/> }

      {props.type === "password" && (
        <StyledTextInput
        // invalid={meta.touched && meta.error} --> uncomment this and add this to StyledTextInput as well to make view the validation better
          {...field} {...props}
          type = {show ? "text" : "password"}
        />
      )}

      <StyledIcon> {icon} </StyledIcon>

      {
        props.type === "password" && (
         <StyledIcon onClick = {() => setShow(!show)} right>
          {show && <FiEye /> }
          {!show && <FiEyeOff /> }
         </StyledIcon>
      )}

      {meta.touched && meta.error ? (
        <ErrorMessage> {meta.error} </ErrorMessage>
      ): (
        <ErrorMessage style={{visiblity: "hidden"}}> </ErrorMessage>
      )}
    </div>
  )
}
