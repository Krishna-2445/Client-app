import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Label, Segment, Modal, List } from 'semantic-ui-react';
import { Field } from 'redux-form';
// import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import InputField from '../../elements/input-field/InputField';
import SelectField from '../../elements/select-field/SelectField';

class CreatePolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policyStartDate: moment(),
      policyEndDate: moment().year(moment().year() + 1),
      producerData: {},
      modalOpen: false,
    };

    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.renderField = this.renderField.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.submitPolicy = this.submitPolicy.bind(this);
    this.updateFormValues = this.updateFormValues.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createExposure = this.createExposure.bind(this);
    this.renderExposureButtons = this.renderExposureButtons.bind(this);
    this.renderExposureItems = this.renderExposureItems.bind(this);
    this.showExposure = this.showExposure.bind(this);
    // this.props.exposures.forEach((ex) => {
    //   console.log(ex);
    // });
  }

  componentWillUpdate(nextProps) {
    if (!(Object.is(nextProps.producerData, this.state.producerData)) &&
      !(Object.is(nextProps.producerData, {}))) {
      this.setState({
        producerData: nextProps.producerData,
      }, () => {
        this.updateFormValues();
      });
    }
  }

  updateFormValues = () => {
    const tempObjArray = Object.entries(this.state.producerData);
    tempObjArray.forEach((data) => {
      if (data[0] === 'producerAppointmentStatus') {
        this.props.changeField('appointmentStatus', data[1]);
      } else if (data[0] === 'amlCertificationUpToDate') {
        this.props.changeField('producerIsCertified', data[1]);
      } else if (data[0] === 'licenseStateCode') {
        this.props.changeField('licenseState', data[1]);
      } else {
        this.props.changeField(data[0], data[1]);
      }
    });
  };

  handleOnBlur = (event) => {
    if (event.target.name === 'producerNumber' && event.target.value) {
      // console.log('get producer values');
      // console.log(event.target.value);
      this.props.getProducerDetails(event.target.value);
    }
  };

  handleStartDateChange = (date) => {
    const policy = this.state.policy;
    policy.policyStartDate = date;
    this.setState({ policy });
  };

  handleEndDateChange = (date) => {
    const policy = this.state.policy;
    policy.policyEndDate = date;
    this.setState({ policy });
  };

  submitPolicy(formValues) {
    this.props.createPolicy(formValues);
  }

  openModal = () => () => this.setState({ modalOpen: true });
  closeModal = () => () => this.setState({ modalOpen: false });
  createExposure = (ex) => {
    this.closeModal();
    this.props.selectNewExposure(ex);
    this.props.history.push('/createExposure');
  };
  showExposure = (ex) => {
    this.props.selectedExposure(ex);
    this.props.history.push('/createExposure');
  };
  renderExposureButtons = () => (
    this.props.configExposures.map(ex => (
      <Button key={ex.name} onClick={() => this.createExposure(ex)}>{ex.displayName}</Button>
  )));

  renderModal = () => (
    <Modal size="small" open={this.state.modalOpen} dimmer="inverted" onClose={this.closeModal()}>
      <Modal.Header>What type of exposure would you like to add?</Modal.Header>
      <Modal.Content>
        {this.renderExposureButtons()}
      </Modal.Content>
    </Modal>
  );
  renderField = (field) => {
    switch (field.type) {
      case 'string':
        return (
          <div>
            <Field
              name={field.name}
              component={InputField}
              labelText={field.title}
              onBlur={this.handleOnBlur}
            />
          </div>
        );
      case 'select': {
        const fieldOpts = field.values.map(value =>
          Object.assign({ key: value }, { value }, { text: value }),
        );
        return (
          <div>
            <Field
              placeholder={field.title}
              options={fieldOpts}
              name={field.name}
              component={SelectField}
            />
          </div>
        );
      }
      default:
        return (
          <div />
        );
    }
  };

  renderFields = () => {
    if (this.props.configFields && this.props.configFields.length !== 0) {
      return this.props.configFields.map(field => (
        <Grid.Column key={field.name}>
          {this.renderField(field)}
        </Grid.Column>
        ),
      );
    }

    return (
      <Grid.Column>
        <p>Loading...</p>
      </Grid.Column>
    );
  };
  renderExposureItems = () => {
    if (this.props.exposures.length > 0) {
      return this.props.exposures.map((exp, i) => (
        <List.Item as="a" key={`${exp.name}${i}`} onClick={() => this.showExposure(exp)}>{ moment().format('d MMM YYYY') } - {moment().year(moment().year() + 1).format('d MMM YYYY')}</List.Item>
      ));
    }
    return null;
  };

  render() {
    return (
      <div>
        { this.renderModal() }
        <Segment>
          <Label attached="top" size="big">Policy</Label>
          { /* <Grid columns={3}>
            <Grid.Column />
            <Grid.Column />
            <Grid.Column>
              <Segment padded>
                <Label attached="top">Estimated Premium</Label>
                <Input>$0.00</Input>
              </Segment>
            </Grid.Column>
          </Grid> */ }
          <Grid columns={1}>
            { /* <Grid.Column>
              <Segment padded>
                <Label attached="top">Start Date</Label>
                <DatePicker
                  selected={this.state.policy.policyStartDate}
                  onChange={this.handleStartDateChange}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment padded>
                <Label attached="top">Start Date</Label>
                <DatePicker
                  selected={this.state.policy.policyEndDate}
                  onChange={this.handleEndDateChange}
                />
              </Segment>
            </Grid.Column> */ }
            <Grid.Column>
              <Segment padded>
                <Label attached="top" size="large">Payment Schedule</Label>
                <Field
                  placeholder="Payment Schedule"
                  options={this.props.paymentSchedules}
                  name="paymentSchedule"
                  component={SelectField}
                />
              </Segment>
            </Grid.Column>
          </Grid>
          <Grid columns={2}>
            {this.renderFields()}
          </Grid>
        </Segment>
        <Segment>
          <Label attached="top" size="big">Exposures</Label>
          <Button size="mini" onClick={this.openModal()}>Add New Exposure</Button>
          <List bulleted verticalAlign="middle" size="big" divided>
            {this.renderExposureItems()}
          </List>
        </Segment>
        { /* <Button onClick={this.props.handleSubmit(this.getPrice)}>Get Quote</Button> */ }
        <Button onClick={this.props.handleSubmit(this.submitPolicy)}>Create Policy</Button>
      </div>
    );
  }
}

CreatePolicy.defaultProps = {
  handleSubmit: Function.prototype,
  configFields: [],
  paymentSchedules: [],
  createPolicy: Function.prototype,
  getProducerDetails: Function.prototype,
  changeField: Function.prototype,
  history: {},
  configExposures: [],
  selectNewExposure: Function.prototype,
  selectedExposure: Function.prototype,
  exposures: [],
};
CreatePolicy.propTypes = {
  configFields: PropTypes.array,
  paymentSchedules: PropTypes.array,
  createPolicy: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getProducerDetails: PropTypes.func.isRequired,
  changeField: PropTypes.func.isRequired,
  history: PropTypes.object,
  configExposures: PropTypes.array,
  selectNewExposure: PropTypes.func,
  selectedExposure: PropTypes.func,
  exposures: PropTypes.array,
};

export default CreatePolicy;

