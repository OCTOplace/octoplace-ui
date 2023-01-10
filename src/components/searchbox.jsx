import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: '40px',
    marginRight: theme.spacing.unit,
    width: 300,
    
  },

  cssLabel: {
    color : 'green'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    height: "60px",
    
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important',
    color: "white !important",
    borderRadius: "25px !important",
    height: "60px",
  },

});

class ValidField extends React.Component {
  state = {
    name: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={`${classes.container} sb`}  noValidate autoComplete="off">
        <TextField
          id="standard-name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          variant="outlined"
          placeholder='Search'
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            endAdornment: <InputAdornment position='end'><SearchIcon sx={{color:"white"}}/></InputAdornment>
          }}
        />
      </form>
    );
  }
}

ValidField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ValidField);
