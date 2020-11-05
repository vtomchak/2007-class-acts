// LIBRARIES
import React from 'react';
import dayjs from 'dayjs';
import axios from 'axios'
import { connect } from 'react-redux';

// FILES
import { getArtworks } from '../redux/artworks';
import OrderDetails from './OrderDetails'

class UserOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      reviews: null
    }
  }
  componentDidMount() {
    this.props.getArtworks();
  }

  //get user's reviews so that user can not re-review
  async componentDidUpdate() {
    if(this.props.user.id && !this.state.reviews) {
      const reviews = (await axios.get(`/api/reviews/user/${this.props.user.id}`)).data
      this.setState({...this.state, reviews})
    }
  }

  render () {
    const { user, artworks } = this.props;
    const { reviews } = this.state

    return (
      <div className="order-history-section">
        <h3>Past Orders</h3>
        <div className="order-list">
          { user.orders ?
            user.orders.length > 0 ?
              user.orders.map(order => {
                return <OrderDetails order={order} key={order.id} />
              }) :
            <p>No past orders. Begin your first order!</p> :
            <p>No past orders. Begin your first order!</p>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
   }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtworks: () => dispatch(getArtworks())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);