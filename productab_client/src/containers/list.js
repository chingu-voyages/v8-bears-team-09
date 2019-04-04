import React from "react";
import axios from "axios";
import { Droppable } from "react-beautiful-dnd";

import { JSON_SERVER } from "../constants";
import Card from "../components/card";
import NewCard from "../components/newCard";
import * as _ from "../redux/actions/baseActions";
import * as _list from "../redux/actions/listActions";
import * as _card from "../redux/actions/cardActions";

import { connect } from "react-redux";

class List extends React.Component {
  state = {
    cardFormOn: false,
    ...this.props.list,
    listCards: []
  };

  componentDidMount() {
    let { cards } = this.props;
    const { title, id } = this.props.list;
    this.setState({ title }, () => {
      // eslint-disable-next-line
      const listCards = cards.filter(card => {
        if (card.list_id === id) {
          return card;
        }
      });
      this.setState({ listCards });
    });
  }

  componentDidUpdate(prevProps) {
    const { formsDisabled, cards, list } = this.props;
    const { cardFormOn } = this.state;

    if (prevProps !== this.props) {
      // eslint-disable-next-line
      if (prevProps.cards !== cards) {
        // eslint-disable-next-line
        const listCards = cards.filter(card => {
          if (card.list_id === list.id) {
            return card;
          }
        });
        this.setState({ listCards });
      }

      if (formsDisabled && cardFormOn) {
        this.setState({ cardFormOn: false });
      }
    }
  }

  handleAddCard = evt => {
    evt.target.parentElement.parentElement.classList.remove("add-card-div");
    this.props.disableForms();
    this.props.enableForms();
    this.setState({ cardFormOn: true });
    evt.persist();
    evt.preventDefault();
  };

  handleTitleChange = evt => {
    this.setState({ title: evt.target.value });
    evt.persist();
  };

  /* filters for it's own cards and returns an array */
  showCards = () => {
    let { cards } = this.props;
    const { id } = this.props.list;

    const listCards = cards
      .filter(card => {
        if (card.list_id === id) {
          return card;
        }
      })
      .map((card, index) => <Card key={`ID. ${card.id} - List: ${id}`} card={card} index={index} />);
      return listCards;
  }

  /* Updates the DB's title of the current list being edited when focus is blurred */
  handleTitleBlur = async evt => {
    const { title } = this.state;
    const { id } = this.props.list;
    const updateList = await axios.patch(JSON_SERVER + `lists/${id}`, {
      title
    });
    const data = await updateList.data;
    this.setState({ title: data.title });
    evt.persist();
  };

  handleListOptions = evt => {
    // alert('options button was pressed');
    evt.persist();
  };

  selectListNow = evt => {
    const { selectList, list } = this.props;
    selectList(list);
    evt.persist();
  };

  render() {
    const { cardFormOn, title, listCards } = this.state;
    const { id, cardCount } = this.props.list;
    const { selectedList } = this.props;

    return (
      <div
        className="list-style list-sizing shrink-container "
        onClick={this.selectListNow}
      >
        <div className="list-top">
          <textarea
            draggable={false}
            name="list-title"
            className="list-title"
            value={title}
            onChange={this.handleTitleChange}
            onBlur={this.handleTitleBlur}
            rows="1"
          />

          <i className="fas fa-ellipsis-h" onClick={this.handleListOptions} />
        </div>

        {listCards.length > 0 && (
          <Droppable droppableId={id} type="CARDS">
            {(provided) => <div
              className="inner-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
              >{this.showCards()}
              {provided.placeholder}
              </div>}
          </Droppable>
        )}

        {cardFormOn && selectedList && id === selectedList.id ? (
          <div className="list-bottom">
            <NewCard listId={id} cardCount={cardCount}/>
          </div>
        ) : (
          <div
            className="list-bottom add-card-div"
            onClick={this.handleAddCard}
          >
            <i className="fas fa-plus" />
            <span>Add Card</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formsDisabled: state.base.formsDisabled,
  cards: state.card.cards,
  selectedList: state.list.selectedList
});

const mapDispatchToProps = dispatch => ({
  addCard: val => dispatch(_card.addCard(val)),
  enableForms: () => dispatch(_.enableForms()),
  disableForms: () => dispatch(_.disableForms()),
  selectList: val => dispatch(_list.selectList(val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
