import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { searchStyle } from './theme';
import { connect } from 'react-redux';
import Download from '@material-ui/icons/CloudDownload';

class FileDownload extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.csvString = null;
  }

  generateCsv() {
    var csvRow = [];
    var csvData = [['','#','Course Code', 'Course Tittle', 'Link']];
    var inputCourses = this.props.input;
    var plannerCourses = this.props.courseData;
    var tempCourse;
    var countNum = 1;

    if(plannerCourses){
      csvData.push(['The courses you have taken:']);

     inputCourses.forEach(inputCourses =>{
        tempCourse = inputCourses.split(/(\d+)/);
        csvData.push([countNum++, tempCourse[0] + ' ' + tempCourse[1] + tempCourse[2]]);
      });

      csvData.push(['The courses you can take:']);

      countNum = 1;

      plannerCourses.forEach(plannerCourses =>{
        csvData.push([countNum++, plannerCourses[0], plannerCourses[1].replace(/,/g, ''), plannerCourses[2]]);  
      });

      csvData.forEach(csvData =>{
        csvRow.push(csvData.join(","));
      });

      this.csvString = csvRow.join("\n");
    }else{
      //TODO: display error message
      console.warn("No Input!!!")
      this.csvString = null;
    }
  }

  render() {
    return (
      <div>
        {this.generateCsv()}
        <a
          href={this.csvString ? ('data:text/csv;charset=utf-8' + this.csvString) : null}
          target="_Blank"
          rel="noopener noreferrer"
          download="EZPlanner.csv"
          on={this.generateCsv()}
        >
          <Download />
        </a>
      </div>
    );
  }
}

FileDownload.propTypes = {
  courseData: PropTypes.array,
  input: PropTypes.array
};

const mapStateToProps = state => ({
  courseData: state.plannerCourses,
  input: state.coursesInput
});

export default withStyles(searchStyle)(
  connect(
    mapStateToProps,
    null
  )(FileDownload)
);
