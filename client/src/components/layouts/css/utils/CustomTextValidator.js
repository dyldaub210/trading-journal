import { TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';

const CustomTextValidator = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#80cbc4",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#80cbc4",
    },
    "& .MuiOutlinedInput-root:after": {
      borderColor: "#80cbc4",
    }
  }
})(TextValidator);

export default CustomTextValidator;