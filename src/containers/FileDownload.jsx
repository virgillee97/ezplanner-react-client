import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { searchStyle } from './theme';
import { connect } from 'react-redux';
import Download from '@material-ui/icons/CloudDownload';

class FileDownload extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
  }

  exportCsv(){
    var csvRow = [];
    var csvData = [['','#','Course Code', 'Course Tittle', 'Link']];
    var inputCourses = this.props.input;
    var plannerCourses = this.props.courseData;
    var tempCourse;
    var countNum = 1;

    if(plannerCourses){
      csvData.push(['The courses you have taken:']);

     inputCourses.map(inputCourses =>{
        tempCourse = inputCourses.split(/(\d+)/);
        csvData.push([countNum++, tempCourse[0] + ' ' + tempCourse[1] + tempCourse[2]]);
      });

      csvData.push(['The courses you can take:']);

      countNum = 1;

      plannerCourses.map(plannerCourses =>{
        csvData.push([countNum++, plannerCourses[0], plannerCourses[1].replace(/,/g, ''), plannerCourses[2]]);  
      });

      csvData.map(csvData =>{
        csvRow.push(csvData.join(","));
      });

      var csvString = csvRow.join("\n");

      var download = document.createElement("a");
      download.href = 'data:text/csv;charset=utf-8' + csvString;
      download.target = "_Blank";
      download.download = "EZPlanner.csv";
      document.body.appendChild(download);
      download.click();
    }else{
      //TODO:display error message;
      console.warn("No course input!!!");
    }
  } 

  render() {
    return (
        <IconButton
          color="primary"
          className={this.classes.iconButton}
          aria-label="Enter"
          onClick={()=>{this.exportCsv()}}
          component="label"
        >
          <Download />
        </IconButton>
    );
  }
}

FileDownload.propTypes = {
  courseData: PropTypes.array,
  input: PropTypes.array
};

const mapStateToProps = state => ({
  courseData: state.plannerCourses || null,
  input: state.coursesInput || null
});

export default withStyles(searchStyle)(
  connect(
    mapStateToProps,
    null
  )(FileDownload)
);
