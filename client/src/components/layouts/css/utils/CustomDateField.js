import 'date-fns';
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { withStyles } from '@material-ui/styles';

const CustomDateField = withStyles({
    root: {
        "& label.Mui-focused": {
          color: "#80cbc4",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#80cbc4",
        },
        "& .MuiOutlinedInput-root:after": {
          borderColor: "#80cbc4",
        },
      }
})(KeyboardDatePicker);

export default CustomDateField;