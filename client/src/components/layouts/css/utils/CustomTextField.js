import {
    TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const CustomTextField = withStyles({
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
})(TextField);

export default CustomTextField;