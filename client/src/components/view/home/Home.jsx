import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsq-uVFVShnKQkFzgCZiE7lje6oHgSnxt5uuetEUyIBmLWamxo'}
          alt={'Welcome to d.ventures Portal!'}/>
      </div>
    );
  }
}