import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ServicesPage.css';
import Header from '../../components/UI/Header/Header';
import TableItem from '../../components/UI/TableItem/TableItem';
import { serviceActions } from '../../_actions/service.actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class ServicesPage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(serviceActions.getAllServices());
    }

    render() {
        const services = this.props.services;
        return (
            <div className="container  table-responsive">
                <Header>Our Services</Header>
                {this.props.fetching && services.length === 0? <Spinner /> :
                <div className="Services">
                    <table className="table table-striped">
                        <tbody>
                        {this.props.services.map(service =>
                            <TableItem serviceName={service.name} price={service.price} key={service.id}/>
                        )}
                        </tbody>
                    </table>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { services, fetching } = state.servicesInfo;
    return {
        services,
        fetching,
    };
}

const connectedServicesPage = connect(mapStateToProps)(ServicesPage);

export { connectedServicesPage as ServicesPage };



