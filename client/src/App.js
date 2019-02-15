import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import axios from 'axios';
import './App.css';

const emptyProjectForm = {
  projName: "",
  projDescr: "",
  projCompleted: false
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      actions: [],
      ...emptyProjectForm
    }
  }

  handleChanges = (e) => {
    this.setState ({
      [e.target.name]: e.target.value
    });
  }

  getProjects() {
    axios.get('/api/projects')
      .then(res => {
        // console.log(res.data);
        this.setState({
          projects: res.data
        })
      })
      .catch(err => console.log(err));
  }

  getActions() {
    axios.get('/api/actions')
      .then(res => {
        console.log(res.data);
        this.setState({
          actions: res.data
        })
      })
      .catch(err => console.log(err));
  }

  addProject = (e) => {
    // need to update this before using

    // e.preventDefault();
    // const postFormData = {
    //   title: this.state.title,
    //   contents: this.state.contents
    // }
    // axios.post('/api/posts', postFormData)
    //   .then(res => {
    //     // console.log(res.data.message);
    //     this.setState({ 
    //       posts: res.data.message,
    //       ...emptyCommentForm
    //     });
    //   })
    //   .catch(err => {
    //     console.log(`error addComment: ${err}`);
    //   })
  }

  deleteProject(id) {
    // need to update this before using

    // console.log("delete post: ", id);
    // axios.delete(`/api/posts/${id}`)
    //   .then(res => {
    //     this.getComments();
    //   })
    //   .catch( err => {
    //     console.log(`error deletePost id ${id}. Err: ${err}`);
    //   })
  }

  componentDidMount() {
    this.getProjects();
    this.getActions();
  }

  render() {
    const projects = this.state.projects.map( project => {
      const actions = this.state.actions
        .filter(action => {
          return project.id === action.project_id;
        })
        .map( action => {
          console.log(action);
          return (
            <Card key={action.id}>
              <Typography variant="body2">{action.description}</Typography>
              <Typography variant="body1">{action.notes}</Typography>
              <Checkbox checked={action.completed}></Checkbox>
            </Card>
          );
        });
      // console.log(project);
      return (
        <Card key={project.id} 
          raised 
          style={{ 
            margin: "15px",
            padding: "15px", 
            maxWidth: "250px",
            textAlign: "left"
          }}
        >
          <Typography variant="h5">{project.name}:</Typography>
          <Typography variant="body1">{project.description}</Typography>
          <Typography variant="body2">Actions:</Typography>
            {actions}
          <Button
            onClick={() => this.deleteProject(project.id)}
          >Delete Project</Button>
        </Card>
      );
    });
    return (
      <div className="App">
        <Typography variant="h3">Welcome to PROJECTS</Typography>
        <Typography variant="h4">Add Project</Typography>
        <Grid 
          container
          direction="row"
          justify="space-evenly"
          style={{
            padding: "25px"
          }}
        >
          <Card
            raised 
            style={{ 
              padding: "15px", 
              maxWidth: "250px",
              textAlign: "left"
            }}
          >
            <form onSubmit={this.addProject}>
              <TextField
                variant="outlined"
                label="Project Name"
                name="projName"
                value={this.state.projName}
                onChange={this.handleChanges}
                autoComplete="off"
                style={{ width: '100%', paddingBottom: "15px" }}
              />
              <TextField
                variant="outlined"
                label="Project Description"
                name="projDescr"
                value={this.state.projDescr}
                onChange={this.handleChanges}
                autoComplete="off"
                style={{ width: '100%', paddingBottom: "15px" }}
              />
              <Button type="submit">Add Project</Button>
            </form>
          </Card>
        </Grid>
        <Typography variant="h4">Current Projects:</Typography>
        <Grid 
          container
          direction="row"
          justify="space-evenly"
          style={{
            padding: "50px"
          }}
        >
          {projects}
        </Grid>
      </div>
    );
  }
}

export default App;
