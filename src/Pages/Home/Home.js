import React from "react";
import './styles.css';
import Card from '../../Components/Card/Card';
import read from "../../Images/read.png";
import write from "../../Images/write.jpg"
import finish from "../../Images/finish.jpg"

const Home = () => {

    return (
        <div className="ui container cards">
            <h1 className="header">"Welcome To Owie's Story Page"</h1>
            <style>{'body { background: rgb(238,174,202);\n' +
            'background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%); }'}</style>
            <div className="Grid">
                <Card read="Read Story" avatar =<img alt="write" src={read} width="200" height="200" />/>
                <Card write="Write Story" avatarwrite =<img alt="write" src={write} width="200" height="200" />/>
                <Card finish="Finish Story" avatarfinish =<img alt="write" src={finish} width="200" height="200" />/>
            </div>
        </div>
    );
};

export default Home;