import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

const API_URL = 'http://taichung-frontend.kktix.cc/events.json';

export default class Explorer extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        this.setState({
          events: data.entry,
          loaded: true
        });
      });
  }

  renderLoadingView() {
    return (
      <h2 className="text-center" style={{'marginTop': '5em'}}>
        <i className="fa fa-circle-o-notch fa-spin"></i>
        {' '}Loading Events...
      </h2>
    );
  }

  renderEvent(event, index) {
    return (
      <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
        <div className="card text-center">
          <div className="card-block">
            <h4 className="card-title">{event.title}</h4>
            <p className="card-text">{event.summary}</p>
            <a href={event.url} target="_blank" className="btn btn-primary">Event page</a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <div>
        <nav className="navbar navbar-light bg-faded">
          <a className="navbar-brand" href="/">Taichung Frontend Events</a>
        </nav>
        <div className="row p-a">
          {this.state.events.map((event, index) => this.renderEvent(event, index))}
        </div>
      </div>
    );
  }
}
