import React from 'react';

class InviteExpert extends React.Component {
    constructor(props) {
        super(props);
        this.first_name = "";
        this.last_name = "";
        this.email_addr = "";
        this.state = { bSubmitted : false };
    }
    submit_handler = (event) => {
        event.preventDefault();
        const form_data = new FormData(event.target);
        this.first_name = form_data.get('first_name');
        this.last_name = form_data.get('last_name');
        this.email_addr = form_data.get('email_addr');
        let out = {
            'first_name' : this.first_name,
            'last_name' : this.last_name,
            'email_address' : this.email_addr
        }
        console.log(JSON.stringify(out));
        if (this.first_name !== "" && this.last_name !== "" && this.email_add !== ""){
            this.setState ({ bSubmitted : true });
        }
        fetch('http://localhost:5000/CMS/new_app', {
            method: "POST",
            body: JSON.stringify(out),
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => console.log(response))
    }
    render(){
        if (this.state.bSubmitted === false) return ( 
            <div>
                <h1>Invite an Expert</h1>
                <form onSubmit = {this.submit_handler}>
                    <label htmlFor="text">First Name: </label>
                    <input type="text" name="first_name" id="first_name"/><br/>
                    <label htmlFor="text">Last Name: </label>
                    <input type="text" name="last_name" id="last_name"/><br/>
                    <label htmlFor="email">Email Address: </label>
                    <input type="email" name="email_addr" id="email_addr"/><br/>
                    <input type="submit"/>
                </form>
            </div>    
        );
        if (this.state.bSubmitted === true) return (
            <div>
                <h1>Invite an Expert</h1>
                <p>Thanks for inviting {this.first_name} {this.last_name}</p>
            </div>
        );
    }
}

export default InviteExpert;