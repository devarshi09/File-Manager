import React, { Fragment } from "react";
import { connect } from "react-redux";
import "./styles.css";
import axios from "axios";

class ShowDir extends React.Component {
  componentDidMount() {
    console.log(this.props.currentFolder);
    axios
      .post(`http://localhost:5000/api/changeDirectory`, {
        path: this.props.currentFolder
      })
      .then(res => {
        axios.get(`http://localhost:5000/api/getDirectory`).then(res => {
          this.props.initializeDirectory(res.data);
          console.log(this.props.enterTheFolder);
        });
      });
  }

  showThem = () => {
    return (
      <div className="showThemAll">
        {this.props.enterTheFolder.map((e, i) => {
          return (
            <div className="showDir" key={i}>
              {e.map((e, ii) => {
                if (e.select === false) {
                  return (
                    <div
                      key={ii}
                      onClick={() => this.props.newRoute(i, ii, e.name)}
                    >
                      {e.name}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={ii}
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "3px",
                        paddingLeft: "6px"
                      }}
                      onClick={() => this.props.newRoute(i, ii, e.name)}
                    >
                      {e.name}
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentFolder !== prevProps.currentFolder) {
      console.log(this.props.currentFolder);
      axios
        .post(`http://localhost:5000/api/changeDirectory`, {
          path: this.props.currentFolder
        })
        .then(res => {
          console.log(res.data);
        })
        .then(() => {
          axios.get(`http://localhost:5000/api/getDirectory`).then(res => {
            this.props.enterFolder(this.props.currentDepth, res.data);
          });
        });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="Route">{this.props.currentFolder}</div>
        {this.showThem()} <br />{" "}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    enterTheFolder: state.enterTheFolder,
    currentFolder: state.currentFolder,
    currentDepth: state.currentDepth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    enterFolder: (index, folder) => {
      dispatch({
        type: "enterFolder",
        index: index,
        payload: folder
      });
    },
    newRoute: (index, nestedIndex, folder) => {
      dispatch({
        type: "newRoute",
        index: index,
        nestedIndex: nestedIndex,
        payload: folder
      });
    },
    initializeDirectory: apiData => {
      dispatch({
        type: "initializeDirectory",
        payload: apiData
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowDir);
