import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserAccountPage.css'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Header from '../../components/UI/Header/Header';
import ListItem from '../../components/UI/ListItem/ListItem';
import moment  from 'moment';
import Spinner from '../../components/UI/Spinner/Spinner';

import {bookingActions} from '../../_actions/booking.actions';
import { userActions } from '../../_actions/user.actions';
import {teamActions} from '../../_actions/team.actions';

class UserAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: props.userInfo.name,
                phone: props.userInfo.phone,
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(bookingActions.getBookings());
        dispatch(teamActions.getTeam());
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.name && user.phone) {
            let userToSubmit = {
                phone: user.phone,
                name: user.name,
                email: this.props.userInfo.email,
                id: this.props.userInfo.id
            }
            dispatch(userActions.updateClient(userToSubmit, this.props.authentication.idToken));
        }
    }

    render () {
        if (!this.props.authentication.loggedIn) {
            this.props.history.replace('/login');
        }

        const { submitted } = this.state;

        const alert = this.props.alert;

        const bookings = this.props.bookingInfo.bookings;
        const teamMembers = this.props.team.teamMembers;

        let userBookings = [];

        if (bookings.length !== 0 && teamMembers.length !== 0) {
            debugger;
            userBookings = bookings.filter(b => b.clientId === this.props.authentication.localId)
            .map((b) => {
                debugger;
                return {
                time: moment(b.time),
                stylistName: teamMembers.find(t => t.id === b.stylistId).name,
                id: b.id
                };
            });

            userBookings.sort((a, b) => {
                return a.time.isBefore(b.time) ? 1 : a.time.isAfter(b.time) ? -1 : 0;
            })
        }

        return (
            <div className="container">
                <Header>My Account</Header>
                {alert.message &&
                        <div className={`text-center alert ${alert.type}`}>{alert.message}</div>
                        }
                {(this.props.bookingInfo.fetching
                    || this.props.team.fetching
                    || this.props.userInfo.fetching)
                    && (bookings.length === 0 || teamMembers.length === 0) ? <Spinner /> :
                <div className="container">

                    <div className="row">
                        <div className="col-sm-6">
                            <form className="Wrap-info" onSubmit={this.handleSubmit}>
                                <h5>Personal info</h5>
                                <Input label="Name:" value={this.state.user.name}
                                    onChange={this.handleChange}
                                    showError={submitted && !this.state.user.name}
                                    name="name"
                                    errorMessage="Name is required"
                                    type="text"/>
                                <Input label="Contact phone:" value={this.state.user.phone}
                                    onChange={this.handleChange}
                                    showError={submitted && !this.state.user.phone}
                                    name="phone"
                                    errorMessage="Phone number is required"
                                    type="text"/>
                                <Button type="Submit">Save</Button>
                            </form>
                        </div>
                        <div className="col-sm-6">
                            <h5>Booking history</h5>
                            <div>
                                <ul>
                                    {userBookings.map(booking =>
                                        <ListItem value={`${booking.stylistName} (${booking.time.format('MMMM Do YYYY dddd, h:mm a').toString()})`} key={booking.id}/>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
        alert: state.alert,
        bookingInfo: state.bookingInfo,
        team: state.team,
        userInfo: state.userInfo
    };
}

const connectedUserAccountPage = connect(mapStateToProps)(UserAccountPage);

export { connectedUserAccountPage as UserAccountPage };