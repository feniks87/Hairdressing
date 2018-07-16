import React, {Component} from 'react';
import HourItem from '../Hours/HourItem/HourItem'

const PATH_HOURS = 'http://localhost:3000/api/hours';

class Hours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
        };

        this.setHours = this.setHours.bind(this);
    }

    setHours(result) {
        this.setState({ result });
    }

    componentDidMount() {
        fetch(`${PATH_HOURS}`)
            .then(response => response.json())
            .then(result => this.setHours(result))
            .catch(error => console.log(error));
    }

    render(){
        const result = this.state.result;

        console.log(result);
        if (!result) { return null; }

        return (
            <div>
            {result.map(hourItem =>
                <HourItem day={hourItem.day} startTime={hourItem.startTime}finishTime={hourItem.finishTime}/>
            )}
            </div>
        );

    }
}



export default Hours;