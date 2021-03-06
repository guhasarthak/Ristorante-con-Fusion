
import { Component } from 'react';
import MenuComponent from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import HomeComponent from './HomeComponent';
import Contact from './ContactComponent';
import {Switch,Route,Redirect} from 'react-router-dom';
import DishDetail from './DishDetail'
import About from './AboutComponent';
class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments:COMMENTS,
            promotions:PROMOTIONS,
            leaders:LEADERS
        };
    }

    render() {
        const HomePage=() => {
            return(
                <HomeComponent dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
            )
        }

        const DishWithId=({match})=>{
            return(
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id===parseInt(match.params.dishId, 10))[0]}
                comments={this.state.comments.filter((comment) => comment.dishId===parseInt(match.params.dishId, 10))}
                />
            )

        }
        return (
            <div>
                <HeaderComponent />

                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={()=> <MenuComponent dishes={this.state.dishes}/>} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/contactus" component={Contact} />
                    <Route exact path="/aboutus" component={()=> <About leaders={this.state.leaders}/>} />
                    <Redirect to="/home" />
                </Switch>
                <FooterComponent />
            </div>
        )
    }
}

export default Main;
