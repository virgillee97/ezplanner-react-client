/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import MuiVirtualizedTable from './MuiVirtualizedTable';
import InputBase from '@material-ui/core/InputBase';
import { tableStyle } from './theme';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56
};

class CourseTable extends Component {
  constructor(props) {
    super(props);
    this.rows = [];
  }

  updateTable() {
    if (this.props.data != null) {
      // TODO: Make this more efficient
      this.rows = [];
      for (let i = 0; i < this.props.data.length; i += 1) {
        this.rows.push({
          id: i,
          courseCode: this.props.data[i][0],
          courseTittle: this.props.data[i][1],
          link: this.props.data[i][2]
        });
      }
    }
  }
  render() {
    return (
      <div>
        <Grid container spacing={24}>
                <Grid item xs={12} lg={7} >
                <Typography variant="h4" gutterBottom component="h2">
            Possible Courses You May Take: 
          </Typography>
                </Grid>
                <Grid item xs={12} lg={5}>
                <Paper className={this.classes.root} elevation={1}>
          <InputBase
            className={this.classes.filterInput}
            value={this.state.keyword}
            placeholder="Filter Result"
            onChange={this.filterHandler}
          />
        </Paper>
                </Grid>
        </Grid>
        
        
        <Divider className={this.classes.filterDivider} /> 
        <Paper style={{ height: '76vh', width: '100%' }}>
          <MuiVirtualizedTable
            rowCount={this.rows.length}
            rowGetter={({ index }) => this.rows[index]}
            columns={[
              {
                width: 200,
                label: 'Course Code',
                dataKey: 'courseCode'
              },
              {
                width: 200,
                flexGrow: 0.5,
                label: 'Course Tittle',
                dataKey: 'courseTittle'
              },

              {
                flexGrow: 0.5,
                width: 200,
                label: 'Link',
                dataKey: 'link'
              }
            ]}
          />
        </Paper>
        {/* <IconButton>
          <Download/>
      </IconButton> */}
      </div>
    );
  }
}

CourseTable.propTypes = {
  data: PropTypes.array
};

const mapStateToProps = state => ({
  data: state.plannerCourses || null
});

export default connect(
  mapStateToProps,
  null
)(CourseTable);
