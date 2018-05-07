import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Segment, Grid, Modal, Button, List, Table } from 'semantic-ui-react';
import { Field } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';

import InputField from '../../elements/input-field/InputField';
import SelectField from '../../elements/select-field/SelectField';

class CreateExposure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      perilDetailOpen: false,
      exposureNum: _.isEmpty(props.exposureState.selectedExposure) ?
        props.exposureState.exposures.length + 1 :
        props.exposureState.selectedExposure.key,
      exposureFields: props.exposureState.newExposureType.fields.sort(this.fieldCompare),
      perils: _.isEmpty(props.exposureState.selectedExposure) ?
        props.exposureState.newExposureType.perils :
        props.exposureState.selectedExposure.perils,
      tempArr: [],
      fieldsWithHeadings: [],
      selectedPeril: {},
    };

    this.state.tempArr = Object.assign(this.state.exposureFields);
    this.state.fieldsWithHeadings = this.state.tempArr.filter(temp => temp.heading);

    this.fieldCompare = this.fieldCompare.bind(this);
    this.renderField = this.renderField.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.renderExposureSegments = this.renderExposureSegments.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openPerilDetailsModal = this.openPerilDetailsModal.bind(this);
    this.closePerilDetailsModal = this.closePerilDetailsModal.bind(this);
    this.selectNewPeril = this.selectNewPeril.bind(this);
    this.renderPerilButtons = this.renderPerilButtons.bind(this);
    this.handleFieldCondition = this.handleFieldCondition.bind(this);
    this.perilDetailsModal = this.perilDetailsModal.bind(this);
    this.uniqDisplayNames = this.uniqDisplayNames.bind(this);
    this.addNewPeril = this.addNewPeril.bind(this);
    this.showPeril = this.showPeril.bind(this);
    this.removePeril = this.removePeril.bind(this);
    this.submitExposure = this.submitExposure.bind(this);
  }

  fieldCompare = (a, b) => {
    if (parseInt(a.order, 0) < parseInt(b.order, 0)) {
      return -1;
    }
    if (parseInt(a.order, 0) > parseInt(b.order, 0)) {
      return 1;
    }
    // a must be equal to b
    return 0;
  };

  addNewPeril = (peril) => {
    const newPeril = {
      deductible: '0.00',
      displayName: peril.displayName,
      externalDataCalss: [],
      fields: [],
      indemnityInAggregate: '0.00',
      indemnityPerEvent: '0.00',
      indemnityPerItem: '0.00',
      lumpSumPayment: '0.00',
      name: peril.name,
    };
    const newPerils = this.state.perils.concat(newPeril);
    this.setState({
      perils: newPerils,
    });
  };

  openModal = () => () => this.setState({ modalOpen: true });
  closeModal = () => () => this.setState({ modalOpen: false });
  openPerilDetailsModal = () => () => this.setState({ perilDetailOpen: true });
  closePerilDetailsModal = () => () => this.setState({ perilDetailOpen: false });
  selectNewPeril = (peril) => {
    console.log(peril);
    this.addNewPeril(peril);
    this.setState({
      modalOpen: false,
      perilDetailOpen: true,
      selectedPeril: this.state.perils.slice(-1)[0],
    });
  };
  showPeril = (peril) => {
    console.log(peril);
    this.setState({
      perilDetailOpen: true,
      selectedPeril: peril,
    });
  };

  handleFieldCondition = (field) => {
    const conditionKey = Object.keys(field.condition)[0];
    const conditionVal = Object.values(field.condition)[0][0];
    if (Object.prototype.hasOwnProperty.call(
        this.props.formValues, conditionKey) &&
      this.props.formValues[conditionKey] === conditionVal) {
      return true;
    }
    return false;
  };
  removePeril = () => {
    const newArr = this.state.perils.filter(peril => peril !== this.state.selectedPeril);
    this.setState({
      perils: newArr,
      perilDetailOpen: false,
    });
  };

  perilDetailsModal = () => {
    if (this.state.selectedPeril) {
      const renderRows = () =>
        Object.entries(this.state.selectedPeril).map(([key, value]) => (
          <Table.Row key={key}>
            <Table.Cell>
              <b>{key}</b>
            </Table.Cell>
            <Table.Cell>
              {value}
            </Table.Cell>
          </Table.Row>
        ));
      return (
        <Modal
          size="small"
          open={this.state.perilDetailOpen}
          dimmer="inverted"
          onClose={this.closePerilDetailsModal()}
          header={this.state.selectedPeril.displayName}
          content={
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Limits</Table.HeaderCell>
                  <Table.HeaderCell>
                    <Button onClick={() => this.removePeril()}>Remove Peril</Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {renderRows()}
              </Table.Body>
              <Button onClick={this.closePerilDetailsModal()}>Save and Close</Button>
            </Table>
          }
        />
      );
    }
    return null;
  };

  submitExposure = (formValues) => {
    console.log(this.state.perils);
    formValues.perils = this.state.perils;
    if (_.isEmpty(this.props.exposureState.selectedExposure)) {
      formValues.type = this.props.exposureState.newExposureType.name;
      formValues.key = this.props.exposureState.exposures.length + 1;
      this.props.addNewExposure(formValues);
    } else {
      this.props.exposureUpdate(formValues);
    }
    console.log(formValues);
    this.props.history.push('/createPolicy');
  };

  uniqDisplayNames = arrArg => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
  renderPerilButtons = () => (
    this.state.perils.map(peril => (
      <Button key={peril.name} onClick={() => this.selectNewPeril(peril)}>
        {peril.displayName}
      </Button>
    ))
  );
  renderModal = () => (
    <Modal
      header="What type of peril would you like to add?"
      content={
        <Button.Group vertical>
          {this.renderPerilButtons()}
        </Button.Group>
      }
      dimmer="inverted"
      open={this.state.modalOpen}
      onClose={this.closeModal()}
    />
  );

  renderField = (field) => {
    const showField = field.condition ? this.handleFieldCondition(field) : true;
    switch (field.type) {
      case 'string': {
        return (showField &&
          <div>
            <Field
              name={field.name}
              component={InputField}
              labelText={field.title}
              onBlur={this.handleOnBlur}
            />
          </div>
        );
      }
      case 'number':
        return (showField &&
          <div>
            <Field
              name={field.name}
              component={InputField}
              labelText={field.title}
              onBlur={this.handleOnBlur}
              type="number"
            />
          </div>
        );
      case 'media':
        return (showField &&
          <div>
            <Field
              name={field.name}
              component={InputField}
              labelText={field.title}
              onBlur={this.handleOnBlur}
              type="file"
            />
          </div>
        );
      case 'select': {
        const fieldOpts = field.values.map(value =>
          Object.assign({ key: value }, { value }, { text: value }),
        );
        return (showField &&
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
          <div>
            <p>{field.title} goes here!</p>
          </div>
        );
    }
  };

  renderFields = (begin, end) => this.state.exposureFields.map((field) => {
    if (parseInt(field.order, 0) > parseInt(begin, 0) &&
      parseInt(field.order, 0) < parseInt(end, 0)) {
      if (field.type === 'media') {
        return (
          <div key={field.name}>
            {this.renderField(field)}
          </div>
        );
      }
      return (
        <Grid.Column key={field.name}>
          {this.renderField(field)}
        </Grid.Column>
      );
    }
    return null;
  });

  renderExposureSegments = () => {
    if (this.state.exposureFields.length !== 0) {
      return this.state.fieldsWithHeadings.map((field, index) => (
        <Segment key={field.name}>
          <Label attached="top" size="big">{field.heading}</Label>
          <Grid columns={2}>
            <Grid.Column>
              {this.renderField(field)}
            </Grid.Column>
            {this.renderFields(field.order, this.state.fieldsWithHeadings[index + 1]
              ? this.state.fieldsWithHeadings[index + 1].order : '99')}
          </Grid>
        </Segment>
      ));
    }
    return null;
  };
  renderPerilItems = displayName => (
    this.state.perils.map((peril, i) => {
      if (peril.displayName === displayName) {
        return (
          <List.Item as="a" key={`${peril.name}${i}`} onClick={() => this.showPeril(peril)}>{ moment().format('d MMM YYYY') } - {moment().year(moment().year() + 1).format('d MMM YYYY')}</List.Item>
        );
      }
      return null;
    })
  );

  renderPerilSegments = () => {
    if (this.state.perils.length > 0) {
      const displayNames = this.uniqDisplayNames(
        this.state.perils.map(peril => peril.displayName));
      return displayNames.map((name, i) => (
        <Segment key={`${name}${i}`}> { /* eslint-disable-line */ }
          <Label attached="top">{name}</Label>
          <List bulleted verticalAlign="middle" size="big" divided>
            {this.renderPerilItems(name)}
          </List>
        </Segment>
      ));
    }
    return null;
  };

  render() {
    return (
      <div>
        { this.renderModal() }
        { this.perilDetailsModal() }
        <h1>Exposure {this.state.exposureNum}:
          {this.props.exposureState.newExposureType.displayName}</h1>
        <h3>Details</h3>
        { this.renderExposureSegments() }
        <h3>Coverage</h3>
        <Button size="mini" onClick={this.openModal()}>Add New Peril</Button>
        { this.renderPerilSegments() }
        <Button size="large" floated="right" onClick={this.props.handleSubmit(this.submitExposure)}>Save and Close</Button>
      </div>
    );
  }
}

CreateExposure.defaultProps = {
  exposureState: {},
  formValues: {},
  handleSubmit: Function.prototype,
  history: {},
  addNewExposure: Function.prototype,
  exposureUpdate: Function.prototype,
};

CreateExposure.propTypes = {
  exposureState: PropTypes.object,
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object,
  addNewExposure: PropTypes.func,
  exposureUpdate: PropTypes.func,
};

export default CreateExposure;

