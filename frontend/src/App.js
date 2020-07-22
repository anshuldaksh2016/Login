import React from 'react';
import { observer }  from 'mobx-react';
import LoginForm from "./LoginForm";
// import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './store/UserStore';

import './App.css';

class App extends React.Component {

  async componentDidMount(){
    try {
      let res = await fetch('/isLoggedIn',{

        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      });

      let result = await res.json();

      if (result && result.success){
        // if user loggged in then we set loading to false 
        UserStore.loading = false ;
        UserStore.isLoggedIn = true ;
        UserStore.username = result.username;
      }
      else{
        UserStore.loading = false ;
        UserStore.isLoggedIn = false ;
        //  if user is not logged in 
      }

    } catch (e) {
      // if error is returned from the API

      UserStore.loading = false ;
      UserStore.isLoggedIn = false ;

      
    }
  }

  async doLogout() {
    // used to logout 
    //  async because we gonna use same fetch method here 
    try {
      let res = await fetch('/logout', {

        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }

      });

      let result = await res.json();

      if (result && result.success) {
        // if user loggged in then we set loading to false 
        UserStore.isLoggedIn = false ;
        //  it means the user has logged out 
        UserStore.username = '';
       
      }
     

    } catch (e) {
      // if error is returned from the API

        console.log(e);

    }
  }


  render() {

    if(UserStore.loading){ 
      return (
    <div className="app">

    <div className='container'>
      Loading please wait ....
    </div>
      
    </div>
  );
    }

    else{

      if(UserStore.isLoggedIn){
      
         return (
    <div className="app">
      <div className='container'>
        Welcome {UserStore.username}
        <SubmitButton
            text={'Log out'}
            disabled={false}
            onClick={() => this.doLogout() }

            />
      </div>
    </div>
  );
      
}
      return (
  <div className="app">

      <div className='container'>
      

      <LoginForm />

    </div>
      
  </div>
  );

    
}
  

      
  }

}

export default observer(App);
